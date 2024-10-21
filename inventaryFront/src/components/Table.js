import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Table( {columns, data, onView, onEdit, onDelete }) {
    const navigate = useNavigate();

    return (
        <table class="style__table">
            <thead>
                <tr>
                {columns.map((column, index) => (<th key={index}>{column}</th>))}
                <th>Acciones</th> {/* Columna para las acciones */}
                </tr>
            </thead>
            <tbody>
            {data.map((row) => (
                <tr key={row.id_usuario}>
                    {columns.map((column, index) => (<td key={index}>{row[column]}</td>))}

                    <td>
                            <a onClick={() => onView(row)} ><span class="material-symbols-outlined view">visibility</span>
                            </a>
                            <a onClick={() => onEdit(row)} ><span class="material-symbols-outlined edit">edit</span>
                            </a>
                            <a onClick={() => onDelete(row)}><span class="material-symbols-outlined delet">delete</span>
                            </a>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
