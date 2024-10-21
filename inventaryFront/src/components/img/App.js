import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Gestioncategorias from './Gestioncategorias'

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [log, setLog] = useState(false);


  function init() {
    // Aquí puedes validar el usuario y la contraseña
    if (username === 'admin' && password === 'admin') {
      // Redirigir al dashboard si las credenciales son correctas
      setLog(true) 

    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  if (log){
    return <Gestioncategorias />
  }

  return (
    <form class="formulario" action="/html/dashboard.html">
            <h1>Inicia Sesión</h1>
            <div>
                <label class="formulario_label" for="user-name">Nombre de usuario</label>
                <input id="username" class="formulario_input" type="text" placeholder="Ingresa tu nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div>
                <label class="formulario_label" for="pass">Contraseña</label>
                <input id="password" class="formulario_input" type="password" placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>

            <div class="button">
                <input type="checkbox" id="btn-switch"/>
                <label class="lbl-switch" for="btn-switch"></label>
                <label for="" class="label">Recuerdame</label>
            </div>
            
            <button class="formulario_button" type="submit" onClick={init}>Iniciar Sesión</button>
        </form>
  );
}

export default App;
