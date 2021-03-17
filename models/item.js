import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  id: {
    type: "Number",
    primaryKey: true,
    autoIncrement: true
  },
  title:"String",
  price:"Number",
  picture:"Number",
  condition:"String",
  free_shipping:"Boolean",
  sold_quantity:"Number",
  description:"String"
});

module.exports = mongoose.model('item', ItemSchema);
