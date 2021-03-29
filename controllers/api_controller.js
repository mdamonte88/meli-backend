"use strict";

import fetch from "node-fetch";

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
        const categoryFilter = data.filters && data.filters.filter((elem, i) => elem.id === 'category')[0];
        const categories = categoryFilter.values && categoryFilter.values[0].path_from_root;

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
        console.log('base_url:', base_url);
        const response = await fetch(base_url);
        const data = await response.json();
        const categoryId = data.category_id;
        
        const responseDescription = await fetch(base_url+'/description');
        const dataDescription = await responseDescription.json();
        
        //Add picture and description fields
        data.picture = data.pictures[0].url;
        data.description = dataDescription.plain_text;

        const base_category_url = `https://api.mercadolibre.com/categories/${categoryId}`;
        const responseCategory = await fetch(base_category_url);
        const dataCategory = await responseCategory.json();
        data.categories = dataCategory.path_from_root;

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