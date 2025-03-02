import AdminNotify from "./components/AdminNotify";

import ToastContainer from 'react-bootstrap/ToastContainer';

const test_data = [
    {
        ['work_id']: 0,
        ['name']: 'John Doe',
        ['name_id']: 0,
        ['time_in']: Date.now(),
        ['time_out']: Date.now(),
        ['date_volunteered']: Date.now(),
        ['date_submitted']: Date.now(),
        ['under_review']: true
    },
    {
        ['work_id']: 1,
        ['name']: 'Bob Johnson',
        ['name_id']: 1,
        ['time_in']: Date.now() + 1,
        ['time_out']: Date.now() + 1,
        ['date_volunteered']: Date.now(),
        ['date_submitted']: Date.now() + 1,
        ['under_review']: true
    }
]

function AdminReview() {
    return (
        <>
            <ToastContainer>
                {
                    test_data.map(o => {
                        o.under_review && (
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
                    )
                }
            </ToastContainer>
        </>
    );
}

export default AdminReview;