import { useEffect, useState } from "react";
import { userToFirstLast } from "../helpers/api_helper";
import AdminNotify from "../components/AdminNotify";

import ToastContainer from 'react-bootstrap/ToastContainer';

function AdminReview() {

    const [count, setCount] = useState(0);
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
        .then(()=> reviewData && setCount(reviewData.filter(record => record.under_review === 1).length));
    }, [reviewData, count]);

    

    // http rest UPDATE the resource on button click
    const doAccept = id => {

        // adjust record
        let record = reviewData.filter(record => record.submission_id == id)[0];

        record.under_review = 0;
        record.accepted = 1;

        // send api put request to change that record to accepted
        if (record) {
            fetch(`http://localhost:3002/api/hours/${id}`), {
                method: 'PUT',
                body: JSON.stringify(record)
            }
        }
    }

    const doDeny = id => {

        // adjust record
        let record = reviewData.filter(record => record.submission_id == id)[0];

        record.under_review = 0
        record.accepted = 1

        // deny record and record it
        if (record) {
            fetch(`http://localhost:3002/api/hours/${id}`, {
                method: 'PUT',
                body: JSON.stringify(record)
            })
        }
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
                        <p>You&apos;re all done! <a href="AdminMemberView">Go to Admin Member view.</a></p>
                    </>
                )
            }
        
        </>
    );
}

export default AdminReview;