import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FolderPlus,
  ArrowLeft,
  ChevronRight,
  Info,
  Tag,
  FileText,
  Upload,
  X,
} from "lucide-react";
import InputField from "../InputField";
import ErrorToast from "../ErrorToast";
import ErrorSpan from "../ErrorSpan";
import { useCreateCategory } from "../../hooks/useCategories";
import { useForm } from "react-hook-form";
import {
  createCategorySchema,
  type CreateCategorySchema,
} from "../../schemas/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateCategory() {
  const navigate = useNavigate();
  const { apiError, createCategory, loading } = useCreateCategory();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CreateCategorySchema>({
    mode: "onBlur",
    resolver: zodResolver(createCategorySchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setValue("image", undefined as never);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onSubmit = (data: CreateCategorySchema) => {
    const file =
      data.image && data.image.length > 0 ? data.image[0] : undefined;
    const payload = {
      name: data.name,
      description: data.description,
      image: file,
    };
    createCategory(payload);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 p-3 md:p-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
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
              Create Category
            </span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/5">
                <FolderPlus size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Add New Category
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm flex items-center gap-1.5">
                  <Info size={14} /> Group your products or content.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/categories")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-all border border-zinc-200 dark:border-zinc-800"
            >
              <ArrowLeft size={16} /> Back
            </button>
          </div>
        </header>

        {apiError && <ErrorToast message={apiError.message} />}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 shadow-xl shadow-black/2"
        >
          <div className="space-y-7">
            <div className="space-y-1">
              <InputField
                label="Category Name"
                icon={Tag}
                placeholder="e.g. Summer Collection"
                {...register("name")}
              />
              {errors.name?.message && (
                <ErrorSpan message={errors.name.message} />
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1 block">
                Description
              </label>
              <div className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus-within:border-black dark:focus-within:border-white transition-all p-3 flex gap-3">
                <FileText
                  size={18}
                  className="text-zinc-400 dark:text-zinc-500 mt-0.5 shrink-0"
                />
                <textarea
                  rows={4}
                  {...register("description")}
                  placeholder="Describe what goes into this category..."
                  className="w-full bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none resize-none raw-scrollbar"
                />
              </div>
              {errors.description?.message && (
                <ErrorSpan message={errors.description.message} />
              )}
            </div>

            <hr className="border-zinc-100 dark:border-zinc-900" />

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1 block">
                Category Image{" "}
                <span className="text-zinc-400 lowercase font-normal">
                  (optional)
                </span>
              </label>

              {!imagePreview ? (
                <label className="group relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 rounded-2xl bg-zinc-50/30 dark:bg-zinc-900/10 cursor-pointer transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 mb-2 group-hover:scale-110 transition-transform">
                      <Upload size={20} />
                    </div>
                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Click to upload image
                    </p>
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
                      PNG, JPG or WEBP up to 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image", {
                      onChange: handleImageChange,
                    })}
                  />
                </label>
              ) : (
                <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-900 h-80 group">
                  <img
                    src={imagePreview}
                    alt="Category preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={removeImage} 
                      className="p-2 rounded-xl bg-white text-black hover:bg-zinc-100 transition-transform hover:scale-105 font-medium text-xs flex items-center gap-1.5 shadow-lg"
                    >
                      <X size={14} /> Remove Image
                    </button>
                  </div>
                </div>
              )}
              {errors.image?.message && (
                <ErrorSpan message={errors.image.message as string} />
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold transition-all bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 active:scale-[0.99] text-[15px] shadow-lg shadow-black/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Category"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
