import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import InfoSection from '../../components/InfoSection';
import Form from '../../components/Form';

function VerUsuario() {
  const { id } = useParams();  // Obtener el ID del usuario desde los parámetros de la URL
  const [formData, setFormData] = useState({ tipo_documento: '', documento: '', nombre: '', apellido: '', fecha_nacimiento: '', genero: '', telefono: '', email: '',  nombre_cargo: '' });
  const navigate = useNavigate();

  // Función para cargar los datos del usuario desde el backend
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:3001/usuariosver/${id}`);
        const data = await response.json();
        console.log("Datos cargados: ",data);
        setFormData(data[0]);
        
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      }
    };

    fetchUsuario();
  }, [id]);

  const fields = [
    { name: 'tipo_documento', type: 'text', label: 'Tipo de Documento', required: true, readOnly: true },
    { name: 'documento', type: 'text', label: 'Número de documento', required: true, readOnly: true },
    { name: 'nombre', type: 'text', label: 'Nombre', required: true, readOnly: true },
    { name: 'apellido', type: 'text', label: 'Apellido', required: true, readOnly: true },
    { name: 'genero', type: 'text', label: 'Género', required: true, readOnly: true },
    { name: 'telefono', type: 'text', label: 'Telefono', required: true, readOnly: true },
    { name: 'nombre_cargo', type: 'text', label: 'Cargo', required: true, readOnly: true },
  ];

  const buttons = [
    { text: 'Volver', type: 'button', className: 'buttons-can', onClick: () => navigate('/Gestionusuarios'), hidden: false },
  ];

  return (
    <Layout>
      <InfoSection
        title="Ver Usuario"
        showSubtitle={false} // Mostrar subtítulo
        showDescription={false} // Mostrar descripción
      />
        <Form
          fields={fields}
          title="Información del usuario"
          buttons={buttons}
          formData={formData}
          setFormData={setFormData}
        />

    </Layout>
  );
}

export default VerUsuario;
