import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { Search } from "lucide-react";
import { getProducts, getCategories, getUserById } from "@/utils/localStorage";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) setSearchTerm(search);
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = () => {
    setLoading(true);
    
    // Get categories
    const cats = getCategories();
    setCategories(cats);

    // Get products
    let allProducts = getProducts()
      .filter(p => p.status === 'available')
      .map(product => {
        const category = cats.find(c => c.id === product.category_id);
        const seller = getUserById(product.user_id);
        return {
          ...product,
          categories: category ? { name: category.name } : null,
          profiles: seller ? { full_name: seller.full_name, phone: seller.phone } : null,
        };
      });

    // Filter by category
    if (selectedCategory !== "all") {
      allProducts = allProducts.filter(p => p.category_id === selectedCategory);
    }

    // Sort by date
    allProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setProducts(allProducts);
    setLoading(false);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Products</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No products found. Try adjusting your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
