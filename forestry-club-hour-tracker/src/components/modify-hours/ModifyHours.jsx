import './modify-hours.css'
import Dropdown from "../Dropdown.jsx";
import {useState, useEffect, Fragment} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {HorizontalRule} from "@mui/icons-material";

function pad(value) {
    if(value > 9){
        return value;
    }
    else {
        return '0' + value;
    }
}

function jsDateToSqlDate(date) {
    const sqlDate ='' + date.getUTCFullYear() + '-' +
            pad(date.getUTCMonth() + 1) + '-' +
            pad(date.getUTCDate())      + ' ' +
            pad(date.getUTCHours())     + ':' +
            pad(date.getUTCMinutes())   + ':' +
            pad(date.getUTCSeconds());
    return sqlDate;
}

function translateData(data) {
    if(data){
        return data.map(element => element.fname + " " + element.lname + " (" + element.username + ")");
    }
    else {
        return []
    }
}

/**
 * Modal component for logging hours volunteered and date for event
 * @param isAdmin
 *      is user triggering this component an admin account who needs to view the hour request, or is it a student
 *      creating a new one
 */
export const ModifyHours = ({isAdmin}) => {
    // dialog handlers
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //date state and default values
    const today = dayjs()
    const [dateValue, setDateValue] = useState(today)
    const [startValue, setStartValue] = useState(today.set('hour', today.hour() - 1))
    const [endValue, setEndValue] = useState(today)


    const [memberData, setMemberData] = useState([]);

    useEffect(() => {fetch("http://localhost:3002/api/users", {
        method: "get",
        mode: "cors",
        headers: {
            "content-type": "application/json"
        }
    })
    .then( response => response.json())
    .then( content => content.data)
    .then( result => setMemberData(result))}, []);

    function translateData(data) {
        if(data){
            return data.map(element => element.fname + " " + element.lname + " (" + element.username + ")");
        }
        else {
            return []
        }
    }
    
    async function sendData() {
        const username = document.getElementById("name-select")?document.getElementById("name-select").innerText:"";
        const newMemberHours = {
            time_in: jsDateToSqlDate(startValue.$d),
            time_out: jsDateToSqlDate(endValue.$d),
            create_date: jsDateToSqlDate(dateValue.$d),
            user_id: memberData.filter(member => member.username === username.substring(username.indexOf('(')+1, username.indexOf(')')))[0].user_id,
            under_review: true,
            accepted: false
        }
        console.log(newMemberHours);
        const results = await fetch("http://localhost:3002/api/hours", {
            method: "post",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newMemberHours)
        })
        return results;
    }

    return (
        <Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Submit Hours
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event) => {
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Log Event Hours</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the date and hours worked.
                    </DialogContentText>
                    <Dropdown id="name-select" data={translateData(memberData.filter(member => member.username !== null))} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className={'date-wrapper'}>
                            <DatePicker
                                disabled={isAdmin}
                                label="Date"
                                value={dateValue}
                                onChange={(newValue) => setDateValue(newValue)}
                            />
                        </div>
                        <div className={'time-wrapper'}>
                                <TimePicker
                                    disabled={isAdmin}
                                    label={"Start Time"}
                                    disableFuture
                                    value={startValue}
                                    onChange={(newValue) => setStartValue(newValue)}/>
                            <HorizontalRule/>
                                <TimePicker
                                    disabled={isAdmin}
                                    label={"End Time"}
                                    disableFuture
                                    value={endValue}
                                    onChange={(newValue) => setEndValue(newValue)}/>
                        </div>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={sendData}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}