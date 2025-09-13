import Category from './category.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parent');
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('parent');
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name?.trim(),
      slug: req.body.slug?.trim().toLowerCase(),
      description: req.body.description?.trim(),
      image: req.body.image,
      parent: req.body.parent || null,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    });

    if (!category.name || !category.slug) {
      return res.status(400).json({ error: 'Name and slug are required.' });
    }

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.slug) {
      return res.status(400).json({ error: 'Slug must be unique.' });
    }
    res.status(500).json({ error: error.message });
  }
};

/* export const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; */

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
