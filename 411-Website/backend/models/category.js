const db = require('../db'); // Ensure this is the promise-based pool

const categoryController = {
  createCategory: async (req, res) => {
    const { category_name } = req.body;
    const query = 'INSERT INTO Category (category_name) VALUES (?)';

    try {
      const [results] = await db.query(query, [category_name]);
      res.status(201).json({ message: 'Category created', categoryId: results.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllCategories: async (req, res) => {
    const query = 'SELECT * FROM Category';

    try {
      const [results] = await db.query(query);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getCategoryById: async (req, res) => {
    const query = 'SELECT * FROM Category WHERE category_id = ?';

    try {
      const [results] = await db.query(query, [req.params.id]);
      res.json(results[0] || { message: 'Category not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateCategoryById: async (req, res) => {
    const { category_name } = req.body;
    const query = 'UPDATE Category SET category_name = ? WHERE category_id = ?';

    try {
      await db.query(query, [category_name, req.params.id]);
      res.json({ message: 'Category updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteCategoryById: async (req, res) => {
    const query = 'DELETE FROM Category WHERE category_id = ?';

    try {
      await db.query(query, [req.params.id]);
      res.json({ message: 'Category deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = categoryController;
