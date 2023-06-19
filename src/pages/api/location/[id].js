// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import LocationService from '@/store/Services/location';

export default function handler(req, res) {
    switch (req.method) {
        case 'PUT':
            updateDeliveryStatus(req, res);
            break;
    }
}

const updateDeliveryStatus = async (req, res) => {
    try {
        const locationService = new LocationService();

        const { deliveryStatus } = req.body;
        const { id } = req.query;
        const updateObject = { id, deliveryStatus };
        await locationService.update(updateObject, (message, response) => {
            if (message.success) {
                res.status(200).json({ message, response });
            } else {
                res.status(500).json({ message, response });
            }
        });
    } catch (error) {
        console.log('ERROR UPDAING LOCATION', error);
        res.status(500).json({ success: false, error, response: null });
    }
};
