import MemberTimesTable from "../components/Table";


function MemberView() { 
    const exampleData = [
        { "id": 0, "date": "2025-02-20", "hours": 3, "points": 30, "status": "Accepted" },
        { "id": 1,"date": "2025-02-21", "hours": 2.5, "points": 25, "status": "Accepted" },
        { "id": 2,"date": "2025-02-22", "hours": 4, "points": 40, "status": "Pending" },
        { "id": 3,"date": "2025-02-23", "hours": 1.5, "points": 15, "status": "Accepted" },
        { "id": 4,"date": "2025-02-24", "hours": 3.8, "points": 38, "status": "Accepted" }
    ];

    const rowData = exampleData;

    const columns = [
        { field: 'date', headerName: 'Date', width: 500 },
        { field: 'hours', headerName: 'Hours', width: 200 },
        { field: 'points', headerName: 'points', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 }
    ];

    return (
        <>
            <a href="/"><button>logout</button></a>
            <div style={{textAlign: "left"}}>John Manford</div>
            <div>Point Total: 148</div>
            <MemberTimesTable rows={rowData} columns={columns}/>
        </>
    );
}

export default MemberView;