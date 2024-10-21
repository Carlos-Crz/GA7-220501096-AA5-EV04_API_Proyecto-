import React from 'react';

import Layout from '../components/Layout';
import InfoSection from '../components/InfoSection';

import clientes from '../components/img/Clientes_Img.png';
import productos from '../components/img/Productos_Img.png';
import cajas from '../components/img/Cajas_Img.png';
import ventas from '../components/img/Ventas_Img.png';
import proveedores from '../components/img/Proveedores_Img.png';
import usuarios from '../components/img/Usuarios_Img.png';

function Dashboard() {
  return (
    <Layout>
      <InfoSection
        title="Dashboard"
        subtitle="¡Bienvenido User!"
        description="Aquí encontrarás atajos para acceder a los diferentes módulos y gestionar el sistema según tus privilegios."
        showSubtitle={true} // Mostrar subtítulo
        showDescription={true} // Mostrar descripción
      />
      <div class="conteiner__dashboard">
        <div class="conteiner__dashboard-item">
            <img src={clientes} alt="Item 1"/>
            <h3>Clientes</h3>
            <p>2 Clientes registrados</p>
        </div>
        <div class="conteiner__dashboard-item">
            <img src={productos} alt="Item 2"/>
            <h3>Productos</h3>
            <p>3 Productos registrados</p>
        </div>
        <div class="conteiner__dashboard-item">
            <img src={cajas} alt="Item 2"/>
            <h3>Cajas</h3>
            <p>3 Cajas en total</p>
        </div>
        <div class="conteiner__dashboard-item">
            <img src={ventas} alt="Item 2"/>
            <h3>Ventas</h3>
            <p>2 Ventas Realizadas</p>
        </div>
        <div class="conteiner__dashboard-item">
            <img src={proveedores} alt="Item 2"/>
            <h3>Proveedores</h3>
            <p>3 Proveedores en total</p>
        </div>
        <div class="conteiner__dashboard-item">
            <img src={usuarios} alt="Item 2"/>
            <h3>usuarios</h3>
            <p>3 Usuarios en el sistema</p>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
