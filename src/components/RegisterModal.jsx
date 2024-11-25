import reactLogo from '../assets/react.svg';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, InputGroup } from 'react-bootstrap';
import {useFetch} from '../CustomHooks/useFetch';


function RegisterModal() {
  const [show, setShow] = useState(false);
  const [isNewProductTypeHidden, setIsNewProductTypeHidden] = useState(false);
  const [name,setName] = useState('');
  const [productTypeId,setProductTypeId] = useState('0');
  const [description,setDescription] = useState('');
  const [isButtonSubmitDisabled,setIsButtonSubmitDisabled] = useState(true);
  const handleClose = () => {
    setIsNewProductTypeHidden(false);
    setShow(false)
  };
  const handleShow = () => setShow(true);
  
  const handleSelectProductTypeIdChange=(event)=>{
    event.target.value=='0' ? 
    setIsNewProductTypeHidden(false): 
    setIsNewProductTypeHidden(true);
    setProductTypeId(event.target.value);
  }
  const handleInputNameChange = (event) => {
    setName(event.target.value);
  };
  const handleInputDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const {data,isLoading,error} = useFetch(
    'http://localhost:8000/api/producttypes'
  );
  const handleSubmit = (e) =>{
    e.target.disabled=true;
    var inputNameValue=document.getElementById("modal.name").value;
    var inputDescriptionValue=document.getElementById("modal.description").value;
    var inputSelectValue = document.getElementById("modal.select").value;
    console.log({
      "name": inputNameValue,
      "product_type_id": inputSelectValue
     });
    if(inputSelectValue!='0'){
      fetch('http://localhost:8000/api/product', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },          
        body: JSON.stringify({
         "name": inputNameValue,
         "product_type_id": inputSelectValue
        })
       }).then((response)=>response.json())
       .then((data)=>console.log(data))
       .then(()=>setShow(false))
       .then(()=>e.target.disabled=true)
       .finally(()=>window.location.reload(false))
       ;
    }else{
      var lastPostData;
      fetch('http://localhost:8000/api/producttype', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },          
        body: JSON.stringify({
         "description": inputDescriptionValue,
        })
       }).then((response)=>response.json())
       .then((data)=>{
        fetch('http://localhost:8000/api/product', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },          
          body: JSON.stringify({
           "name": inputNameValue,
           "product_type_id": data.productType.id
          })
         }).then((response)=>response.json())
         .then((data)=>console.log(data))
         .then(()=>setShow(false))
         .then(()=>window.location.reload(false));
       });
    }
  }
  const handleOnChangeForm = (e) =>{
    var inputNameValue=document.getElementById("modal.name").value;
    var inputDescriptionValue=document.getElementById("modal.description").value;
    var inputSelectValue = document.getElementById("modal.select").value;
    if(inputSelectValue=='0'){
      inputNameValue=="" || inputDescriptionValue ==""?
      setIsButtonSubmitDisabled(true):
      setIsButtonSubmitDisabled(false);
    }else{
      inputNameValue==""?
      setIsButtonSubmitDisabled(true):
      setIsButtonSubmitDisabled(false);
    }
  }
  return (
    <div>
      {isLoading? (
         <img src={reactLogo} className="logo" alt="React logo"/>
      ): (
        <div>
        <Button variant="primary" onClick={handleShow}>
          Registrar nuevo producto
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Form onChange={handleOnChangeForm}>
          <Modal.Header closeButton>
            <Modal.Title>Registrar Huevo Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>Introduzca los datos del producto a registrar</p>
            
              <Form.Group className="mb-3" controlId="modal.name">
                <Form.Label>*Nombre</Form.Label>
                <Form.Control value={name} onChange={handleInputNameChange}   type="text" placeholder="Escribe el nombre del producto" />
              </Form.Group>
              <Form.Group className="mb-3" >
              <Form.Select onChange={handleSelectProductTypeIdChange} Id="modal.select" aria-label="Default select example">
                <option value="0">Nuevo tipo de producto</option>
                {data.productTypes?.map((item) =>
                <option value={item.id}>{item.description}</option>
                )}
                
              </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" hidden={isNewProductTypeHidden} controlId="modal.description">
                <Form.Label>*Nombre nuevo tipo producto</Form.Label>
                <Form.Control value={description} onChange={handleInputDescriptionChange}  controlId="modal.description" type="text" placeholder="Escribe la descripcion del tipo de producto"/>
              </Form.Group>
            
          </Modal.Body>   
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cerrar
            </Button>
            <Button  variant="primary" disabled={isButtonSubmitDisabled}  onClick={handleSubmit}>
              Registrar
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
        </div>    
      )
    }
    </div>
);
}
 

export default RegisterModal;