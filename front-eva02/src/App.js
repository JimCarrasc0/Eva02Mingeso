import React, { useEffect, useState } from 'react';
import './App.css';

function MainMenu(){
  const [showForm, setShowForm] = useState(false);
  const [showProv, setShowProv] = useState(false);
  const [showArchAcopio, setShowArchAcopio] = useState(false);

  const mostrarIngresarProveedor = () => {
    setShowForm(true);
    setShowProv(false);
    setShowArchAcopio(false);
  };

  const mostrarProveedores = () => {
    setShowProv(true);
    setShowForm(false);
    setShowArchAcopio(false);
  }

  const mostrarArchAcopio = () =>{
    setShowArchAcopio(true);
    setShowForm(false);
    setShowProv(false);
  }

  return(
    <div>
    {!showForm && !showProv && !showArchAcopio &&(
        <div className='button-container'>
          <button className='btn btn-primary' onClick={mostrarIngresarProveedor}>Ingresar proveedor</button>
          <button className='btn btn-primary' onClick={mostrarProveedores}>Ver Proveedores</button>
          <button className='btn btn-primary' onClick={mostrarArchAcopio}>Ingresar archivo acopio</button>
          <button className='btn btn-primary'>Ver Acopio</button>
          <button className='btn btn-primary'>Ingresar archivo grasa</button>
          <button className='btn btn-primary'>Ver Grasa</button>
          <button className='btn btn-primary'>Gestionar pago</button>
        </div>
      )}
    
    {showForm && <IngresarProveedorForm setShowForm={setShowForm} />}
    {showProv && <MostrarListado setShowProv={setShowProv} />}
    {showArchAcopio && <IngresarArchivoAcopio setShowArchAcopio={setShowArchAcopio}/>}
    </div>
  );
}

function IngresarProveedorForm({ setShowForm }) {
  const [proveedorId, setProveedorId] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [retencion, setRetencion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con los datos ingresados, como enviarlos a través de una API
    console.log('Proveedor ID:', proveedorId);
    console.log('Nombre:', nombre);
    console.log('Categoría:', categoria);
    console.log('Retención:', retencion);

    // Luego de realizar la acción, puedes limpiar los campos del formulario
    setProveedorId('');
    setNombre('');
    setCategoria('');
    setRetencion('');
  };

  const volver =() =>{
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-container'>
        <label htmlFor="proveedorId">Proveedor ID:</label>
        <input
          type="text"
          id="proveedorId"
          value={proveedorId}
          onChange={(e) => setProveedorId(e.target.value)}
        />
      </div>
      <div className='form-container'>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className='form-container'>
        <label htmlFor="categoria">Categoría:</label>
        <input
          type="text"
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
      </div>
      <div className='form-container'>
        <label htmlFor="retencion">Retención:</label>
        <input
          type="text"
          id="retencion"
          value={retencion}
          onChange={(e) => setRetencion(e.target.value)}
        />
      </div>
      <div className='button-container'>
        <button className='btn btn-success' type="submit">Guardar</button>
        <button className='btn btn-danger' onClick={volver}>Volver</button>
      </div>
      
    </form>
  );
}

function MostrarListado({ setShowProv }) {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/proveedores')
      .then((response) => response.json())
      .then((data) => setProveedores(data))
      .catch((error) => console.error(error));
  }, []);

  const volver =() =>{
    setShowProv(false);
  };

  return (
    <div>
      <h2>Listado de Proveedores</h2>
      <ul>
        {proveedores.map((proveedor) => (
          <li key={proveedor.proveedorId}>
            <strong>Proveedor ID:</strong> {proveedor.proveedorId}
            <br />
            <strong>Nombre:</strong> {proveedor.nombre}
            <br />
            <strong>Categoría:</strong> {proveedor.categoria}
            <br />
            <strong>Retención:</strong> {proveedor.retencion}
          </li>
        ))}
      </ul>
    
      <div className='button-container'>
        <button className='btn btn-danger' onClick={volver}>Volver</button>
      </div>
    
    </div>
    
  );
}

function IngresarArchivoAcopio({setShowArchAcopio}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const volver = () => {
    setShowArchAcopio(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí puedes realizar alguna acción con el archivo seleccionado, como enviarlo a través de una API
    if (selectedFile) {
      console.log('Archivo seleccionado:', selectedFile);
      // Realizar acciones con el archivo, como enviarlo a través de una API
    } else {
      console.log('Ningún archivo seleccionado');
    }

    // Luego de realizar la acción, puedes reiniciar el estado para permitir la selección de un nuevo archivo
    setSelectedFile(null);
  };

  return (
    <div>
      <h2>Ingresar Archivo de Acopio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
      </form>

      <div className='button-container'>
        <button className= 'btn btn-success' type="submit">Enviar</button>
        <button className='btn btn-danger' onClick={volver}>Volver</button>
      </div>

    </div>
  );
}

/*
    -falta probar las que se comunican con el backend
    -falta hacer las vistas para grasa
    -falta hacer las vistas para pago
    las ultimas 2 vistas deberian ser adaptaciones de las vistas de acopio

    -falta cambiar los colores del backend (opcional)
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='title-bold'>MilkStgo</h1>
        <p className='p-thin'>Plataforma de gestión de proveedores de lácteos.</p>
        <MainMenu/>
      </header>
    </div>
    /*<div className='App'>
      
      <MainMenu/>
    </div>*/
  );
}

export default App;
