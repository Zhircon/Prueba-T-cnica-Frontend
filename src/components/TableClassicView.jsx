import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
function TableClassicView(props) {
return( 
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre Producto</th>
          <th>Tipo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {props.products.map((item) =>
            <tr>
                <td>{item.name}</td>
                <td>{item.productType.description}</td>
                <td>
                    <Button variant="primary">Editar</Button>
                    <Button variant="danger">Eliminar</Button>
                </td>
            </tr>
        )}
      </tbody>
    </Table>
);
}
export default TableClassicView;