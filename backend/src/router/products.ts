import { Request, Response, Router } from "express";
import { prismaClient } from "../db";
import { authMiddleware } from "../middleware";
import { CreateProductSchema, UpdateProductSchema } from "../types/index"; // Import the schemas

const router = Router();

// Create a new product
router.post("/", async (req: Request, res: Response): Promise<any> => {
    const body = req.body;

    // Validate request body
    const parsedData = CreateProductSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }

    try {
        const product = await prismaClient.product.create({
            data: parsedData.data,
        });

        return res.status(201).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch all products
router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const products = await prismaClient.product.findMany();
        return res.json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch a single product by ID
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const product = await prismaClient.product.findUnique({
            where: { id },
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update a product by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const body = req.body;

    // Validate request body
    const parsedData = UpdateProductSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }

    try {
        const updatedProduct = await prismaClient.product.update({
            where: { id },
            data: parsedData.data,
        });

        return res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a product by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        await prismaClient.product.delete({
            where: { id },
        });

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export const productRouter = router;