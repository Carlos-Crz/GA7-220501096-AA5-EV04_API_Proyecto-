import { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Estado para "Recuerdame"
  const navigate = useNavigate();


  // Lógica de autenticación
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Enviar solicitud de autenticación al backend
      const response = await fetch('http://localhost:3001/login?nombre_usuario=' + username + '&contrasenia=' + password, {credentials: 'include'})
      
      if (response.ok) {
        // Redirigir al dashboard si la autenticación es exitosa
        
        navigate('/dashboard');
      } else {
        alert('Usuario o contraseña incorrectos');

      }
    } catch (error) {
      console.error('Error en la autenticación:'+ error);
    }
  };

  useEffect(() => {
    // Añadir la clase 'body-login' al body cuando este componente se monta
    document.body.classList.add('body-login');
    // Eliminar la clase cuando el componente se desmonta
    return () => {
      document.body.classList.remove('body-login');
    };
  }, []);
  
  useEffect(() => {
    // Cambiar el título de la página al entrar al Login
    document.title = 'Login';
  }, []);

  return (
    <form className="formulario" onSubmit={handleLogin}>
      <h1>Inicia Sesión</h1>
      <div>
        <label className="formulario_label" htmlFor="username">Nombre de usuario</label>
        <input
          id="username"
          className="formulario_input"
          type="text"
          placeholder="Ingresa tu nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="formulario_label" htmlFor="password">Contraseña</label>
        <input
          id="password"
          className="formulario_input"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="button">
        <input
          type="checkbox"
          id="btn-switch"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <label className="lbl-switch" htmlFor="btn-switch"></label>
        <label htmlFor="btn-switch" className="label">Recuérdame</label>
      </div>
      <button className="formulario_button" type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default Login;