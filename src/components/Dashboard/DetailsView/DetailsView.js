import React from 'react';
import './DetailsView.scss';

function DetailsView({ data }) {
    // Función para obtener la URL de la imagen o una por defecto
    const getFotoURL = () => {
        console.log(data)
        if (data.foto) {
            const base64Image = data.foto.split(',')[1];

            // Decodificar la imagen base64
            const byteCharacters = atob(base64Image);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' }); // Ajusta el tipo según el formato de tu imagen
            const imageUrl = URL.createObjectURL(blob);
            return imageUrl;
        } else {
            return 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg';
        }
    };

    return (
        <div className="details-container">
            <div className="contact-info">
                <div className="profile-picture">
                    <img src={getFotoURL()} alt="Foto de perfil" />
                </div>
                <div className="contact-details">
                    <h2>{`${data.nombres.toUpperCase()} ${data.apellido_paterno.toUpperCase()} ${data.apellido_materno.toUpperCase()}`}</h2>
                    <p><strong>Alias:</strong> {data.alias}</p>
                    <p><strong>Fecha de nacimiento:</strong> {data.fecha_nacimiento}</p>
                </div>
            </div>
            <div className="contact-details">
                <div>
                    <h3>Correos:</h3>
                    <ul>
                        {data.correos.map(correo => (
                            <li key={correo.correo_PK}>{correo.correo}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Teléfonos:</h3>
                    <ul>
                        {data.telefonos.map(telefono => (
                            <li key={telefono.telefono_PK}>{telefono.tipo}: {telefono.numero}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Direcciones:</h3>
                    <ul>
                        {data.direcciones.map(direccion => (
                            <li key={direccion.direccion_PK}>
                                {direccion.calle}, {direccion.numero_exterior}, {direccion.colonia}, {direccion.ciudad}, {direccion.estado}, {direccion.pais}, CP: {direccion.codigo_postal}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DetailsView;