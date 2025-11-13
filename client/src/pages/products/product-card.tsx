import { useProductStore } from "@/store/product.store";
import { useModalStore } from "@/store/modal.store";
import useAuthStore from "@/store/auth.store";
import type { Product } from "@/types/product.types";
import { TrashIcon, PencilIcon } from "lucide-react";

export default function ProductCard({ product, onClick }: { product: Product; onClick?: (p: Product) => void }) {
  const { deleteProduct } = useProductStore();
  const { openModalWithProduct } = useModalStore();
  const { user } = useAuthStore();

  const canModifyProduct = user?.role === "admin" || user?.role === "super_admin";
  
  const handleDelete = (e: React.MouseEvent) =>
  {
    e.preventDefault();
    e.stopPropagation();
    deleteProduct(product._id);
  };

  const handleEdit = (e: React.MouseEvent) =>
  {
    e.preventDefault();
    e.stopPropagation();
    openModalWithProduct(product);
  };

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  {
    if (onClick)
    {
      return (
        <div role="button" tabIndex={0} onClick={() => onClick(product)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(product)} className="group outline-none">{children}</div>
      );
    }
    return (
      <a href={`/products/${product._id}`} className="group">{children}</a>
    );
  };

  return (
    <Wrapper>
      <div className="relative h-96 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-500/30">
        {canModifyProduct && (
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button onClick={handleEdit} className="w-10 h-10 bg-indigo-500/10 hover:bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group/edit" title="Edit product"><PencilIcon className="w-5 h-5 text-indigo-400 group-hover/edit:text-indigo-300" /></button>

            <button onClick={handleDelete} className="w-10 h-10 bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group/delete" title="Delete product"><TrashIcon className="w-5 h-5 text-red-400 group-hover/delete:text-red-300" /></button>
          </div>
        )}

        <div className="w-full h-full overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"/>
        </div>

        <div className="product-card-content absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/95 to-transparent backdrop-blur-md p-6">
          <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
            {product.name}
          </h2>
          <p className="text-white/70 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-indigo-400">
              ${product.price.toFixed(2)}
            </span>
            <svg className="w-5 h-5 text-white/60 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}