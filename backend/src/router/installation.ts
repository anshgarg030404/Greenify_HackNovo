import { Request, Response, Router } from "express";
import { prismaClient } from "../db";
import { RequestInstallationSchema } from "../types";
import { authMiddleware } from "../middleware";

const router = Router();

// Request an installation
router.post("/", authMiddleware , async (req: Request, res: Response): Promise<any> => {
    // @ts-ignore
    const userId = req.id;

    // const id = "98cf3e79-8557-456c-a0f8-0e25f722c1f7"

    const body = req.body;
    const parsedData = RequestInstallationSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }

    try {
        const installation = await prismaClient.installation.create({
            data: {
                ...parsedData.data,
                userId, // Use the authenticated user's ID
            },
        });

        return res.status(201).json(installation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch all installations for the authenticated user
router.get("/", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    // @ts-expect-error no error
    const userId = req.id;

    try {
        const installations = await prismaClient.installation.findMany({
            where: { userId },
        });
        return res.json(installations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch a single installation by ID for the authenticated user
router.get("/:id", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    // @ts-expect-error no error
    const userId = req.id;
    const { id } = req.params;

    try {
        const installation = await prismaClient.installation.findFirst({
            where: { id, userId },
        });

        if (!installation) {
            return res.status(404).json({ message: "Installation not found" });
        }

        return res.json(installation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update an installation for the authenticated user
router.put("/:id", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    // @ts-expect-error no error
    const userId = req.id;
    const { id } = req.params;
    const body = req.body;
    const parsedData = RequestInstallationSchema.partial().safeParse(body);

    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }

    try {
        const updatedInstallation = await prismaClient.installation.update({
            where: { id, userId },
            data: parsedData.data,
        });
        return res.json(updatedInstallation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete an installation for the authenticated user
router.delete("/:id", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    // @ts-expect-error no error
    const userId = req.id;
    const { id } = req.params;

    try {
        await prismaClient.installation.delete({
            where: { id, userId },
        });
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export const installationRouter = router;