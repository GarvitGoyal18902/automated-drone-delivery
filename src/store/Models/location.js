const mongoose = require('mongoose');

// Definte User Schema to Mongoose
const locationSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            default: ''
        },
        start: {
            type: String,
            trim: true,
            default: ''
        },
        end: {
            type: String,
            trim: true,
            default: ''
        },
        deliveryStatus: {
            type: String,
            enum: ['pending', 'pickedup', 'on_the_way', 'delivered', 'failed'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
);

// Define JSON value for User without functions
locationSchema.methods.toJSON = function () {
    const locationSchema = this;
    const locationObject = locationSchema.toObject();

    locationObject.id = locationObject._id;

    return locationObject;
};

// Declare Location Model from Mongoose using Location Schema
module.exports =
    mongoose.models.Location || mongoose.model('Location', locationSchema);
