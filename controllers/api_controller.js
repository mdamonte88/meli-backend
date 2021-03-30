"use strict";

import fetch from "node-fetch";
import { getCategory, getMaxResultsId } from "./category_controller";

var ControllerAPI = () => {  };
ControllerAPI.getAll = async (req, res, next) =>
{   
    try {
        const { query = '' } = req.params;
        const base_url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;
        const response = await fetch(base_url);
        const data = await response.json();
        const results = data.results && data.results.filter((elem, i) => i < 4 );
        
        //New Fields
        for (var i = 0; i < results.length; i++) {
            results[i].picture = results[i].thumbnail;
            results[i].free_shipping = results[i].shipping ? results[i].shipping.free_shipping : false;
        }

        //Add Categories field
        let categories = [];
        const dataFilters = data.filters.length > 0 ? data.filters : 
                            (data.available_filters.length > 0 ? data.available_filters : []);

        const categoryFilter = dataFilters && dataFilters.find((elem, i) => elem.id === 'category');

        if (categoryFilter && categoryFilter.values) {
            //First category is the default value
            const firstElement = categoryFilter.values[0];
            categories = categoryFilter.values[0].path_from_root;

            //Finds the max result by category
            if(firstElement.results) {
                const categoryId = getMaxResultsId(categoryFilter.values);

                //Get the category with his path_from_root
                if (categoryId) {
                    categories = await getCategory(categoryId);
                }
            }
        }

        res.send({
            autor: {
                name: 'Matias',
                lastname: 'Damonte'
            },
            categories: categories,
            items: results 
        });
      } catch (err) {
        res.send({ message: "Server error", status: 500,  error: err});
      }

}

ControllerAPI.get = async (req, res, next) =>
{
    try {
        const { item_id = '' } = req.params;
        const base_url = `https://api.mercadolibre.com/items/${item_id}`;
        const response = await fetch(base_url);
        const data = await response.json();
        const categoryId = data.category_id;
        
        const responseDescription = await fetch(base_url + '/description');
        const dataDescription = await responseDescription.json();
        
        //Add picture and description fields
        data.picture = data.pictures[0].url;
        data.description = dataDescription.plain_text;

        data.categories = await getCategory(categoryId)

        res.send({
            autor: {
                name: 'Matias',
                lastname: 'Damonte'
            },
            item: data 
        });
      } catch (err) {
        res.send({ message: "Server error", status: 500,  error: err});
      }
}


ControllerAPI.error404 = (req, res, next) =>
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


module.exports = ControllerAPI;