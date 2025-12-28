import { useState, useEffect } from "react";
import { supabase, DbPlugin } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import PluginForm from "./PluginForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PluginsManager() {
  const [plugins, setPlugins] = useState<DbPlugin[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlugin, setEditingPlugin] = useState<DbPlugin | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPlugins();
  }, []);

  const fetchPlugins = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("plugins").select("*");
      if (error) throw error;
      setPlugins(data || []);
    } catch (error) {
      toast.error("Failed to fetch plugins");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlugin = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plugin?")) return;

    try {
      const { error } = await supabase.from("plugins").delete().eq("id", id);
      if (error) throw error;
      setPlugins(plugins.filter((p) => p.id !== id));
      toast.success("Plugin deleted");
    } catch (error) {
      toast.error("Failed to delete plugin");
      console.error(error);
    }
  };

  const handleEditPlugin = (plugin: DbPlugin) => {
    setEditingPlugin(plugin);
    setIsDialogOpen(true);
  };

  const handleAddPlugin = () => {
    setEditingPlugin(null);
    setIsDialogOpen(true);
  };

  const handlePluginSaved = () => {
    setIsDialogOpen(false);
    setEditingPlugin(null);
    fetchPlugins();
  };

  const filteredPlugins = plugins.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Search plugins by name or slug..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-neutral-900 border-neutral-700 text-white"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddPlugin}
              className="bg-white text-black hover:bg-neutral-200 whitespace-nowrap"
            >
              + Add Plugin
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingPlugin ? "Edit Plugin" : "Add New Plugin"}
              </DialogTitle>
            </DialogHeader>
            <PluginForm
              plugin={editingPlugin || undefined}
              onSaved={handlePluginSaved}
            />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-neutral-400">Loading plugins...</div>
      ) : filteredPlugins.length === 0 ? (
        <div className="text-neutral-400">No plugins found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left py-3 px-4 text-neutral-300">Name</th>
                <th className="text-left py-3 px-4 text-neutral-300">Slug</th>
                <th className="text-left py-3 px-4 text-neutral-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlugins.map((plugin) => (
                <tr key={plugin.id} className="border-b border-neutral-800 hover:bg-neutral-900">
                  <td className="py-3 px-4 text-white">{plugin.name}</td>
                  <td className="py-3 px-4 text-neutral-400">{plugin.slug}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditPlugin(plugin)}
                        size="sm"
                        className="bg-neutral-700 text-white hover:bg-neutral-600"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeletePlugin(plugin.id)}
                        size="sm"
                        className="bg-red-900 text-white hover:bg-red-800"
                      >
                        Delete
                      </Button>
                    </div>
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
