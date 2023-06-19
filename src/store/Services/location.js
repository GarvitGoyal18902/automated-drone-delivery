require('@/store/mongodb');
import { ObjectId } from 'mongoose';
const Location = require('../Models/location');

class LocationService {
    async add({ username, start, end }, callback) {
        try {
            const location = new Location({ username, start, end });
            const response = await location.save();
            callback({ success: true, error: false }, response);
        } catch (error) {
            callback({ success: false, error }, null);
        }
    }

    async get(callback) {
        try {
            let response = await Location.find({ deliveryStatus: 'pending' })
                .sort({ createdAt: 1 })
                .limit(1);
            response = response && response.length > 0 ? response[0] : response;
            callback({ success: true, error: false }, response);
        } catch (error) {
            callback({ success: false, error }, null);
        }
    }

    async update({ id, deliveryStatus }, callback) {
        try {
            const response = await Location.findOneAndUpdate(
                { _id: id },
                { deliveryStatus }
            );
            callback({ success: true, error: false }, response);
        } catch (error) {
            callback({ success: false, error }, null);
        }
    }
}

export default LocationService;
