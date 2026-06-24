import { useParams, useNavigate } from "react-router-dom";
import { useViewCategory } from "../../hooks/useCategories";
import {
  ArrowLeft,
  ChevronRight,
  Folder,
  //   Calendar,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import ErrorToast from "../ErrorToast";

export default function ViewCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { category, loading, error } = useViewCategory(Number(id));

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 p-3 md:p-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        {/* Navigation Breadcrumbs & Actions */}
        <header className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
            <button
              onClick={() => navigate("/categories")}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Categories
            </button>
            <ChevronRight
              size={14}
              className="text-zinc-300 dark:text-zinc-700"
            />
            <span className="text-zinc-400 dark:text-zinc-500 font-medium">
              View Category
            </span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/5">
                <Folder size={22} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {loading ? (
                    <div className="h-7 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse " />
                  ) : (
                    category?.name || "Category Details"
                  )}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm flex items-center gap-1.5 mt-0.5">
                  ID: #{id}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/categories")}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-all border border-zinc-200 dark:border-zinc-800"
            >
              <ArrowLeft size={16} /> Back
            </button>
          </div>
        </header>

        {error && <ErrorToast message={error.message} />}

        {/* Main Content Layout Card */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 dark:border-zinc-800 dark:bg-zinc-950 shadow-xl shadow-black/2 space-y-8">
          {/* Skeleton View State */}
          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
              <div className="space-y-3">
                <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>
          ) : (
            <>
              {/* Category Imagery Segment */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1 flex items-center gap-1.5">
                  <ImageIcon size={12} /> Banner Display
                </label>

                {category?.image ? (
                  <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-900 h-80">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-2xl bg-zinc-50/30 dark:bg-zinc-900/10 text-center text-zinc-400 dark:text-zinc-600">
                    <ImageIcon size={32} strokeWidth={1.5} className="mb-2" />
                    <p className="text-xs font-medium">
                      No image assigned to this category
                    </p>
                  </div>
                )}
              </div>

              <hr className="border-zinc-100 dark:border-zinc-900" />

              {/* Category Information Data Blocks */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1 flex items-center gap-1.5">
                    <Folder size={12} /> Category Name
                  </label>
                  <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10 p-3.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {category?.name}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1 flex items-center gap-1.5">
                  <FileText size={12} /> Full Description
                </label>
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10 p-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap min-h-25">
                  {category?.description || (
                    <span className="italic text-zinc-400 dark:text-zinc-600">
                      No descriptive text provided for this category.
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
