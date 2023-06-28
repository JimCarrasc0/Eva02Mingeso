import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function MainMenu(){
  const [showForm, setShowForm] = useState(false);
  const [showProv, setShowProv] = useState(false);
  const [showArchAcopio, setShowArchAcopio] = useState(false);
  const [showArchGrasa, setShowArchGrasa] = useState(false);
  const [showAco, setShowAco] = useState(false);
  const [showMilk, setShowMilk] = useState(false);
  const [showPay, setShowPay] = useState(false);

  const mostrarIngresarProveedor = () => {
    setShowForm(true);
    setShowProv(false);
    setShowArchAcopio(false);
    setShowArchGrasa(false);
    setShowAco(false);
    setShowMilk(false);
    setShowPay(false);
  };

  const mostrarProveedores = () => {
    setShowProv(true);
    setShowForm(false);
    setShowArchAcopio(false);
    setShowArchGrasa(false);
    setShowAco(false);
    setShowMilk(false);
    setShowPay(false);
  }

  const mostrarArchAcopio = () => {
    setShowArchAcopio(true);
    setShowArchGrasa(false);
    setShowForm(false);
    setShowProv(false);
    setShowAco(false);
    setShowMilk(false);
    setShowPay(false);
  }

  const mostrarArchGrasa = () => {
    setShowArchGrasa(true);
    setShowArchAcopio(false);
    setShowForm(false);
    setShowProv(false);
    setShowAco(false);
    setShowMilk(false);
    setShowPay(false);
  }

  const mostrarAco = () => {
    setShowAco(true);
    setShowArchAcopio(false);
    setShowArchGrasa(false);
    setShowForm(false);
    setShowProv(false);
    setShowMilk(false);
    setShowPay(false);
  }

  const mostrarMilk = () => {
    setShowMilk(true);
    setShowAco(false);
    setShowArchAcopio(false);
    setShowArchGrasa(false);
    setShowForm(false);
    setShowProv(false);
    setShowPay(false);
  }

  const mostrarPago = () => {
    setShowPay(true);
    setShowMilk(false);
    setShowAco(false);
    setShowArchAcopio(false);
    setShowArchGrasa(false);
    setShowForm(false);
    setShowProv(false);
  }

  return(
    <div>
      
      {!showForm && !showProv && !showArchAcopio && !showAco && !showMilk && !showPay && !showArchGrasa && (
          <div>
            <h1 className='title-bold'>MilkStgo</h1>
            <p className='p-thin'>Plataforma de gestión de proveedores de lácteos.</p>
            <div className='button-container'>
              <button className='btn btn-primary' onClick={mostrarIngresarProveedor}>Ingresar proveedor</button>
              <button className='btn btn-primary' onClick={mostrarProveedores}>Ver Proveedores</button>
              <button className='btn btn-primary' onClick={mostrarArchAcopio}>Ingresar archivo acopio</button>
              <button className='btn btn-primary' onClick={mostrarAco}>Ver Acopio</button>
              <button className='btn btn-primary' onClick={mostrarArchGrasa}>Ingresar archivo grasa</button>
              <button className='btn btn-primary' onClick={mostrarMilk}>Ver Grasa</button>
              <button className='btn btn-primary' onClick={mostrarPago}>Gestionar pago</button>
            </div>
          </div>
        )}
      
      {showForm && <IngresarProveedorForm setShowForm={setShowForm} />}
      {showProv && <MostrarListado setShowProv={setShowProv} />}
      {showArchAcopio && <IngresarArchivoAcopio setShowArchAcopio={setShowArchAcopio} />}
      {showArchGrasa && <IngresarArchivoGrasa setShowArchGrasa={setShowArchGrasa} />}
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

    // Crear un objeto con los datos del proveedor
    const proveedor = {
      proveedorId,
      nombre,
      categoria,
      retencion
    };

    // Enviar la solicitud POST a través de axios
    axios.post('http://localhost:8080/proveedor/nuevo', proveedor)
      .then((response) => {
        console.log('Proveedor guardado:', response.data);
        // Luego de guardar el proveedor, puedes limpiar los campos del formulario
        setProveedorId('');
        setNombre('');
        setCategoria('');
        setRetencion('');
        // Opcional: Mostrar un mensaje de éxito o redirigir a otra página
      })
      .catch((error) => {
        console.error('Error al guardar el proveedor:', error);
        // Opcional: Mostrar un mensaje de error
      });

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
      <div className='form-group'>
        <label htmlFor="proveedorId">ID Proveedor:</label>
        <input
          type="text"
          class="form-control"
          id="proveedorId"
          placeholder='ID del Proveedor'
          value={proveedorId}
          onChange={(e) => setProveedorId(e.target.value)}
        />
      </div>
      <br/>
      <div className='form-group'>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          placeholder='Nombre del Proveedor'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <br/>
      <div class="form-container">
        <label htmlFor="categoria">Categoría:</label>
        <div class="form-check form-check-inline">
          <label>
            <input
              type="radio"
              name="categoria"
              value="A"
              checked={categoria === "A"}
              onChange={(e) => setCategoria(e.target.value)}
            />
            A
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label>
            <input
              type="radio"
              name="categoria"
              value="B"
              checked={categoria === "B"}
              onChange={(e) => setCategoria(e.target.value)}
            />
            B
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label>
            <input
              type="radio"
              name="categoria"
              value="C"
              checked={categoria === "C"}
              onChange={(e) => setCategoria(e.target.value)}
            />
            C
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label>
            <input
              type="radio"
              name="categoria"
              value="D"
              checked={categoria === "D"}
              onChange={(e) => setCategoria(e.target.value)}
            />
            D
          </label>
        </div>
      </div>
      <br/>
      <div class="form-container">
        <label htmlFor="retencion">Retención:</label>
        <div class="form-check form-check-inline">
          <label>
            <input
              type="radio"
              name="retencion"
              value="Si"
              checked={retencion === "Si"}
              onChange={(e) => setRetencion(e.target.value)}
            />
            Si
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label>
            <input
              type="radio"
              name="retencion"
              value="No"
              checked={retencion === "No"}
              onChange={(e) => setRetencion(e.target.value)}
            />
            No
          </label>
        </div>
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
      <table className='table table-sm table-dark table-responsive'>
        <thead>
          <tr>
            <th>Id <br/> Proveedor</th>
            <th>Nombre</th>
            <th>Kilos de <br/> leche</th>
            <th>Pago x <br/> Leche</th>
            <th>Pago x <br/> Grasa</th>
            <th>Pago x <br/> Solido</th>
            <th>Bonus de <br/> Frecuencia</th>
            <th>Descuento <br/> %variación Leche</th>
            <th>Descuento <br/> %variación Grasa</th>
            <th>Descuento <br/> %variación Solido</th>
            <th>Pago Total</th>
            <th>Retencion <br/> (13%)</th>
            <th>Pago Final</th>
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

      <div>
        <button className='btn btn-danger btn-block' onClick={volver}>Volver</button>
      </div>

    </div>
  );

}

function IngresarArchivoAcopio({ setShowArchAcopio }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const volver = () => {
    setShowArchAcopio(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Enviar el archivo al backend utilizando Axios
        const response = await axios.post('http://localhost:8080/acopio/nuevo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Respuesta del backend:', response.data);
      } catch (error) {
        console.error('Error al enviar el archivo:', error);
      }
    } else {
      console.log('Ningún archivo seleccionado');
    }

    setSelectedFile(null);
  };

  return (
    <div>
      <h2>Ingresar Archivo de Acopio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className='button-container'>
          <button className='btn btn-success' type="submit">Enviar</button>
          <button className='btn btn-danger' onClick={volver}>Volver</button>
        </div>
      </form>
    </div>
  );
}

function IngresarArchivoGrasa({ setShowArchGrasa }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const volver = () => {
    setShowArchGrasa(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Enviar el archivo al backend utilizando Axios
        const response = await axios.post('http://localhost:8080/leche/nuevo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Respuesta del backend:', response.data);
      } catch (error) {
        console.error('Error al enviar el archivo:', error);
      }
    } else {
      console.log('Ningún archivo seleccionado');
    }

    setSelectedFile(null);
  };

  return (
    <div>
      <h2>Ingresar Archivo de grasa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className='button-container'>
          <button className='btn btn-success' type="submit">Enviar</button>
          <button className='btn btn-danger' onClick={volver}>Volver</button>
        </div>
      </form>
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
    <body>
      <MainMenu/>
    </body>
    /*<div className='App'>
      
      <MainMenu/>
    </div>*/
  );
}

export default App;
