import './App.css';
import './styles.css';



function MainMenu(){
  return (
    <div className='button-container'>
      <button className='btn btn-primary'>Ingresar proveedor</button>
      <button className='btn btn-primary'>Ver Proveedores</button>
      <button className='btn btn-primary'>Ingresar archivo acopio</button>
      <button className='btn btn-primary'>Ver Acopio</button>
      <button className='btn btn-primary'>Ingresar archivo grasa</button>
      <button className='btn btn-primary'>Ver Grasa</button>
      <button className='btn btn-primary'>Gestionar pago</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MilkStgo</h1>
        <p>Plataforma de gestión de provedores de lácteos</p>
        <MainMenu/>
      </header>
    </div>
  );
}

export default App;
