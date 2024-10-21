import React from 'react';
import { useLocation } from 'react-router-dom'; // Importamos useLocation
import '../App.css';

function Sidebar({ isSidebarHidden, isSidebarCollapsed, toggleSidebarCollapse  }) {
    const location = useLocation(); // Obtener la ruta actual
    
    return (
        <aside class="sidebar" className={`sidebar ${isSidebarHidden ? 'active' : ''} ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <nav>
                <ul>
                    <li>
                        <a href="/Dashboard" class="sidebar__item" className={`sidebar__item ${location.pathname === '/Dashboard' ? 'sidebar__item--active' : ''}`}>
                            <span class="material-symbols-outlined sidebar__item-icon">
                                home
                            </span>
                            <span class="sidebar__item-text">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/Gestioncategorias" class="sidebar__item" className={`sidebar__item ${location.pathname === '/Gestioncategorias' ? 'sidebar__item--active' : ''}`}>
                            <span class="material-symbols-outlined sidebar__item-icon">
                                category
                            </span>
                            <span class="sidebar__item-text">Gestión de categorías</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="sidebar__item" className={`sidebar__item ${location.pathname === '/Gestionproductos' ? 'sidebar__item--active' : ''}`}>
                            <span class="material-symbols-outlined sidebar__item-icon">
                                inventory_2
                            </span>
                            <span class="sidebar__item-text">Gestión de productos</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="sidebar__item">
                            <span class="material-symbols-outlined sidebar__item-icon">
                                deployed_code
                            </span>
                            <span class="sidebar__item-text">Gestión de pedidos</span>
                        </a>        
                    </li>
                    <li>
                        <a href="#" class="sidebar__item" className={`sidebar__item ${location.pathname === '/Gestionproveedores' ? 'sidebar__item--active' : ''}`}>
                            <span class="material-symbols-outlined sidebar__item-icon">
                                local_shipping
                            </span>
                            <span class="sidebar__item-text">Gestión de proveedores</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="sidebar__item" >
                            <span class="material-symbols-outlined sidebar__item-icon">
                                payments
                            </span>
                            <span class="sidebar__item-text">Gestión de ventas</span>
                        </a>    
                    </li>
                    <li>
                        <a href="#" class="sidebar__item" className={`sidebar__item ${location.pathname === '/Gestioncajas' ? 'sidebar__item--active' : ''}`}>
                            <span class="material-symbols-outlined sidebar__item-icon">
                                credit_card
                            </span>
                            <span class="sidebar__item-text">Gestión de cajas</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="sidebar__item" className={`sidebar__item ${location.pathname === '/Gestionclientes' ? 'sidebar__item--active' : ''}`}>
                            <span class="material-symbols-outlined sidebar__item-icon">
                                supervisor_account
                            </span>
                            <span class="sidebar__item-text">Gestión de clientes</span>
                        </a>                            
                    </li>            
                    <li>
                        <a href="/Gestionusuarios" class="sidebar__item" className={`sidebar__item ${location.pathname === '/Gestionusuarios' ? 'sidebar__item--active' : ''}`}>
                            <span class="material-symbols-outlined sidebar__item-icon">
                                account_circle
                            </span>
                            <span class="sidebar__item-text">Gestión de usuarios</span>
                        </a>                                     
                    </li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li>
                        <div class="sidebar__item sidebar__item--colapse" id="collapse-btn" onClick={toggleSidebarCollapse}>
                            <span class="material-symbols-outlined sidebar__item-arrow" >keyboard_double_arrow_left</span>
                            <span class="sidebar__item-text">Colapsar Menu</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
