const express = require("express"),
      controller = require("../../controllers/item_controller"),
      router = express.Router();


// @route  GET api/items
// @desc   Get all items
// @access Public
router.get("/", controller.getAll );


// @route  GET api/items/item/:id
// @desc   GET a item
// @access Public
router.get("/item/:item_id", controller.get )

router.use( controller.error404 );


module.exports = router;