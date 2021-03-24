import express from "express";
import controller from "../../controllers/item_controller";
import apiController from "../../controllers/api_controller";
    
const router = express.Router();
const production = true;

// @route  GET api/items/=:query
// @desc   Get all items
// @access Public
router.get("/:query", production ? apiController.getAll : controller.getAll );

// @route  GET api/items/item/:item_id
// @desc   GET a item
// @access Public
router.get("/item/:item_id",  production ? apiController.get : controller.get )

// @route  POST api/items
// @desc   Add a new item
// @access Public
router.post('/', controller.add );

router.use( controller.error404 );

module.exports = router;