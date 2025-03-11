import * as React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

async function submit(event){
    event.preventDefault();

    const result = await sendData();

    console.log(result);
    //document.location.href="/";
}

async function sendData() {
    const username = document.getElementById("username").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const newMember = {
        username,
        fname,
        lname,
        user_flags: 0
    }

    const results = await fetch("http://localhost:3002/api/users", {
        method: "post",
        mode: "cors",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newMember)
    })
    return results;
}

export default function AddMember() { 
    return (
        <>
            <h2>Add new member</h2>
            <br />
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField id="username" label="Username" variant="outlined" />
                </div>
                <div>
                    <TextField id="fname" label="fname" variant="outlined" />
                </div>
                <div>
                    <TextField id="lname" label="lname" variant="outlined" />
                </div>
                <div>
                    <button onClick={submit}>Submit</button>
                </div>
            </Box>
        </>
    );
}