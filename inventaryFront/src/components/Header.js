import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

import logo from './img/Logotipo.svg';
import user from './img/User.svg';
import menu from './img/Menu.svg';

function Header({ toggleSidebar }) {
	// Estado para controlar la visibilidad del menú flotante
	const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
	// Referencia al menú flotante del usuario
	const userMenuRef = useRef(null);
    const navigate = useNavigate();  // Hook para redirigir

	// Función para alternar el menú flotante del usuario
	const toggleUserMenu = () => {
	setIsUserMenuVisible(!isUserMenuVisible);
	};

	// Detecta si se hace clic fuera del menú flotante y lo cierra
	useEffect(() => {
	function handleClickOutside(event) {
		// Si el clic ocurre fuera del menú flotante y del ícono de usuario, se cierra el menú
		if (userMenuRef.current && !userMenuRef.current.contains(event.target) && 
			!event.target.classList.contains('Header__content-icon')) {
		setIsUserMenuVisible(false); // Oculta el menú
		}
	}

	// Añadir el evento 'mousedown' para detectar clics fuera del menú
	document.addEventListener('mousedown', handleClickOutside);

	// Elimina  el evento cuando el componente se desmonta para evitar fugas de memoria
	return () => {
		document.removeEventListener('mousedown', handleClickOutside);
	};
	}, [userMenuRef]); // El efecto depende de la referencia del menú flotante

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3001/logout', {
                method: 'POST',
                credentials: 'include',  // Incluye las cookies en la petición
            });

            if (response.ok) {
                // Si el cierre de sesión es exitoso, redirigir al login
                navigate('/');
            } else {
                console.error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor', error);
        }
    };

    return (
    <header class="Header">
        {/* Icono del menú en el header para mostrar/ocultar el sidebar */}
        <div class="Header__menu" onClick={toggleSidebar}>
            <img src={menu} alt=''/>
        </div>

        {/* Contenido principal del header, como el logotipo y el icono de usuario */}
        <div class="Header__content">
            <a href="/Dashboard">
                <img class="Header__content-logotipo" src={logo} alt="Logotipo"/>
            </a>
            {/* Icono de usuario, al hacer clic se muestra el menú flotante */}
            <div>
                <img src={user} class="Header__content-icon" alt='Icono del Usuario' onClick={toggleUserMenu}/>
            </div>

            {/* Menú desplegable del usuario */}
            <div class="menu-float" className={`menu-float ${isUserMenuVisible ? 'see' : ''}`} id="userMenu" ref={userMenuRef}>
                <header class="menu-float__header">
                    <img src={user} alt="" class="menu-float__header-img"/>
                    <div>
                        <span class="menu-float__header-userName">
                            Nombre de usuario
                        </span>
                        <span class="menu-float__header-cargo">
                            Cargo
                        </span>
                    </div>
                </header>
                <ul>
                    <li class="menu-float__ul-item">
                        <a href="/Dashboard">
                            <span class="material-symbols-outlined">
                                person
                            </span>
                            <p>Ver perfil</p>
                        </a>
                    </li>
                    <li class="menu-float__ul-item">
                        <a href='/Dashboard'>
                            <span class="material-symbols-outlined">
                                settings
                            </span>
                            <p>Configuracion</p>
                        </a>
                    </li>
                    <li class="menu-float__ul-iteml">
                        <hr/>
                    </li>
                    <li class="menu-float__ul-item menu-float__ul-itemSection" >
                        <a href='/' onClick={handleLogout}>
                            <span class="material-symbols-outlined">
                                logout
                            </span>
                            <span>Cerrar Sesión</span>
                        </a>
                    </li>
                </ul>
            </div>
            {/* End Menú desplegable del usuario */}
        </div>
    </header>
    );
}

export default Header;
