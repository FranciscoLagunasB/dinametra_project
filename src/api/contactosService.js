// En tu servicio (por ejemplo, services/contactosService.js)

import axios from 'axios';

const BASE_URL = 'http://localhost:8000';  // Reemplaza con la URL de tu servidor Django

const contactosService = {
    getAll: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/contactos/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching contactos:', error);
            throw error;  // O maneja el error según tus necesidades
        }
    },
    // Puedes definir otras funciones para crear, actualizar o eliminar contactos según tu API
};

export default contactosService;
