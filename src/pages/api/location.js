// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import LocationService from '@/store/Services/location';

export default function handler(req, res) {
    switch (req.method) {
        case 'POST':
            console.log('POST');
            createDeliveryLocation(req, res);
            break;
        case 'GET':
            getDeliveryLocation(req, res);
            break;
    }
}

const getDeliveryLocation = async (req, res) => {
    try {
        const locationService = new LocationService();

        await locationService.get((message, response) => {
            if (message.success) {
                res.status(200).json({ message, response });
            } else {
                res.status(500).json({ message, response });
            }
        });
    } catch (error) {
        console.log('ERROR GETTING LOCATION', error);
        res.status(500).json({ message, response });
    }
};

const createDeliveryLocation = async (req, res) => {
    try {
        const locationService = new LocationService();
        const { username, start, end, scheduleDateTime } = JSON.parse(req.body);

        await locationService.add(
            { username, start, end, scheduleDateTime },
            (message, response) => {
                if (message.success) {
                    res.status(200).json({ message, response });
                } else {
                    res.status(500).json({ message, response });
                }
            }
        );
    } catch (error) {
        console.log('ERROR ADDING LOCATION', error);
        res.status(500).json({ message, response });
    }
};
