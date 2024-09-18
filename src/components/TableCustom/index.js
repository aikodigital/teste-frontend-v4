import Table from 'react-bootstrap/Table';
import LineTable from '../LineTable';
import SearchNav from '../SearchBar'
import "./style.css";

const TableCustom = ({equipaments}) => {

  return (
      <div className='container-table'>
        <SearchNav></SearchNav>
        <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>id</th>
                  <th>equipmentModelId</th>
                </tr>
              </thead>
              <tbody>
                {equipaments?.map((item,key)=>{
                  return(
                    <LineTable key={key} id={item.id} name={item.name} modality_id={item.equipmentModelId}/>
                  )
                })}
              </tbody>
            </Table>
      </div>
  );
}

export default TableCustom;