import { useState, useEffect } from "react";
import { supabase, DbSubscriber } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Download } from "lucide-react";

export default function SubscribersManager() {
  const [subscribers, setSubscribers] = useState<DbSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;

    try {
      const { error } = await supabase.from("subscribers").delete().eq("id", id);
      if (error) throw error;

      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      toast.success("Subscriber deleted");
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      toast.error("Failed to delete subscriber");
    }
  };

  const handleExport = () => {
    if (subscribers.length === 0) {
      toast.error("No subscribers to export");
      return;
    }

    const csv = [
      ["Email", "Subscribed At"],
      ...subscribers.map((s) => [
        s.email,
        new Date(s.subscribed_at).toLocaleString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported to CSV");
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Email Subscribers</h2>
        <p className="text-neutral-400">Total: {subscribers.length}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="flex-1 px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button
          onClick={handleExport}
          className="bg-green-700 hover:bg-green-600 text-white flex items-center gap-2"
        >
          <Download size={16} />
          Export CSV
        </Button>
        <Button
          onClick={fetchSubscribers}
          className="bg-neutral-700 hover:bg-neutral-600 text-white"
        >
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="text-neutral-400">Loading subscribers...</div>
      ) : filtered.length === 0 ? (
        <div className="text-neutral-400">
          {subscribers.length === 0 ? "No subscribers yet" : "No matching subscribers"}
        </div>
      ) : (
        <div className="border border-neutral-700 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-800 border-b border-neutral-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-white">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-white">
                  Subscribed At
                </th>
                <th className="px-4 py-3 text-right font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {filtered.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-4 py-3 text-white">{subscriber.email}</td>
                  <td className="px-4 py-3 text-neutral-400">
                    {new Date(subscriber.subscribed_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(subscriber.id)}
                      className="text-red-500 hover:text-red-400 p-2 rounded hover:bg-neutral-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
