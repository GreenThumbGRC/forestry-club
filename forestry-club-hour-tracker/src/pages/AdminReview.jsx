import AdminNotify from "../components/AdminNotify";

import ToastContainer from 'react-bootstrap/ToastContainer';

const test_data = [
    {
        ['name']: 'John Doe',
        ['time_in']: Date.now(),
        ['time_out']: Date.now(),
        ['date_volunteered']: Date.now(),
        ['date_submitted']: Date.now()
    },
    {
        ['name']: 'Bob Johnson',
        ['time_in']: Date.now() + 1,
        ['time_out']: Date.now() + 1,
        ['date_volunteered']: Date.now(),
        ['date_submitted']: Date.now() + 1
    }
]

function AdminReview() {
    return (
        <>
            <ToastContainer>
                {
                    test_data.map(o =>
                        <AdminNotify
                            key={o.name + o.date_submitted.toString()}
                            name={o.name}
                            time_in={o.time_in}
                            time_out={o.time_out}
                            date_submitted={o.date_submitted}
                            date_volunteered={o.date_volunteered}
                        />
                    )
                }
            </ToastContainer>
        </>
    );
}

export default AdminReview;