require('Shared/Storage/mongodb');
const Location = require('../Models/location');

class LocationService {
    async add({ username, start, end }, callback) {
        try {
            const location = new Location({ username, start, end });
            await location.save();
            callback({ success: true, error: false }, response);
        } catch (error) {
            callback({ success: false, error }, response);
        }
    }
}

export default LocationService;
