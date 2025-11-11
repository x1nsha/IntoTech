import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/product.store";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductSidebar() {
  const { toggleCategory, selectedCategories, searchQuery, setSearchQuery, clearSearch, searchProducts, products, applyFilters } = useProductStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const handleCategoryChange = async (category: string) => {
    toggleCategory(category);
    
    // If there's an active search, re-run search with new categories
    if (searchQuery.trim()) {
      await searchProducts(searchQuery);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value.trim()) {
      setSearchQuery(value);
      await searchProducts(value);
      setShowDropdown(true);
    } else {
      // When cleared (including backspace), reset and apply category filters
      setSearchQuery("");
      setShowDropdown(false);
      clearSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    clearSearch();
    setShowDropdown(false);
  };

  const handleProductClick = (productId: string) => {
    setShowDropdown(false);
    navigate(`/products/${productId}`);
  };

  const handleApplyFilters = async () => {
    if (searchQuery.trim()) {
      await searchProducts(searchQuery);
    } else {
      applyFilters();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="lg:w-80 shrink-0">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative" ref={dropdownRef}>
          <h3 className="text-sm font-semibold text-white mb-3">Search</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Type Here"
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Search Dropdown */}
          {showDropdown && searchQuery && (
            <div className="absolute z-50 w-full mt-2 bg-slate-900/95 border border-white/10 rounded-lg shadow-lg max-h-96 overflow-y-auto text-white">
              {products.length > 0 ? (
                <div className="py-2">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product._id)}
                      className="px-4 py-3 hover:bg-white/5 cursor-pointer border-b border-white/10 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-white/70 capitalize">
                            {product.category}
                          </p>
                          <p className="text-sm font-semibold text-indigo-400">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-white/60">Product not found</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            Categories
          </h3>
          <div className="space-y-2">
            {[
              { value: "keyboards", label: "Keyboards" },
              { value: "mice", label: "Mice" },
              { value: "headphones", label: "Headphones" },
              { value: "monitors", label: "Monitors" },
              { value: "speakers", label: "Speakers" },
            ].map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 rounded"
                  name="category"
                  value={value}
                  checked={selectedCategories.includes(value)}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                />
                <span className="text-white/80">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Filters Button */}
        <Button onClick={handleApplyFilters} className="w-full py-3 bg-linear-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all">
          Apply Filters
        </Button>
      </div>
    </aside>
  );
}
