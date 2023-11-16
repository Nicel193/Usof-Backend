import express from "express";
import CategoriesController from "../controllers/categoriesController.js";

const router = express.Router();

router.post('/', CategoriesController.createCategory);
router.get('/', CategoriesController.getAllCategorise);
router.get('/:categoryId', CategoriesController.getCategoryById);
router.get('/:categoryId/posts', CategoriesController.getPostsByCategory);
router.patch('/:categoryId', CategoriesController.changeCategory);
router.delete('/:categoryId', CategoriesController.deleteCategory);

export default router;