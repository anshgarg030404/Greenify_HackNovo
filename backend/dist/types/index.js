"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProgressSchema = exports.CreateProgressSchema = exports.RequestInstallationSchema = exports.UpdateAssessmentSchema = exports.CreateAssessmentSchema = exports.UpdateProductSchema = exports.CreateProductSchema = exports.SigninSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string(),
    phone: zod_1.z.string(), // Add phone field
    location: zod_1.z.string().optional(), // Add location field (optional)
});
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.CreateProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    image: zod_1.z.string().url("Image must be a valid URL"),
});
// Schema for updating a product
exports.UpdateProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    description: zod_1.z.string().min(1, "Description is required").optional(),
    price: zod_1.z.number().positive("Price must be a positive number").optional(),
    image: zod_1.z.string().url("Image must be a valid URL").optional(),
});
exports.CreateAssessmentSchema = zod_1.z.object({
    installationId: zod_1.z.string(),
    assessmentDate: zod_1.z.string().datetime(),
    notes: zod_1.z.string().optional(),
    assessorName: zod_1.z.string(),
    assessorContact: zod_1.z.string(),
    roofCondition: zod_1.z.string(),
    shadingAnalysis: zod_1.z.string(),
    energyUsage: zod_1.z.number(),
    recommendations: zod_1.z.string().optional(),
});
exports.UpdateAssessmentSchema = exports.CreateAssessmentSchema.partial();
exports.RequestInstallationSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full name is required"),
    phone: zod_1.z.string().min(1, "Phone number is required"),
    address: zod_1.z.string().min(1, "Address is required"),
    location: zod_1.z.string().min(1, "Location is required"),
    systemType: zod_1.z.string().min(1, "System type is required"),
    systemSize: zod_1.z.string().min(1, "System size is required"),
    roofSize: zod_1.z.number().positive("Roof size must be a positive number"),
    energyConsumption: zod_1.z.number().positive("Energy consumption must be a positive number"),
    notes: zod_1.z.string().optional(),
});
exports.CreateProgressSchema = zod_1.z.object({
    installationId: zod_1.z.string().min(1, "Installation ID is required"),
    stages: zod_1.z.array(zod_1.z.object({
        stage: zod_1.z.enum([
            "INITIAL_CONSULTATION",
            "SITE_ASSESSMENT",
            "DESIGN_APPROVAL",
            "PERMITTING",
            "INSTALLATION",
            "INSPECTION",
            "SYSTEM_ACTIVATION",
        ]),
        status: zod_1.z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
        completionDate: zod_1.z.string().datetime().optional(),
    })),
});
exports.UpdateProgressSchema = exports.CreateProgressSchema.partial();
