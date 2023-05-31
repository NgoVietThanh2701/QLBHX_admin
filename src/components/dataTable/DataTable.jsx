import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './dataTable.scss';

const DataTable = ({ userRows, userColumns, actionColumn}) => {

   return (
      <DataGrid
         style={{ paddingLeft: "15px" }}
         rows={userRows}
         columns={userColumns.concat(actionColumn)}
         pageSize={5}
         rowsPerPageOptions={[5]}
         rowHeight={90}
      />
   )
}

export default DataTable;