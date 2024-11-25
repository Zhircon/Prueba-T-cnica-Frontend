import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import {useFetch} from '../CustomHooks/useFetch';
function ProductView(){
        const {data,isloading,error} = useFetch(
            "http://localhost:8000/api/products"
        );
        return(
            
        <Container>
            {isloading && <p>Cargando...</p>}
            <p>REQ Status: {data.status}</p>
            <Table bordered>
                <thead>
                    <tr>
                        <th>id</th>
                        <th className='text-center'>Product Name</th>
                        <th className='text-center'>ProductType</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {data.products.map((item)=>
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.product_type_id}</td>
                        <td>
                            <Button variant="primary">Editar</Button>
                            <Button variant="danger">Eliminar</Button>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    )
}
export default ProductView;