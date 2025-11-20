import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { ShoppingBag, TrendingUp, Users, Shield } from "lucide-react";
import thaparCampus from "@/assets/thapar-campus.jpg";
import { getProducts, getCategories, getUserById } from "@/utils/localStorage";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = () => {
    const categories = getCategories();
    const allProducts = getProducts()
      .filter(p => p.status === 'available')
      .slice(0, 6)
      .map(product => {
        const category = categories.find(c => c.id === product.category_id);
        const seller = getUserById(product.user_id);
        return {
          ...product,
          categories: category ? { name: category.name } : null,
          profiles: seller ? { full_name: seller.full_name, phone: seller.phone } : null,
        };
      });

    allProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setFeaturedProducts(allProducts);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${thaparCampus})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-20">
          <ShoppingBag className="h-16 w-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Welcome to Thapar OLX
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Buy and sell within the campus community. Safe, simple, and convenient marketplace for Thapar students.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg">Browse Products</Button>
            </Link>
            <Link to="/create-listing">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Campus Community</h3>
              <p className="text-muted-foreground">
                Trade within the trusted Thapar community
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Listings</h3>
              <p className="text-muted-foreground">
                Create and manage your listings in minutes
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-muted-foreground">
                Safe transactions within the campus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Recent Listings</h2>
          {featuredProducts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No products available yet. Be the first to list!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/browse">
              <Button size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
