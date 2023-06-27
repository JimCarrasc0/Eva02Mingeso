import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function MainMenu(){
  const [showForm, setShowForm] = useState(false);
  const [showProv, setShowProv] = useState(false);
  const [showArchAcopio, setShowArchAcopio] = useState(false);
  const [showAco, setShowAco] = useState(false);
  const [showMilk, setShowMilk] = useState(false);
  const [showPay, setShowPay] = useState(false);

  const mostrarIngresarProveedor = () => {
    setShowForm(true);
    setShowProv(false);
    setShowArchAcopio(false);
    setShowAco(false);
    setShowMilk(false);
    setShowPay(false);
  };

  const mostrarProveedores = () => {
    setShowProv(true);
    setShowForm(false);
    setShowArchAcopio(false);
    setShowAco(false);
    setShowMilk(false);
    setShowPay(false);
  }

  const mostrarArchAcopio = () =>{
    setShowArchAcopio(true);
    setShowForm(false);
    setShowProv(false);
    setShowAco(false);
    setShowMilk(false);
    setShowPay(false);
  }

  const mostrarAco = () => {
    setShowAco(true);
    setShowArchAcopio(false);
    setShowForm(false);
    setShowProv(false);
    setShowMilk(false);
    setShowPay(false);
  }

  const mostrarMilk = () => {
    setShowMilk(true);
    setShowAco(false);
    setShowArchAcopio(false);
    setShowForm(false);
    setShowProv(false);
    setShowPay(false);
  }

  const mostrarPago = () => {
    setShowPay(true);
    setShowMilk(false);
    setShowAco(false);
    setShowArchAcopio(false);
    setShowForm(false);
    setShowProv(false);
  }

  return(
    <div>
      
      {!showForm && !showProv && !showArchAcopio && !showAco && !showMilk && !showPay &&(
          <div>
            <h1 className='title-bold'>MilkStgo</h1>
            <p className='p-thin'>Plataforma de gestión de proveedores de lácteos.</p>
            <div className='button-container'>
              <button className='btn btn-primary' onClick={mostrarIngresarProveedor}>Ingresar proveedor</button>
              <button className='btn btn-primary' onClick={mostrarProveedores}>Ver Proveedores</button>
              <button className='btn btn-primary' onClick={mostrarArchAcopio}>Ingresar archivo acopio</button>
              <button className='btn btn-primary' onClick={mostrarAco}>Ver Acopio</button>
              <button className='btn btn-primary' >Ingresar archivo grasa</button>
              <button className='btn btn-primary' onClick={mostrarMilk}>Ver Grasa</button>
              <button className='btn btn-primary' onClick={mostrarPago}>Gestionar pago</button>
            </div>
          </div>
        )}
      
      {showForm && <IngresarProveedorForm setShowForm={setShowForm} />}
      {showProv && <MostrarListado setShowProv={setShowProv} />}
      {showArchAcopio && <IngresarArchivoAcopio setShowArchAcopio={setShowArchAcopio} />}
      {showAco && <MostrarAcopio setShowAco={setShowAco} />}
      {showMilk && <MostrarLeche setShowMilk={setShowMilk} />}
      {showPay && <MostrarPago setShowPay={setShowPay} />}

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
    axios.get('http://localhost:8080/proveedor')
      .then((response) => {
        setProveedores(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const volver = () => {
    setShowProv(false);
  };

  return (
    <div>
      <h2>Listado de Proveedores</h2>
      <table className='table table-sm table-dark'>
        <thead>
          <tr>
            <th>Proveedor ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Retención</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.proveedorId}>
              <td>{proveedor.proveedorId}</td>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.categoria}</td>
              <td>{proveedor.retencion}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='button-container'>
        <button className='btn btn-danger' onClick={volver}>Volver</button>
      </div>
    </div>
  );
}

function MostrarAcopio({ setShowAco }){
  const [acopio, setAcopio] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/acopio')
      .then((response) => {
        setAcopio(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const volver = () => {
    setShowAco(false);
  }

  return (
    <div>
      <h2>Información acopio de proveedores</h2>
      <table className='table table-sm table-dark'>
        <thead>
          <tr>
            <th>Proveedor ID</th>
            <th>Fecha</th>
            <th>Turno</th>
            <th>Kilos de Leche</th>
          </tr>
        </thead>
        <tbody>
          {acopio.map((acopio) => (
            <tr key={acopio.id}>
              <td>{acopio.proveedorId}</td>
              <td>{acopio.fecha}</td>
              <td>{acopio.turno}</td>
              <td>{acopio.kgLeche}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='button-container'>
        <button className='btn btn-danger' onClick={volver}>Volver</button>
      </div>

    </div>
  );

}

function MostrarLeche({ setShowMilk }){
  const [leche, setLeche] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/leche')
      .then((response) => {
        setLeche(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const volver = () => {
    setShowMilk(false);
  };

  return (
    <div>
      <h2>Detalle de la leche por proveedor</h2>
      <table className='table table-sm table-dark'>
        <thead>
          <tr>
            <th>Proveedor ID</th>
            <th>% Grasa</th>
            <th>% Sólido</th>
          </tr>
        </thead>
        <tbody>
          {leche.map((leche) => (
            <tr key = {leche.id}>
              <td>{leche.proveedorId}</td>
              <td>{leche.grasa}</td>
              <td>{leche.solido}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='button-container'>
        <button className='btn btn-danger' onClick={volver}>Volver</button>
      </div>

    </div>
  )
}

function MostrarPago({ setShowPay }){
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/pago')
      .then((response) => {
        setPayment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const volver = () => {
    setShowPay(false);
  }

  return (
    <div>
      <h2>Planilla de pagos</h2>
      <table className='table table-sm table-dark'>
        <thead>
          <tr>
            <th>proveedorId</th>
            <th>nombre</th>
            <th>kilos</th>
            <th>pagoLeche</th>
            <th>pagoGrasa</th>
            <th>pagoSolido</th>
            <th>freqBonus</th>
            <th>descLeche</th>
            <th>descGrasa</th>
            <th>descSolido</th>
            <th>pagoTotal</th>
            <th>retencion</th>
            <th>pagoFinal</th>
          </tr>
        </thead>
        <tbody>
          {payment.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.proveedorId}</td>
              <td>{payment.nombre}</td>
              <td>{payment.kilos}</td>
              <td>{payment.pagoLeche}</td>
              <td>{payment.pagoGrasa}</td>
              <td>{payment.pagoSolido}</td>
              <td>{payment.freqBonus}</td>
              <td>{payment.descLeche}</td>
              <td>{payment.descGrasa}</td>
              <td>{payment.descSolido}</td>
              <td>{payment.pagoTotal}</td>
              <td>{payment.retencion}</td>
              <td>{payment.pagoFinal}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
        <MainMenu/>
      </header>
    </div>
    /*<div className='App'>
      
      <MainMenu/>
    </div>*/
  );
}

export default App;
