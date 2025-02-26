import { DataGrid } from '@mui/x-data-grid'

function AdminTable({ rows, columns }) { 
    return (
        <div>
            <DataGrid rows={rows} columns={columns} />
        </div>
    )
}

export default AdminTable;