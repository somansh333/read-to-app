import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Plus } from "lucide-react";
import { getProductsByUser, getCategories, deleteProduct, updateProduct } from "@/utils/localStorage";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      fetchUserProducts();
    }
  }, [user, navigate]);

  const fetchUserProducts = () => {
    setLoading(true);
    const categories = getCategories();
    const userProducts = getProductsByUser(user.id).map(product => {
      const category = categories.find(c => c.id === product.category_id);
      return {
        ...product,
        categories: category ? { name: category.name } : null,
      };
    });
    
    userProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setProducts(userProducts);
    setLoading(false);
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
    fetchUserProducts();
  };

  const handleStatusChange = (productId, newStatus) => {
    updateProduct(productId, { status: newStatus });
    toast({
      title: "Success",
      description: "Status updated successfully",
    });
    fetchUserProducts();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Listings</h1>
          <Button onClick={() => navigate("/create-listing")}>
            <Plus className="mr-2 h-4 w-4" />
            New Listing
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't created any listings yet.</p>
              <Button onClick={() => navigate("/create-listing")}>Create Your First Listing</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isOwner
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
