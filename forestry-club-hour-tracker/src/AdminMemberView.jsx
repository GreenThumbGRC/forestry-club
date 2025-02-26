import AdminNav from "./AdminNav";
import { useParams } from "react-router";
import MemberTimesTable from "./components/Table";
import { Button } from '@mui/material';
import { alignProperty } from "@mui/material/styles/cssUtils";


function AdminMemberView() { 
    const params = useParams();
    const exampleData = [
        { "id": 0, "date": "2025-02-20", "hours": 3, "status": "Accepted" },
        { "id": 1,"date": "2025-02-21", "hours": 2.5, "status": "Accepted" },
        { "id": 2,"date": "2025-02-22", "hours": 4, "status": "Pending" },
        { "id": 3,"date": "2025-02-23", "hours": 1.5, "status": "Accepted" },
        { "id": 4,"date": "2025-02-24", "hours": 3.75, "status": "Accepted" }
    ];

    const rowData = exampleData;

    const columns = [
        { field: 'date', headerName: 'Date', width: 500 },
        { field: 'hours', headerName: 'Hours', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
        { field: 'edit', headerName: '', width: 500, renderCell: EditButton,
            width: 150,  sortable: false, filterable: false, resizable: false,
            hideable: false, disableExport: true, disableColumnMenu: true }
    ];

    function EditButton(props) {
        return (<a href={window.location.href+'/'+exampleData[props.id].id}><Button
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
    >
        review
    </Button></a>)
    }
    return (
        <>
            <a href="/adminReview"><button>Back</button></a>
            <AdminNav />
            <p style={{textAlign: "left"}}>{params.member}</p>
            <MemberTimesTable rows={rowData} columns={columns}/>
        </>
    );
}

export default AdminMemberView;