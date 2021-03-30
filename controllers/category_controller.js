"use strict";

import fetch from "node-fetch";

var ControllerCaterory = () => {  };
ControllerCaterory.getCategory = async (categoryId) =>
{
    const base_category_url = `https://api.mercadolibre.com/categories/${categoryId}`;
    const responseCategory = await fetch(base_category_url);
    const dataCategory = await responseCategory.json();

    return dataCategory.path_from_root;
}

ControllerCaterory.getMaxResultsId = (values) => 
{
    let max = 0;
    let categoryId;
    for (let index = 0; index < values.length; index++) {
        const element = values[index];
        if (element.results > max) {
            max = element.results;
            categoryId = element.id;
        }
    }

    return categoryId;
}

module.exports = ControllerCaterory;