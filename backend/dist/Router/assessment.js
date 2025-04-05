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
exports.assessmentRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const index_1 = require("../types/index");
const router = (0, express_1.Router)();
// Hardcoded userId for testing/development
const DEFAULT_USER_ID = "0412e867-f4e7-4037-9dcf-cfb6c4736657";
// Create an assessment
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = index_1.CreateAssessmentSchema.safeParse(body);
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
        // Create the assessment
        const assessment = yield db_1.prismaClient.assessment.create({
            data: Object.assign(Object.assign({}, parsedData.data), { userId: DEFAULT_USER_ID }),
        });
        return res.status(201).json(assessment);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Fetch all assessments for the default user
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assessments = yield db_1.prismaClient.assessment.findMany({
            where: { userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
        });
        return res.json(assessments);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Fetch a single assessment by ID (for the default user)
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const assessment = yield db_1.prismaClient.assessment.findFirst({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
        });
        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }
        return res.json(assessment);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Update an assessment (for the default user)
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    const parsedData = index_1.UpdateAssessmentSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }
    try {
        const updatedAssessment = yield db_1.prismaClient.assessment.update({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
            data: parsedData.data,
        });
        return res.json(updatedAssessment);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Delete an assessment (for the default user)
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.prismaClient.assessment.delete({
            where: { id, userId: DEFAULT_USER_ID }, // Filter by the hardcoded userId
        });
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
exports.assessmentRouter = router;
