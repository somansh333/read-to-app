import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Menu, X, Search } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <nav className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Thapar OLX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center gap-2">
              {searchOpen ? (
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch();
                    }}
                    className="pl-10 w-64"
                    onBlur={() => {
                      setTimeout(() => {
                        if (!searchTerm) setSearchOpen(false);
                      }, 200);
                    }}
                    autoFocus
                  />
                </div>
              ) : (
                <Button variant="ghost" onClick={() => setSearchOpen(true)}>
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Link to="/create-listing">
              <Button variant="ghost">Sell</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <div className="relative">
              <Search className="absolute left-6 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                    setMobileMenuOpen(false);
                  }
                }}
                className="pl-10 w-full"
              />
            </div>
            <Link to="/create-listing" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Sell</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
