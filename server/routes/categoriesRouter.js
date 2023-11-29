import express from "express";
import CategoriesController from "../controllers/categoriesController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(["admin"]), CategoriesController.createCategory);
router.get('/', CategoriesController.getAllCategorise);
router.get('/:categoryId', CategoriesController.getCategoryById);
router.get('/:categoryId/posts', CategoriesController.getPostsByCategory);
router.patch('/:categoryId', authMiddleware, roleMiddleware(["admin"]), CategoriesController.changeCategory);
router.delete('/:categoryId', authMiddleware, roleMiddleware(["admin"]), CategoriesController.deleteCategory);

export default router;