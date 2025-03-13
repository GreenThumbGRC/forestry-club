import { useEffect, useState } from "react";
import { userToFirstLast } from "../helpers/api_helper";
import AdminNotify from "../components/AdminNotify";

function AdminReview() {

    // const [count, setCount] = useState(0);
    const [users, setUsers] = useState(null);
    const [reviewData, setReviewData] = useState(null);

    // fetch user list
    useEffect( () => {
        // TODO: set me to a .env sometime!
        fetch("http://localhost:3002/api/users/")
        .then(res => res.json())
        .then(json => setUsers(json.data));
    },[] );

    // fetch work hours
    useEffect( () => {
        // TODO: set me to a .env sometime!
        fetch("http://localhost:3002/api/hours/")
        .then(res => res.json())
        .then(json => setReviewData(json.data))
    }, []);

    

    // http rest UPDATE the resource on button click
    const doAccept = id => {

        let record = reviewData.filter(record => record.submission_id == id)[0];

        // send api put request to change that record to accepted
        
        const header = new Headers();
        header.append( "Content-Type", "application/json");
        header.append( 'Accept', 'application/json');

        fetch("http://localhost:3002/api/hours/"), {
            mode: "cors",
            method: 'PUT',
            headers: header,
            body: JSON.stringify(
                {
                    "submission_id": record.submission_id, 
                    "accepted": 1
                }
            )
        }.then(console.log)
    }

    const doDeny = id => {
        let record = reviewData.filter(record => record.submission_id == id)[0];

        // deny record and record it
    
        const header = new Headers();
        header.append( "Content-Type", "application/json");
        header.append( 'Accept', 'application/json');

        fetch("http://localhost:3002/api/hours/", {
            mode: "cors",
            method: 'PUT',
            headers: header,
            body: JSON.stringify(
                {
                    "submission_id": record.submission_id, 
                    "accepted": 0
                }
            )
        }).then(console.log)
    }

    return (
        <>
            {
                // on first pass, show all under_review.
                users && reviewData &&
                reviewData.filter(entry => entry.under_review === 1)
                .map( entry => (
                    <AdminNotify
                        key={entry.submission_id}
                        id={entry.submission_id}
                        name={userToFirstLast(users.filter(user => user.user_id === entry.user_id)[0])}
                        time_in={entry.time_in}
                        time_out={entry.time_out}
                        date_submitted={entry.create_date}
                        date_volunteered={entry.time_in}
                        onAccept={doAccept}
                        onDeny={doDeny}
                    />
                )) 
                || 
                // if no records are found, show a link to admin member view
                (
                    <>
                        <p>You&apos;re all done! <a href="adminClub">Go to Admin Member view.</a></p>
                    </>
                )
            }
        
        </>
    );
}

export default AdminReview;