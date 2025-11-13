import type { Product } from "@/types/product.types";

export default function ProductDetailsModal({ product, onClose }: { product: Product; onClose: () => void })
{
  if (!product) return null;

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) =>
  {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label={`Details for ${product.name}`}>
      <div className="relative w-full max-w-3xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 z-10 w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-72 md:h-full bg-black/40">
            {product.image && (<img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover"/>)}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
          </div>

          <div className="p-6 md:p-8 text-white">
            <div className="mb-3">
              <span className="inline-block text-xs uppercase tracking-wider text-white/70 bg-white/10 border border-white/20 rounded-full px-3 py-1">
                {product.category}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h2>
            <div className="text-indigo-300 text-xl font-semibold mb-4">
              ${product.price.toFixed(2)}
            </div>
            <p className="text-white/80 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
