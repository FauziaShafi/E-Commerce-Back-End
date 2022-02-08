const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data

  const TagData = await Tag.findAll({
    include: [{
      model: Product ,
      through :ProductTag,
    }],
  });

  res.status(200).json(TagData);

});

// GET TAG BY ID

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const TagById = await Tag.findByPk(req.params.id, {

      include: [{
        model: Product ,
        through :ProductTag,
      }],
    });

    if (!TagById) {
      res.status(404).json({
        message: 'No tag found with this id!'
      });
      return;
    }

    res.status(200).json(TagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE A NEW TAG

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE A TAG BY ID

router.put('/:id', async (req, res) => {
  
  try {
    const dbTags = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(dbTags);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE A TAG

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTags = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteTags) {
      res.status(404).json({
        message: 'No Tag found with this id!'
      });
      return;
    }

    res.status(200).json(deleteTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
