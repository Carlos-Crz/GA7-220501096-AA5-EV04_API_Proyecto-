import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import InfoSection from '../../components/InfoSection';
import Form from '../../components/Form';


function Crearusuarios() {
  const [formData, setFormData] = useState({ tipo_documento: '', documento: '', nombre: '', apellido: '', fecha_nacimiento: '', genero: '', telefono: '', email: '',  nombre_usuario: '', contrasenia: '', id_cargo: '' });
  const navigate = useNavigate();
  const [cargos, setCargos] = useState([]);

  // Obtener los cargos desde el backend
  useEffect(() => {
    axios.get('http://localhost:3001/cargos')
      .then(response => setCargos(response.data))
      .catch(error => console.error('Error al obtener los cargos:', error));
  }, []);


  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/usuarioscreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Navegar de vuelta a la lista de usuarios después de crear el usuario
        navigate('/Gestionusuarios');
      } else {
        alert('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Error al crear el usuario server');
    }
  };

  // Definir los campos del formulario
  const fields = [
    { name: 'tipo_documento', label: 'Tipo de Documento', type: 'select', required: true },
    { name: 'documento', label: 'Número de documento', type: 'text', required: true },
    { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre', required: true },
    { name: 'apellido', label: 'Apellido', type: 'text', placeholder: 'Ingrese los apellidos', required: true },
    { name: 'genero', label: 'Género', type: 'select', required: true },
    { name: 'telefono', label: 'Teléfono', type: 'text', placeholder: 'Ingrese el número de teléfono', required: true },
    { name: 'email', label: 'Correo electronico', type: 'email', placeholder: 'correo@ejemplo.com', required: true },
    { name: 'fecha_nacimiento', label: 'Fecha de Nacimiento', type: 'date', required: true },
    { name: 'nombre_usuario', label: 'Nombre de Usuario', type: 'text', placeholder: 'Usuario', required: true },
    { name: 'contrasenia', label: 'Contraseña', type: 'password', placeholder: 'Contraseña', required: true },
    { name: 'id_cargo', label: 'Cargo', type: 'select', required: true }
  ];

  // Cargar opciones de cargos en el select
  const selectOptions = {
    tipo_documento: [
      { value: 'CC', label: 'Cédula de Ciudadanía' },
      { value: 'TI', label: 'Tarjeta de Identidad' },
      { value: 'PA', label: 'Pasaporte' },
    ],
    genero: [
      { value: 'M', label: 'Masculino' },
      { value: 'F', label: 'Femenino' },
      { value: 'O', label: 'Otro' },
    ],
    id_cargo: cargos.map(cargo => ({
      value: cargo.id_cargo,
      label: cargo.nombre_cargo
    }))
  };

  const buttons = [
    { text: 'Cancelar', type: 'button', className: 'buttons-can', onClick: () => navigate('/Gestionusuarios'), hidden: false },
    { text: 'Crear Categoria', type: 'submit', hidden: false },
  ];
  
  return (
    <Layout>
      <InfoSection
        title="Crear nuevo usuario"
        showSubtitle={false} // Mostrar subtítulo
        showDescription={false} // Mostrar descripción
      />
      
      <Form
      fields={fields}
      title="Información de usuario"
      buttons={buttons}
      onSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      selectOptions={selectOptions}
      />
    </Layout>
  );
}

export default Crearusuarios;
