import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import Button from '../components/Button';
import InfoSection from '../components/InfoSection';

import { useNavigate } from 'react-router-dom';



function Gcategorias() {
  const [categorias, setCategorias] = useState([]);
  const GcategoriasColumns = ['id_categoria', 'nombre', 'ubicacion'];
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener las categorías del backend
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3001/categorias');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  // Función para eliminar una categoría
  const handleDelete = async (categoria) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta categoría?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/categoriasdelete/${categoria.id_categoria}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Eliminar la categoría del estado local para que la tabla se actualice
        setCategorias(categorias.filter((c) => c.id_categoria !== categoria.id_categoria));
      } else {
        alert('Error al eliminar la categoría');
      }
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      alert('Error al eliminar la categoría');
    }
  };
  const handleView = (categoria) => {
    navigate(`/GestioncategoriasVer/${categoria.id_categoria}`);
};

const handleEdit = (categoria) => {
    navigate(`/GestioncategoriasEditar/${categoria.id_categoria}`);
};

  return (
    <Layout>
      <InfoSection
        title="Gestión de Categorias"
        description="En este módulo usted puede registrar nuevas categorías en el sistema, actualizar la información de las categorías existentes y eliminar categoría si es necesario"
        showSubtitle={false} // Mostrar subtítulo
        showDescription={true} // Mostrar descripción
      />
      <Button text="Nueva Categoria" onClick={() => navigate('/GestioncategoriasCrear')}/> 
      <Table columns={GcategoriasColumns} data={categorias} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
    </Layout>
  );
}

export default Gcategorias;
