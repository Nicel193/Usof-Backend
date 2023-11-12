import express from "express";
import CategoriesController from "../controllers/categories.controller.js";

const router = express.Router();

router.post('/', CategoriesController.createCategory);
router.get('/', CategoriesController.getAllCategorise);
router.get('/:categoryId', CategoriesController.getCategoryById);
router.get('/:categoryId/posts', CategoriesController.getPostsByCategory);
router.patch('/:categoryId', CategoriesController.changeCategories);
router.delete('/:categoryId', CategoriesController.deleteCategories);

export default router;