import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

// Gestion Categorias
import Gestioncategorias from './pages/Gestioncategorias';
import Crearcategoria from './pages/GCategorias/Crearcategoria';
import Vercategoria from './pages/GCategorias/Vercategoria';
import Editarcategoria from './pages/GCategorias/Editarcategoria';


// Gestion Usuarios
import Gestionusuarios from './pages/Gestionusuarios';
import Crearusuarios from './pages/GUsuarios/Crearusuario';
import Verusuarios from './pages/GUsuarios/Verusuario';
import Editarusuarios from './pages/GUsuarios/Editarusuario';


import Login from './pages/Login';


function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" />} />
        {/* Ruta para la página de Dashboard */}
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* Ruta para la página de Gestion de Categorias */}
        <Route path="/Gestioncategorias" element={<Gestioncategorias />} />
        <Route path="/GestioncategoriasCrear" element={<Crearcategoria />} />
        <Route path="/GestioncategoriasVer/:id" element={<Vercategoria />} />
        <Route path="/GestioncategoriasEditar/:id" element={<Editarcategoria />} />
        
        {/* Ruta para la página de Gestion de usuarios */}
        <Route path="/Gestionusuarios" element={<Gestionusuarios />} />
        <Route path="/GestionusuariosCrear" element={<Crearusuarios />} />
        <Route path="/GestionusuariosVer/:id" element={<Verusuarios />} />
        <Route path="/GestionusuariosEditar/:id" element={<Editarusuarios />} />
        
        
        

      </Routes>
    </Router>
  );
}

export default App;
