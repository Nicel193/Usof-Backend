import Categories from "../models/Categories.js";

class CategoriesController {
    createCategory(req, res) {
        Categories.createCategory(req.body, res);
    }   
    getAllCategorise(req, res) {
        Categories.getAllCategories(res);
    }
    getCategoryById(req, res) {
        Categories.getCategoryById(req.params.categoryId, res);
    }
    getPostsByCategory(req, res) {
        Categories.getPostByCategory(req.params.categoryId, res);
    }
    changeCategories(req, res) {
        Categories.changeCategories(req.params.categoryId, req.body, res);
    }
    deleteCategories(req, res) {
        Categories.deleteCategories(req.params.categoryId, res);
    }
}

export default new CategoriesController();