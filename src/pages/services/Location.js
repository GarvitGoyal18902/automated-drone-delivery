export const add = async (data) => {
    try {
        await fetch('/api/location', {
            body: JSON.stringify(data),
            method: 'POST'
        })
            .then((response) => {
                return {
                    success: true,
                    error: false,
                    response: response.json()
                };
            })
            .catch((error) => {
                return {
                    success: false,
                    error: true,
                    response: error
                };
            });
    } catch (error) {
        return {
            success: false,
            error: true,
            response: error
        };
    }
};
