import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  id: {
    type: "Number",
    primaryKey: true,
    autoIncrement: true
  },
  title:"String",
});

module.exports = mongoose.model('item', ItemSchema);
