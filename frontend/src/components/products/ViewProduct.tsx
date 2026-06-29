import { ArrowLeft, Box, Tag, Award, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock static product data matching your type definition
const mockProduct = {
  id: 1,
  name: "Premium Wireless Headphones",
  brand: "AudioMax",
  category: "Electronics",
  price: 299.99,
  discount_price: 249.99,
  short_description: "High-fidelity over-ear headphones with active noise cancellation and 40-hour battery life.",
  description: "Experience pure audio bliss with the AudioMax Premium Wireless Headphones. Featuring custom-tuned 40mm dynamic drivers, advanced active noise cancellation (ANC) that blocks out external ambient sounds, and an ergonomic design made for long listening sessions. The plush memory foam earcups provide exceptional comfort, while the intuitive touch controls allow you to manage music, calls, and voice assistants flawlessly.",
  status: "active", // options: active, inactive, out_of_stock
  stock: 45,
  is_featured: true,
};

export default function ViewProduct() {
  const navigate = useNavigate();
  const product = mockProduct; // Replace with your fetch hook later: const { id } = useParams();

  // Status config mapping matching your table rules
  const statusConfig: Record<string, { text: string; classes: string; dot: string }> = {
    active: {
      text: "Active",
      classes: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20 px-2.5",
      dot: "bg-emerald-500",
    },
    inactive: {
      text: "Inactive",
      classes: "bg-rose-50 text-rose-700 ring-rose-600/10 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20 px-2.5",
      dot: "bg-rose-500",
    },
    out_of_stock: {
      text: "Out of Stock",
      classes: "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20 px-4",
      dot: "bg-amber-500",
    },
  };

  const currentStatus = statusConfig[product.status] || statusConfig.active;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Back Button Action */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to products
      </button>

      {/* Main Content Layout Card */}
      <div className="rounded-2xl border overflow-hidden border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        
        {/* Header Summary Section */}
        <div className="px-6 py-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-black dark:text-white">
                {product.name}
              </h1>
              
              {/* Dynamic Status Badge */}
              <span className={`inline-flex items-center rounded-md py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap ${currentStatus.classes}`}>
                <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${currentStatus.dot}`} />
                {currentStatus.text}
              </span>

              {/* Featured Badge */}
              {product.is_featured && (
                <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
                  Featured
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-500 mt-1">{product.short_description}</p>
          </div>

          {/* Pricing Box Block */}
          <div className="text-left sm:text-right bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 min-w-[140px]">
            <span className="text-xs font-medium text-zinc-400 block uppercase tracking-wider">Price Details</span>
            {product.discount_price ? (
              <div className="space-y-0.5">
                <span className="text-2xl font-bold text-black dark:text-white">${product.discount_price}</span>
                <span className="text-sm text-zinc-400 line-through block">${product.price}</span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-black dark:text-white">${product.price}</span>
            )}
          </div>
        </div>

        {/* Technical specifications grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="p-4 border-r border-b md:border-b-0 border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
            <Layers className="text-zinc-400" size={18} />
            <div>
              <span className="text-xs text-zinc-400 block font-medium">Category</span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{product.category}</span>
            </div>
          </div>
          <div className="p-4 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
            <Award className="text-zinc-400" size={18} />
            <div>
              <span className="text-xs text-zinc-400 block font-medium">Brand</span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{product.brand}</span>
            </div>
          </div>
          <div className="p-4 border-r border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
            <Box className="text-zinc-400" size={18} />
            <div>
              <span className="text-xs text-zinc-400 block font-medium">Stock Available</span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{product.stock} units</span>
            </div>
          </div>
          <div className="p-4 flex items-center gap-3">
            <Tag className="text-zinc-400" size={18} />
            <div>
              <span className="text-xs text-zinc-400 block font-medium">Product ID</span>
              <span className="text-sm font-mono text-zinc-600 dark:text-zinc-400">#{product.id}</span>
            </div>
          </div>
        </div>

        {/* Detailed Full Description */}
        <div className="p-6 space-y-3">
          <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider">
            Full Description
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            {product.description}
          </p>
        </div>

      </div>
    </div>
  );
}