import { Request, Response, Router } from "express";
import { prismaClient } from "../db";
import { CreateProgressSchema, UpdateProgressSchema } from "../types";

const router = Router();

// Hardcoded userId for testing/development
const DEFAULT_USER_ID = "0412e867-f4e7-4037-9dcf-cfb6c4736657";

// Create a progress record
router.post("/", async (req: Request, res: Response): Promise<any> => {
    const body = req.body;
    const parsedData = CreateProgressSchema.safeParse(body);

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

        // Create the progress record
        const progress = await prismaClient.progress.create({
            data: {
                userId: DEFAULT_USER_ID, // Add the hardcoded userId
                installationId: parsedData.data.installationId,
                stages: {
                    create: parsedData.data.stages.map((stage) => ({
                        stage: stage.stage,
                        status: stage.status,
                        completionDate: stage.completionDate,
                    })),
                },
            },
            include: {
                stages: true, // Include the stages in the response
            },
        });

        return res.status(201).json(progress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch all progress records for the default user
router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const progressRecords = await prismaClient.progress.findMany({
            where: { userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
            include: {
                stages: true, // Include the stages in the response
            },
        });
        return res.json(progressRecords);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch a single progress record by ID (for the default user)
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const progress = await prismaClient.progress.findFirst({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
            include: {
                stages: true, // Include the stages in the response
            },
        });

        if (!progress) {
            return res.status(404).json({ message: "Progress record not found" });
        }

        return res.json(progress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update a progress record (for the default user)
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const body = req.body;
    const parsedData = UpdateProgressSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }

    try {
        const updatedProgress = await prismaClient.progress.update({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
            data: {
                stages: {
                    updateMany: parsedData.data.stages?.map((stage) => ({
                        where: { stage: stage.stage },
                        data: {
                            status: stage.status,
                            completionDate: stage.completionDate,
                        },
                    })),
                },
            },
            include: {
                stages: true, // Include the stages in the response
            },
        });
        return res.json(updatedProgress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a progress record (for the default user)
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        await prismaClient.progress.delete({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
        });
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export const progressRouter = router;