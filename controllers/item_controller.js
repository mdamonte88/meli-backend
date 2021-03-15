"use strict";

const ItemModel = require("../models/item")
var ControllerItem = () => {  };

ControllerItem.getAll = async (req, res, next) =>
{
    try {
        ItemModel.find().then((items, err) => {

            if(err) {
                res.send({ message: "No Items", status: 400 });
            }

            if(!items) {
                res.send({ items: [], message: "No items" });
            }
            res.send({ items: items });
        });


      } catch (err) {
        res.send({ message: "Server error", status: 500 });
      }

}

ControllerItem.get = async (req, res, next) =>
{
    const itemId = req.params.item_id;

    ItemModel.findOne({ _id: itemId }).then((item) => {
        res.send({ item: item });
    });
}


ControllerItem.error404 = (req, res, next) =>
{
    var error = new Error();
	error.status = 404;

	var locals = {
		title:"ERROR 404",
		description:"RECURSO NO ENCONTRADO",
		error: error
	}

    res.send({ message: locals , status: 404 });
}


module.exports = ControllerItem;