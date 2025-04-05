"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const types_1 = require("../types");
const router = (0, express_1.Router)();
// Hardcoded userId for testing/development
const DEFAULT_USER_ID = "0412e867-f4e7-4037-9dcf-cfb6c4736657";
// Create a progress record
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.CreateProgressSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }
    try {
        // Check if the installationId exists
        const installation = yield db_1.prismaClient.installation.findUnique({
            where: { id: parsedData.data.installationId },
        });
        if (!installation) {
            return res.status(404).json({ message: "Installation not found" });
        }
        // Create the progress record
        const progress = yield db_1.prismaClient.progress.create({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Fetch all progress records for the default user
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const progressRecords = yield db_1.prismaClient.progress.findMany({
            where: { userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
            include: {
                stages: true, // Include the stages in the response
            },
        });
        return res.json(progressRecords);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Fetch a single progress record by ID (for the default user)
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const progress = yield db_1.prismaClient.progress.findFirst({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
            include: {
                stages: true, // Include the stages in the response
            },
        });
        if (!progress) {
            return res.status(404).json({ message: "Progress record not found" });
        }
        return res.json(progress);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Update a progress record (for the default user)
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const body = req.body;
    const parsedData = types_1.UpdateProgressSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }
    try {
        const updatedProgress = yield db_1.prismaClient.progress.update({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
            data: {
                stages: {
                    updateMany: (_a = parsedData.data.stages) === null || _a === void 0 ? void 0 : _a.map((stage) => ({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Delete a progress record (for the default user)
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.prismaClient.progress.delete({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
        });
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
exports.progressRouter = router;
