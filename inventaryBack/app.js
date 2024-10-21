const express = require('express')
const cors = require('cors');  // Para permitir conexiones desde React
const session = require('express-session');
const mysql = require('mysql2/promise');
const app = express();
const port = 3001;

// Middleware para manejar JSON
app.use(express.json()); // Esto es necesario para poder leer JSON en req.body
// Middleware para manejar datos de formularios URL encoded
app.use(express.urlencoded({ extended: true })); 
// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000', // Esto es la ruta frontend
  credentials: true,  
}));

// Configuración de sesiones
app.use(session({
  secret: 'clave123',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false, maxAge: 60000 }
}));

// Conexión a la base de datos
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'supermarketdb',
});

// Ruta de inicio de sesión
app.get('/login', async (req, res) => {
  const datos = req.query;
  try {
    // Consulta a la base de datos
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `nombre_usuario` = ? AND `contrasenia` = ?", 
      [datos.nombre_usuario, datos.contrasenia]
    );
    
    if(results.length > 0){
      req.session.isAuthenticated = true;
      req.session.nombre_usuario = datos.nombre_usuario;
      res.status(200).send({ success: true, message: 'Inicio de Sesión correcto' })
    } else {
      res.status(401).send({ success: false, message: 'Datos incorrectos' })
    }
  } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
})


// Ruta para verificar el estado de autenticación
app.get('/auth/status', (req, res) => {
  if (req.session.isAuthenticated) {
    res.status(200).json({ authenticated: true, user: req.session.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});


// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
    } else {
      res.status(200).json({ success: true, message: 'Sesión cerrada correctamente' });
    }
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


/* ----- CRUD CATEGORIAS ----- */
// Obtener todas las categorías
app.get('/categorias', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM categorias');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para crear una nueva categoría
app.post('/categoriascreate', async (req, res) => {
  const { nombre, ubicacion } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO categorias (nombre, ubicacion) VALUES (?, ?)',
      [nombre, ubicacion]
    );
    res.status(201).json({ id: result.insertId, nombre, ubicacion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
});


// Obtener categoría por ID
app.get('/categoriasver/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await connection.query('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
    if (categoria.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(categoria[0]);
  } catch (error) {
    console.error('Error al obtener la categoría:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Actualizar categoría por ID
app.put('/categoriasupdate/:id', async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la categoría desde los parámetros de la URL
  const { nombre, ubicacion } = req.body;  // Obtener los datos enviados en el cuerpo de la solicitud

  try {
    // Usar la consulta SQL para actualizar la categoría
    const [result] = await connection.query(
      'UPDATE categorias SET nombre = ?, ubicacion = ? WHERE id_categoria = ?',
      [nombre, ubicacion, id]
    );

    // Verificar si alguna fila fue afectada
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // Devolver un mensaje de éxito con los datos actualizados
    res.status(200).json({ message: 'Categoría actualizada correctamente', id, nombre, ubicacion });
  } catch (err) {
    console.error('Error al actualizar la categoría:', err);
    return res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
});

// Eliminar categoría por ID
app.delete('/categoriasdelete/:id', async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la categoría desde los parámetros de la URL

  try {
    // Usar la consulta SQL para eliminar la categoría
    const [result] = await connection.query(
      'DELETE FROM categorias WHERE id_categoria = ?',
      [id]
    );

    // Verificar si alguna fila fue afectada
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // Verificar si el ID eliminado era el último de la tabla
    const [maxIdResult] = await connection.query('SELECT MAX(id_categoria) AS maxId FROM categorias');
    const maxId = maxIdResult[0].maxId;

    // Si el id eliminado era el último, reiniciar el auto_increment
    if (parseInt(id) > parseInt(maxId) || maxId === null) {
      await connection.query(`ALTER TABLE categorias AUTO_INCREMENT = ${id}`);
    } else {
      await connection.query(`ALTER TABLE categorias AUTO_INCREMENT = ${maxId + 1}`);
    }

    // Devolver un mensaje de éxito si la categoría fue eliminada
    res.status(200).json({ message: 'Categoría eliminada correctamente', id });
  } catch (err) {
    console.error('Error al eliminar la categoría:', err);
    return res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
});
/* ----- END CRUD CATEGORIAS ----- */


/* ----- CRUD USUARIOS ----- */

// Obtener todas los Usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT u.id_usuario, u.documento, u.nombre, u.telefono, u.email, c.nombre_cargo FROM usuarios u JOIN cargo c ON u.id_cargo = c.id_cargo');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener Usuario por ID
app.get('/usuariosver/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await connection.query('SELECT u.id_usuario, u.documento, u.nombre, u.apellido, u.tipo_documento, u.documento, u.fecha_nacimiento, u.genero, u.email, u.telefono, u.nombre_usuario, u.contrasenia, c.nombre_cargo FROM usuarios u JOIN cargo c ON u.id_cargo = c.id_cargo WHERE u.id_usuario = ?', [id]);
    if (categoria.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(categoria[0]);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener todos los cargos
app.get('/cargos', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT id_cargo, nombre_cargo FROM cargo');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener los cargos:', err);
    res.status(500).json({ error: 'Error al obtener los cargos' });
  }
});

// Ruta para crear un nuevo Usuario
app.post('/usuarioscreate', async (req, res) => {
  const { nombre, apellido, tipo_documento, documento, fecha_nacimiento, genero, email, telefono, nombre_usuario, contrasenia, id_cargo } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO usuarios (nombre, apellido, tipo_documento, documento, fecha_nacimiento, genero, email, telefono, nombre_usuario, contrasenia, id_cargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, tipo_documento, documento, fecha_nacimiento, genero, email, telefono, nombre_usuario, contrasenia, id_cargo]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Actualizar Usuario por ID
app.put('/usuariosupdate/:id', async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la categoría desde los parámetros de la URL
  const { nombre, apellido, tipo_documento, documento, fecha_nacimiento, genero, email, telefono, nombre_usuario, contrasenia, id_cargo } = req.body;  // Obtener los datos enviados en el cuerpo de la solicitud

  try {
    // Usar la consulta SQL para actualizar la categoría
    const [result] = await connection.query(
      'UPDATE usuarios SET nombre = ?, apellido = ?, tipo_documento = ?, documento = ?, fecha_nacimiento = ?, genero = ?, email = ?, telefono = ?, nombre_usuario = ?, contrasenia = ?, id_cargo = ? WHERE id_usuario = ?',
      [nombre, apellido, tipo_documento, documento, fecha_nacimiento, genero, email, telefono, nombre_usuario, contrasenia, id_cargo, id]);

    // Verificar si alguna fila fue afectada
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Devolver un mensaje de éxito con los datos actualizados
    res.status(200).json({ message: 'Usuario actualizado correctamente', id, nombre, apellido, tipo_documento, documento, fecha_nacimiento, genero, email, telefono, nombre_usuario, contrasenia, id_cargo });
  } catch (err) {
    console.error('Error al actualizar la categoría:', err);
    return res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Eliminar Usuario por ID
app.delete('/usuariosdelete/:id', async (req, res) => {
  const { id } = req.params;  // Obtener el ID de la categoría desde los parámetros de la URL

  try {
    // Usar la consulta SQL para eliminar la categoría
    const [result] = await connection.query(
      'DELETE FROM usuarios WHERE id_usuario = ?',
      [id]
    );

    // Verificar si alguna fila fue afectada
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuarios no encontrada' });
    }

    // Verificar si el ID eliminado era el último de la tabla
    const [maxIdResult] = await connection.query('SELECT MAX(id_usuario) AS maxId FROM usuarios');
    const maxId = maxIdResult[0].maxId;

    // Si el id eliminado era el último, reiniciar el auto_increment
    if (parseInt(id) > parseInt(maxId) || maxId === null) {
      await connection.query(`ALTER TABLE usuarios AUTO_INCREMENT = ${id}`);
    } else {
      await connection.query(`ALTER TABLE usuarios AUTO_INCREMENT = ${maxId + 1}`);
    }

    // Devolver un mensaje de éxito si la categoría fue eliminada
    res.status(200).json({ message: 'Usuarios eliminada correctamente', id });
  } catch (err) {
    console.error('Error al eliminar la categoría:', err);
    return res.status(500).json({ error: 'Error al eliminar la usuarios' });
  }
});

/* ----- END CRUD USUARIOS ----- */










/* ----- CRUD PRODUCTOS ----- */

app.get('/productos', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM productos');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo producto
app.post('/productoscreate', async (req, res) => {
  const { codigo_barras, nombre_producto, descripcion, presentacion, precio_compra, precio_venta, stock, categoria_id } = req.body; // Asegúrate de recibir el ID de la categoría

  try {
      // Verificar si existen categorías en la base de datos
      const [categorias] = await connection.query('SELECT COUNT(*) AS total FROM categorias');
      
      if (categorias[0].total === 0) {
          return res.status(400).json({ error: 'No se pueden crear productos sin categorías existentes' });
      }

      // Verificar si la categoría seleccionada existe
      const [categoria] = await connection.query('SELECT * FROM categorias WHERE id_categoria = ?', [categoria_id]);
      
      if (categoria.length === 0) {
          return res.status(400).json({ error: 'La categoría seleccionada no existe' });
      }

      // Crear el producto si hay categorías y la categoría existe
      const [result] = await connection.query(
          'INSERT INTO productos (codigo_barras, nombre_producto, descripcion, presentacion, precio_compra, precio_venta, stock, categoria_id) VALUES (?, ?, ?, ?)',
          [codigo_barras, nombre_producto, descripcion, presentacion, precio_compra, precio_venta, stock, categoria_id]
      );

      res.status(201).json({ message: 'Producto creado exitosamente', id: result.insertId, codigo_barras, nombre_producto, descripcion, presentacion, precio_compra, precio_venta, stock, categoria_id });
  } catch (err) {
      console.error('Error al crear el producto:', err);
      return res.status(500).json({ error: 'Error al crear el producto' });
  }
});



/* ----- CRUD PRODUCTOS ----- */