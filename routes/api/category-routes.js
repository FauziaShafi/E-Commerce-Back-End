const router = require('express').Router();
const { Model } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
 
    const categoryData = Category.findAll( {
      include : [{Model : Product}],
    });
    res.status(200).json(categoryData);
  
   
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      
      include: [{ model: Product }],
    });

    if (!categoryById) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }

    res.status(200).json(categoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
 
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
