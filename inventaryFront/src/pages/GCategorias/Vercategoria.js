import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import InfoSection from '../../components/InfoSection';
import Form from '../../components/Form';

function VerCategoria() {
  const { id } = useParams();  // Obtener el ID de la categoría desde los parámetros de la URL
  const [formData, setFormData] = useState({ nombre: '', ubicacion: '' });
  const navigate = useNavigate();

  // Función para cargar los datos de la categoría desde el backend
  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await fetch(`http://localhost:3001/categoriasver/${id}`);
        const data = await response.json();
        console.log("Datos cargados: ",data);
        setFormData(data[0]);
      } catch (error) {
        console.error('Error al cargar la categoría:', error);
      }
    };

    fetchCategoria();
  }, [id]);

  const fields = [
    { name: 'nombre', type: 'text', label: 'Nombre de la Categoría', placeholder: 'Nombre de la categoría', required: true, readOnly: true, value:'dd' },
    { name: 'ubicacion', type: 'text', label: 'Ubicación', placeholder: 'Ubicación de la categoría', required: false, readOnly: true },
  ];

  const buttons = [
    { text: 'Volver', type: 'button', className: 'buttons-can', onClick: () => navigate('/Gestioncategorias'), hidden: false },
  ];

  return (
    <Layout>
      <InfoSection
        title="Ver Categoría"
        showSubtitle={false} // Mostrar subtítulo
        showDescription={false} // Mostrar descripción
      />
        <Form
          fields={fields}
          title="Información de la categoría"
          buttons={buttons}
          formData={formData}
          setFormData={setFormData}
        />

    </Layout>
  );
}

export default VerCategoria;
