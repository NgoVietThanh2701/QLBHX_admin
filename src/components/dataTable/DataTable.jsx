import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './dataTable.scss'

const DataTable = ({ userRows, userColumns, actionColumn, title }) => {

   return (
      <div className='data-table'>
         <div className='data-table-title'>
            Danh sách {title}
            <Link to='./new-product' className='link' > Add new</Link>
         </div>
         <DataGrid
            style={{ paddingLeft: "15px" }}
            rows={userRows}
            columns={userColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowHeight={60}
         />
      </div>
   )
}

export default DataTable;