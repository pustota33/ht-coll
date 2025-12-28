import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentAdmin, logoutAdmin } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ProductsManager from "@/components/admin/ProductsManager";
import PluginsManager from "@/components/admin/PluginsManager";
import BlogPostsManager from "@/components/admin/BlogPostsManager";
import SubscribersManager from "@/components/admin/SubscribersManager";
import SettingsManager from "@/components/admin/SettingsManager";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = getCurrentAdmin();
    if (!admin) {
      navigate("/admin/login");
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    logoutAdmin();
    toast.success("Logged out");
    navigate("/admin/login");
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  const admin = getCurrentAdmin();

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-neutral-400">Logged in as {admin?.email}</p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-neutral-700 text-white hover:bg-neutral-600"
          >
            Logout
          </Button>
        </div>

        <Tabs defaultValue="samples" className="w-full">
          <TabsList className="bg-neutral-900 border-b border-neutral-800">
            <TabsTrigger value="samples" className="text-neutral-300">
              Samples
            </TabsTrigger>
            <TabsTrigger value="plugins" className="text-neutral-300">
              Plugins
            </TabsTrigger>
            <TabsTrigger value="blog" className="text-neutral-300">
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="text-neutral-300">
              Subscribers
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-neutral-300">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="samples" className="mt-8">
            <ProductsManager />
          </TabsContent>

          <TabsContent value="plugins" className="mt-8">
            <PluginsManager />
          </TabsContent>

          <TabsContent value="blog" className="mt-8">
            <BlogPostsManager />
          </TabsContent>

          <TabsContent value="subscribers" className="mt-8">
            <SubscribersManager />
          </TabsContent>

          <TabsContent value="settings" className="mt-8">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
