import { useProductStore } from "@/store/product.store";
import { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { useModalStore } from "@/store/modal.store";
import ProductForm from "./product-form";
import PageHeader from "@/components/ui/page-header";
import ProductSidebar from "./product-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

export default function Products() {
  const {
    products,
    getProducts,
    sortProducts,
    setSortBy,
    currentSort,
    setCurrentSort,
  } = useProductStore();
  const { openModal } = useModalStore();

  const location = useLocation();
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Scroll to top when arriving to this page or when search/hash changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search, location.hash]);

  // Show scroll-up button based on scroll position
  useEffect(() => {
    const onScroll = () => setShowScrollUp(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleOpenModal = () => {
    openModal();
  };

  const handleSortProducts = (sortBy: string) => {
    sortProducts(sortBy);
    setSortBy(sortBy);
    setCurrentSort(sortBy);
  };

  const totalProducts = products?.length || 0;

  return (
    <div className="min-h-screen pt-24 bg-linear-to-b from-gray-950 via-gray-900 to-black">
      <PageHeader
        title="PRODUCTS"
        description={`${totalProducts} Total Products`}
      />

      <div className="max-w-7xl mx-auto px-6 py-10 animate-in fade-in-50">
        <div className="flex lg:flex-row gap-12">
          <ProductSidebar />

          <main className="flex-1">
            <div className="flex justify-end mb-6">
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="px-4 py-2 pr-10 border border-white/10 bg-white/5 text-white rounded-md cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        {currentSort === "latest" && "Sort By: Latest"}
                        {currentSort === "price-low-to-high" &&
                          "Price: Low to High"}
                        {currentSort === "price-high-to-low" &&
                          "Price: High to Low"}
                        {currentSort === "name-a-to-z" && "Name: A to Z"}
                        {currentSort === "name-z-to-a" && "Name: Z to A"}
                      </Button>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-900/95 border border-white/10 text-white">
                    <DropdownMenuItem onClick={() => handleSortProducts("latest")}>Latest</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortProducts("price-low-to-high")}>Price: Low to High</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortProducts("price-high-to-low")}>Price: High to Low</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortProducts("name-a-to-z")}>Name: A to Z</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortProducts("name-z-to-a")}>Name: Z to A</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="animate-in fade-in-50">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/10">
                  <svg
                    className="w-12 h-12 text-white/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No products yet</h3>
                <p className="text-white/70 mb-6">Get started by adding your first product</p>
                <button
                  onClick={handleOpenModal}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-500/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Your First Product
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <ProductForm />

      {showScrollUp && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-linear-to-br from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/30 border border-white/10 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:-translate-y-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
