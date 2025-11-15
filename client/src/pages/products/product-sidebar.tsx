import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/product.store";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth.store";

export default function ProductSidebar() {
  const { toggleCategory, selectedCategories, setSelectedCategories, searchQuery, setSearchQuery, clearSearch, searchProducts, products, applyFilters, allProducts, getMyProducts } = useProductStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const allowed = [
      "keyboards",
      "mice",
      "headphones",
      "monitors",
      "speakers",
      "monitor mount",
      "microphones",
      "routers",
    ];

    if (category === 'my-products' && isAuthenticated) {
      if (selectedCategories.length !== 1 || selectedCategories[0] !== 'my-products') {
        setSelectedCategories(['my-products']);
        getMyProducts().catch(() => {});
      }
      return;
    }
    if (category && allowed.includes(category)) {
      if (selectedCategories.length !== 1 || selectedCategories[0] !== category) {
        setSelectedCategories([category]);
      }
    }
  }, [location.search, isAuthenticated]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      applyFilters();
    }
  }, [allProducts]);
  
  const handleCategoryChange = async (category: string) => {
    const wasSelected = selectedCategories.includes(category);
    const willSelect = !wasSelected;

    let nextSelected: string[] = [];
    if (category === 'my-products') {
      nextSelected = willSelect ? ['my-products'] : [];
    } else if (selectedCategories.includes('my-products')) {
      nextSelected = [category];
    } else {
      nextSelected = wasSelected
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
    }

    toggleCategory(category);

    const params = new URLSearchParams(location.search);
    if (nextSelected.includes('my-products')) {
      params.set('category', 'my-products');
    } else if (nextSelected.length === 1) {
      params.set('category', nextSelected[0]);
    } else {
      params.delete('category');
    }

    navigate({ pathname: "/products", search: params.toString() }, { replace: true });

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

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            Categories
          </h3>
          <div className="space-y-2">
            {(
              [
                ...(isAuthenticated ? [{ value: "my-products", label: "My Products" }] : []),
                { value: "keyboards", label: "Keyboards" },
                { value: "mice", label: "Mice" },
                { value: "headphones", label: "Headphones" },
                { value: "monitors", label: "Monitors" },
                { value: "speakers", label: "Speakers" },
                { value: "monitor mount", label: "Monitor mount" },
                { value: "microphones", label: "Microphones" },
                { value: "routers", label: "Routers" },
              ] as { value: string; label: string }[]
            ).map(({ value, label }) => {
              const isMy = value === 'my-products';
              const isChecked = selectedCategories.includes(value);
              return (
                <label
                  key={value}
                  className={`flex items-center gap-2 cursor-pointer group ${isMy ? 'relative' : ''}`}
                >
                  <input
                    type="checkbox"
                    className={`w-4 h-4 rounded ${isMy ? 'text-indigo-500 focus:ring-indigo-500' : 'text-purple-600'}`}
                    name="category"
                    value={value}
                    checked={isChecked}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  />
                  <span
                    className={`text-white/80 ${isMy ? 'font-semibold' : ''}`}
                  >
                    {label}
                  </span>
                  {isMy && (
                    <span className={`ml-auto inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${isChecked ? 'bg-linear-to-r from-indigo-500 to-purple-600 border-transparent text-white shadow-md' : 'bg-white/5 border-white/10 text-white/70'}`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mine
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}