import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import InfoSection from '../../components/InfoSection';
import Form from '../../components/Form';


function Actualizarcategoria() {
  const { id } = useParams();  // Obtener el ID de la categoría desde los parámetros de la URL
  const [formData, setFormData] = useState({ nombre: '', ubicacion: '' });
  const navigate = useNavigate();

  // Función para cargar los datos de la categoría desde el backend
  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await fetch(`http://localhost:3001/categoriasver/${id}`);
        const data = await response.json();
        setFormData(data[0]);
      } catch (error) {
        console.error('Error al cargar la categoría:', error);
      }
    };

    fetchCategoria();
  }, [id]);

  // Función para manejar el envío del formulario de actualización
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/categoriasupdate/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Navegar de vuelta a la lista de categorías después de actualizar
        navigate('/Gestioncategorias');
      } else {
        alert('Error al actualizar lasd categoría');
      }
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
      alert('Error al actualizar la categoría');
    }
  };

  const fields = [
    { name: 'nombre', type: 'text', label: 'Nombre de la Categoría', placeholder: 'Nombre de la categoría', required: true },
    { name: 'ubicacion', type: 'text', label: 'Ubicación', placeholder: 'Ubicación de la categoría', required: false },
  ];

  const buttons = [
    { text: 'Cancelar', type: 'button', className: 'buttons-can', onClick: () => navigate('/Gestioncategorias'), hidden: false },
    { text: 'Actualizar Categoría', type: 'submit', hidden: false },
  ];

  return (
    <Layout>
      <InfoSection
        title="Actualizar Categoría"
        showSubtitle={false} // Mostrar subtítulo
        showDescription={false} // Mostrar descripción
      />
      <Form
        fields={fields}
        title="Información de la categoría"
        buttons={buttons}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}  // Asignar la función de envío de formulario
      />
    </Layout>
  );
}

export default Actualizarcategoria;
