const router = require('express').Router();
//const { Model } = require('sequelize/types');
const {
  Category,
  Product
} = require('../../models');

// The `/api/categories` endpoint

// GET ALL CATEGORIES

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  const categoryData = await Category.findAll({
    include: [{
      model: Product
    }],
  });

  res.status(200).json(categoryData);



});

// GET ONE CATEGORY BY ID

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryById = await Category.findByPk(req.params.id, {

      include: [{
        model: Product
      }],
    });

    if (!categoryById) {
      res.status(404).json({
        message: 'No Product found with this id!'
      });
      return;
    }

    res.status(200).json(categoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const dbCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(dbCategory);
  } catch (err) {
    res.status(400).json(err);
  }

});


// DELETE

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteCategory) {
      res.status(404).json({
        message: 'No Category found with this id!'
      });
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;