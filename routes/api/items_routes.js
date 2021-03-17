import express from "express";
import controller from "../../controllers/item_controller";
    
const router = express.Router();

// @route  GET api/items
// @desc   Get all items
// @access Public
router.get("/", controller.getAll );

// @route  GET api/items/item/:id
// @desc   GET a item
// @access Public
router.get("/item/:item_id", controller.get )

// @route  POST api/items
// @desc   Add a new item
// @access Public
router.post('/', controller.add );

router.use( controller.error404 );

module.exports = router;