"use strict";

import ItemModel from "../models/item";

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

ControllerItem.add = (req, res, next) =>
{
    try {
        var item = new ItemModel({
            title: req.body.title,
            price: req.body.price,
            picture: req.body.picture,
            condition: req.body.condition,
            free_shipping: req.body.free_shipping,
            sold_quantity: req.body.sold_quantity,
            description: req.body.description

        });
        
        item.save().then((itemAdded, err) => {
            if(err)
            {
                var locals = {
                    title:"Error al agregar el registro con title: " + itemAdded.title,
                    description:"Error de Sintaxis SQL",
                    error:err
                }
        
                res.send({ error: locals});
            }
    
            res.send(itemAdded)
        })
        .catch((e) => {
            if (e._message) {
                res.send({ message: e._message, status: 500})
            }

            if(e.name === 'MongoError' && e.code === 11000) {
                res.send({ message: 'duplicate key error', keyValue: e.keyValue, status: 500})
            }
        });
    } catch (e) {
        res.send({ message: "Server error", status: 500 });
    }
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