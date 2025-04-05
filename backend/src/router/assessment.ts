import { Request, Response, Router } from "express";
import { prismaClient } from "../db";
import { CreateAssessmentSchema, UpdateAssessmentSchema } from "../types/index";

const router = Router();

// Hardcoded userId for testing/development
const DEFAULT_USER_ID = "0412e867-f4e7-4037-9dcf-cfb6c4736657";

// Create an assessment
router.post("/", async (req: Request, res: Response): Promise<any> => {
    const body = req.body;
    const parsedData = CreateAssessmentSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }

    try {
        // Check if the installationId exists
        const installation = await prismaClient.installation.findUnique({
            where: { id: parsedData.data.installationId },
        });

        if (!installation) {
            return res.status(404).json({ message: "Installation not found" });
        }

        // Create the assessment
        const assessment = await prismaClient.assessment.create({
            data: {
                ...parsedData.data,
                userId: DEFAULT_USER_ID, // Add the hardcoded userId
            },
        });

        return res.status(201).json(assessment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch all assessments for the default user
router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const assessments = await prismaClient.assessment.findMany({
            where: { userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
        });
        return res.json(assessments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch a single assessment by ID (for the default user)
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const assessment = await prismaClient.assessment.findFirst({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
        });

        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }

        return res.json(assessment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update an assessment (for the default user)
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const body = req.body;
    const parsedData = UpdateAssessmentSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }

    try {
        const updatedAssessment = await prismaClient.assessment.update({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
            data: parsedData.data,
        });
        return res.json(updatedAssessment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete an assessment (for the default user)
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        await prismaClient.assessment.delete({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
        });
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export const assessmentRouter = router;