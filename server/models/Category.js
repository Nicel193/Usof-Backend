import DbPost from "../db/scheme/post.js";
import DbCategory from "../db/scheme/categories.js";

class Categories {
  async createCategory(content, res) {
    try {
      const categoryData = {
        title: content.title,
        description: content.description,
      };

      await DbCategory.create(categoryData);

      res.json("Success");
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }

  async getAllCategories(res) {
    try {
      const categories = await DbCategory.findAll();

      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }

  async getCategoryById(id, res) {
    try {
      const category = await DbCategory.findByPk(id);

      if (!category) {
        res.status(400).json("Not found");
        return;
      }

      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }

  async getPostByCategory(id, res) {
    try {
      const category = await DbCategory.findByPk(id, {
        include: [
          {
            model: DbPost,
            through: { attributes: [] }
          },
        ],
      });

      if (!category) {
        res.json("Not found");
      }

      res.json(category.Posts);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }

  async changeCategory(id, content, res) {
    try {
      const [updatedRowsCount] = await DbCategory.update(content, {
        where: { id },
      });

      if (updatedRowsCount === 0) {
        res.status(400).json("Not found");
        return;
      }

      res.json("Success");
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }

  async deleteCategory(id, res) {
    try {
      const deletedRowCount = await DbCategory.destroy({ where: { id } });

      if (deletedRowCount === 0) {
        res.status(400).json("Not found");
        return;
      }

      res.json("Success");
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }
}

export default new Categories();
