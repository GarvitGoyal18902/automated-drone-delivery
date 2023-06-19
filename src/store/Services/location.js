require('@/store/mongodb');
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
}

export default LocationService;
