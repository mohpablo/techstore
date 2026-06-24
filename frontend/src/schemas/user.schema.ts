import z from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    phone: z
      .string()
      .length(11, "Phone number must be exactly 11 digits")
      .optional()
      .or(z.literal("")),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    role: z.string({ message: "Role is required" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const updateUserSchema = (currentUserEmail: string) =>
  z
    .object({
      name: z.string().min(1, "Name is required"),
      phone: z
        .string()
        .length(11, "Phone number must be exactly 11 digits")
        .optional()
        .or(z.literal("")),
      email: z.email("Invalid email"),
      role: z.string({ message: "Role is required" }),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .optional()
        .or(z.literal("")),
      password_confirmation: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .optional()
        .or(z.literal("")),
    })
    .superRefine((data, ctx) => {
      if (data.email !== currentUserEmail) {
        ctx.addIssue({
          code: "custom",
          message: "You are not allowed to change your email address.",
          path: ["email"],
        });
      }
      if (data.password || data.password_confirmation) {
        if (data.password !== data.password_confirmation) {
          ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["password_confirmation"],
          });
        }
      }
    });
    
export type CreateUserSchema = z.infer<typeof createUserSchema>;

export type UpdateUserSchema = z.infer<ReturnType<typeof updateUserSchema>>;
