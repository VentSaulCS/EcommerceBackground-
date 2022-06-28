const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
 const associatedProducts = await Product.findAll({
    include: [ProductTag]
  });
res.json(associatedProducts)
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
const productData = await Tag.findOne({
  where: {
    id: req.params.id
  },
  include: [Tag],
})

res.json(productData)
});

router.post('/', (req, res) => {
  // create a new tag
 const newTag = await Tag.create(req.body);
  res.json(newTag);
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
 const updatedTag = await Tag.update(req.body, {
    where:{
      id: req.params.id,
    }
  });
  res.json(updatedTag)
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where: {
      id: req.params.id,
    }
  });
  res.json({ message: 'Deleted'})
});

module.exports = router;
