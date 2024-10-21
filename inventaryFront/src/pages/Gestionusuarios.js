import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Table from '../components/Table';
import Button from '../components/Button';
import InfoSection from '../components/InfoSection';



function Gusuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const GusuariosColumns = ['id_usuario', 'documento', 'nombre', 'telefono', 'nombre_cargo'];
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los usuarios del backend
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3001/usuarios');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener los Usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  // Función para eliminar una usuarios
  const handleDelete = async (usuario) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/usuariosdelete/${usuario.id_usuario}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Eliminar la categoría del estado local para que la tabla se actualice
        setUsuarios(usuarios.filter((u) => u.id_usuario !== usuario.id_usuario));
      } else {
        alert('Error al eliminar la categoría');
      }
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      alert('Error al eliminar la categoría');
    }
  };

  const handleView = (usuario) => {
    navigate(`/GestionusuariosVer/${usuario.id_usuario}`);
};

const handleEdit = (usuario) => {
    navigate(`/GestionusuariosEditar/${usuario.id_usuario}`);
};

  return (
    <Layout>
      <InfoSection
        title="Gestión de Usuarios"
        description="En este módulo usted puede registrar nuevos Usuarios en el sistema, actualizar la información de los usuarios existentes y eliminar usuarios si es necesario"
        showSubtitle={false} // Mostrar subtítulo
        showDescription={true} // Mostrar descripción
      />
      <Button text="Nuevo Usuario" onClick={() => navigate('/GestionusuariosCrear')}/>
            
      <Table columns={GusuariosColumns} data={usuarios} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
    </Layout>
  );
}

export default Gusuarios;
