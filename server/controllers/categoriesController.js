import Category from "../models/Category.js";

class CategoryController {
    createCategory(req, res) {
        Category.createCategory(req.body, res);
    }   
    getAllCategorise(req, res) {
        Category.getAllCategory(res);
    }
    getCategoryById(req, res) {
        Category.getCategoryById(req.params.categoryId, res);
    }
    getPostsByCategory(req, res) {
        Category.getPostByCategory(req.params.categoryId, res);
    }
    changeCategory(req, res) {
        Category.changeCategory(req.params.categoryId, req.body, res);
    }
    deleteCategory(req, res) {
        Category.deleteCategory(req.params.categoryId, res);
    }
}

export default new CategoryController();