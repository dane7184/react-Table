import { useEffect, useState } from 'react';
import Products from './components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <>
    <div className='d-flex flex-column align-items-conter'>
      <h1>React Datatable (Lim Dane)</h1>
    </div>
    <Products/>
    </>
  );
}

export default App;
