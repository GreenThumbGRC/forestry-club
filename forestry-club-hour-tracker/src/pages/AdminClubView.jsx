import AdminNav from "../components/AdminNav";
import AdminTable from "../components/Table";
import { Button } from '@mui/material';


function AdminClubView() { 
    const exampleData = [
        { "id": 0, "name": "Alice Johnson", "ytd": 120, "qtd": 30, "points": 1200 },
        { "id": 1, "name": "Michael Smith", "ytd": 95, "qtd": 25, "points": 950 },
        { "id": 2, "name": "Sophia Martinez", "ytd": 150, "qtd": 40, "points": 1500 },
        { "id": 3, "name": "James Brown", "ytd": 80, "qtd": 20, "points": 800 },
        { "id": 4, "name": "Emily Davis", "ytd": 110, "qtd": 35, "points": 1100 }
    ];

    const rowData = exampleData;

    const columns= [
        {field: 'name', headerName: 'Name', width: 500},
        {field: 'ytd', headerName: 'Year to Date', width: 200},
        {field: 'qtd', headerName: 'Quater to Date', width: 200},
        {field: 'points', headerName: 'Points', width: 150},
        {field: 'none', headerName: 'Edit', renderCell: ViewButton, 
            width: 150,  sortable: false, filterable: false, resizable: false, 
            hideable: false, disableExport: true, disableColumnMenu: true}
    ];

    function ViewButton(props) {
        return (<a href={"/adminClub/"+rowData[props.id].name}><Button
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
    >
        View
    </Button></a>)
    }

    return (
        <>
            <p>AdminReview Success</p>
            <AdminNav />
            <AdminTable rows={rowData} columns={columns}/>
        </>
    );
}

export default AdminClubView;