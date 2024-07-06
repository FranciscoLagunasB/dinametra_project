import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const contactosService = {
    getAll: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/contactos/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching contactos:', error);
            throw error;
        }
    },
};

export default contactosService;
