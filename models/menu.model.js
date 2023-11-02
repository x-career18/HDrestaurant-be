import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
    code: {
        type: String,
        default: 'M_000',
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['món ăn', 'đồ uống'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    idRestaurant: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const MenuModel = mongoose.model('Menu', MenuSchema);

export default MenuModel;