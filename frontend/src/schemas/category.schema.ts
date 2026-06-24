import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; 
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
  "image/avif",
];

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(255, "Description must be less than 255 characters"),
  image: z
    .custom<FileList>()
    .refine(
      (files) => !files || files.length === 0 || files instanceof FileList,
      {
        message: "Expected a file upload setup",
      },
    )
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files[0].size <= MAX_FILE_SIZE;
    }, `Max image size is 2MB.`)
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported.")
    .nullable()
    .optional(),
});


export const updateCategorySchema = createCategorySchema.partial();

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
