import React from 'react'
import './DetailsView.scss';

function DetailsView({data}) {
    console.log(data)
    // Función para obtener la URL de la imagen o una por defecto
    const getFotoURL = () => {
        if (data.foto) {
            // Si hay foto, retornamos la URL de la foto (reemplaza la URL por la tuya)
            return `URL_DE_TU_SERVIDOR/${data.foto}`;
        } else {
            // Si no hay foto, retornamos una imagen por defecto (ejemplo de Google)
            return 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png';
        }
    };

    return (
        <div className="details-container">
            <h2>Detalles del contacto</h2>
            <div className="profile-picture">
                <img src={getFotoURL()} alt="Foto de perfil" style={{ width: 200, height: 200, borderRadius: '50%' }} />
            </div>
            <div className="contact-info">
                <h3>{`${data.nombres} ${data.apellido_paterno} ${data.apellido_materno}`}</h3>
                <p>Alias: {data.alias}</p>
                <p>Fecha de nacimiento: {data.fecha_nacimiento}</p>
            </div>
            <div className="contact-details">
                <div>
                    <h4>Correos:</h4>
                    <ul>
                        {data.correos.map(correo => (
                            <li key={correo.correo_PK}>{correo.correo}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4>Teléfonos:</h4>
                    <ul>
                        {data.telefonos.map(telefono => (
                            <li key={telefono.telefono_PK}>{telefono.tipo}: {telefono.numero}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4>Direcciones:</h4>
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

export default DetailsView