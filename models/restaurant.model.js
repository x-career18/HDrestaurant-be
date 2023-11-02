import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    openingHours: {
        type: String,
        required: true,
    },
    closingHours: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    idRestaurant: {
        type: String,
        required: true,
    },
    idManager: {
        type: String,
        required: true,
    },
    locationCode: {
        type: String,
        required: true,
    },
    locationName: {
        type: String,
        required: true,
    },

}, { timestamps: true });


const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema);

export default RestaurantModel;