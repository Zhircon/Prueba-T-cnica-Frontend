import reactLogo from './assets/react.svg';
import { useState } from 'react'
import {useFetch} from './CustomHooks/useFetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import RegisterModal from './components/RegisterModal';
import './App.css'; 
function App() {
  const {data,isLoading,error} = useFetch(
      "http://localhost:8000/api/products"
  );
  const productUrl= 'http://localhost:8000/api/product/';
  const deleteProduct = (e) => {
    console.log(e.target.value);
    console.log(productUrl+e.target.value);
    fetch(productUrl+e.target.value, 
      {method:'DELETE',}).then(()=>{
      console.log('product id:'+ e.target.value+' borrado');
      window.location.reload();
  });
  };
  return (
    <div>
      {isLoading? (
       <img src={reactLogo} className=" logo" alt="React logo"/>
      ):(
      <>
        <Container>
        <h1>CRUD Product</h1>
        <h5>Seleccione una accion o presione "Registrar nuevo" para registrar un nuevo producto</h5>

        <Table bordered>
        <thead>
            <tr class="bg-primary" >
                <th class='text-center'>id</th>
                <th class='text-center'>Nombre del producto</th>
                <th class='text-center'>Tipo del producto</th>
                <th class='text-center'>Acciones</th>
            </tr>
        </thead>
        <tbody>
        {data.products.map((item)=>
            <tr>
                <td class="text-center align-middle">{item.id}</td>
                <td class="text-center align-middle">{item.name}</td>
                <td class="text-center align-middle">
                  {item.product_type!=null?(
                    item.product_type.description
                  ):(
                    'Sin asignar'
                  )}
                </td>
                <td class="text-center">
                    <Button disabled="true" className="col-6 sm" variant="primary" >Editar</Button>
                    <Button value={item.id} className="col-6 sm"variant="danger" onClick={deleteProduct}>Borrar</Button>
                </td>
            </tr>
        )}
        <tr >
          <td colSpan={4} className="text-center">
            <RegisterModal/>
          </td>
        </tr>
        </tbody>
      </Table>
    </Container>
    </>
      )}
    </div>    
  )
}
export default App;

