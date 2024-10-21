import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import InfoSection from '../../components/InfoSection';
import Form from '../../components/Form';


function Crearcategoria() {
  const [formData, setFormData] = useState({ nombre: '', ubicacion: '' });
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/categoriascreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Navegar de vuelta a la lista de categorías después de crear la categoría
        navigate('/Gestioncategorias');
      } else {
        alert('Error al crear la categoría');
      }
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      alert('Error al crear la categoría');
    }
  };

  const fields = [
    { name: 'nombre', type: 'text', label: 'Nombre de la Categoría', placeholder: 'Ingresa el nombre de la categoría', required: true },
    { name: 'ubicacion', type: 'text', label: 'Ubicación', placeholder: 'Ubicación de la categoría', required: false },
    // Agrega más campos si es necesario
  ];

  const buttons = [
    { text: 'Cancelar', type: 'button', className: 'buttons-can', onClick: () => navigate('/Gestioncategorias'), hidden: false },
    { text: 'Crear Categoria', type: 'submit', hidden: false },
  ];
  
  return (
    <Layout>
      <InfoSection
        title="Crear nueva categoría"
        showSubtitle={false} // Mostrar subtítulo
        showDescription={false} // Mostrar descripción
      />
      
      <Form
      fields={fields}
      title="Información de la categoría"
      buttons={buttons}
      onSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      />
    </Layout>
  );
}

export default Crearcategoria;
