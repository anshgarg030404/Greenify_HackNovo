import { z } from "zod"

export const SignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    phone: z.string(), // Add phone field
    location: z.string().optional(), // Add location field (optional)
});

export const SigninSchema = z.object({
    email : z.string(),
    password : z.string(),
})

export const CreateProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    image: z.string().url("Image must be a valid URL"),
});

// Schema for updating a product
export const UpdateProductSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    image: z.string().url("Image must be a valid URL").optional(),
});

// Type inference for the schemas
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;

export const CreateAssessmentSchema = z.object({
    installationId: z.string(),
    assessmentDate: z.string().datetime(),
    notes: z.string().optional(),
    assessorName: z.string(),
    assessorContact: z.string(),
    roofCondition: z.string(),
    shadingAnalysis: z.string(),
    energyUsage: z.number(),
    recommendations: z.string().optional(),
});

export const UpdateAssessmentSchema = CreateAssessmentSchema.partial();

export type CreateAssessmentInput = z.infer<typeof CreateAssessmentSchema>;
export type UpdateAssessmentInput = z.infer<typeof UpdateAssessmentSchema>;

export const RequestInstallationSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    location: z.string().min(1, "Location is required"),
    systemType: z.string().min(1, "System type is required"),
    systemSize: z.string().min(1, "System size is required"),
    roofSize: z.number().positive("Roof size must be a positive number"),
    energyConsumption: z.number().positive("Energy consumption must be a positive number"),
    notes: z.string().optional(),
});

export type RequestInstallationInput = z.infer<typeof RequestInstallationSchema>;

export const CreateProgressSchema = z.object({
    installationId: z.string().min(1, "Installation ID is required"),
    stages: z.array(
        z.object({
            stage: z.enum([
                "INITIAL_CONSULTATION",
                "SITE_ASSESSMENT",
                "DESIGN_APPROVAL",
                "PERMITTING",
                "INSTALLATION",
                "INSPECTION",
                "SYSTEM_ACTIVATION",
            ]),
            status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
            completionDate: z.string().datetime().optional(),
        })
    ),
});

export const UpdateProgressSchema = CreateProgressSchema.partial();

export type CreateProgressInput = z.infer<typeof CreateProgressSchema>;
export type UpdateProgressInput = z.infer<typeof UpdateProgressSchema>;