import { z } from "zod";

export const PRODUCT_CATEGORIES = ["keyboards", "mice", "headphones", "monitors", "speakers"] as const;

export const productFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  description: z.string().min(1, { message: "Description is required" }).max(1000, { message: "Description must be less than 1000 characters" }),
  price: z.number().min(0, { message: "Price is required" }).max(1000000, { message: "Price must be less than 1000000" }),
  category: z.enum(PRODUCT_CATEGORIES, { message: "Please select a valid category" }),
  image: z.string().min(1, { message: "Image is required" }).url({ message: "Image must be a valid URL" }),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;