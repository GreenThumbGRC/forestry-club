import PropTypes from 'prop-types';
import { Button, Card, CardContent, CardHeader, Typography, Grid, Box } from '@mui/material';
import Divider from '@mui/material/Divider'
import { useState } from 'react';

function AdminNotify({
  id,
  name,
  time_in,
  time_out,
  date_volunteered,
  date_submitted,
  onAccept = () => {},
  onDeny = () => {},
  setReviewData = () => {},
  reviewData
}) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  const time_in_readable = time_in;
  const time_out_readable = time_out;
  const date_volunteered_readable = date_volunteered;
  const date_submitted_readable = new Date(date_submitted).toLocaleDateString();

  const handleAccept = () => {
    setReviewData(reviewData.filter(entry => entry.submission_id !== id));
    setShow(false);
    onAccept(id);
  };

  const handleDeny = () => {
    setReviewData(reviewData.filter(entry => entry.submission_id !== id));
    setShow(false);
    onDeny(id);
  };

  return (
    <Card sx={{ m: 1 }}>
      <CardHeader title={name} />
      <Divider variant='middle' component='hr' sx={{ backgroundColor: 'grey.500', height: '1px' }} />
      <CardContent>
        <Typography><strong>Date of Volunteer:</strong> {date_volunteered_readable}</Typography>
        <Typography><strong>Time In:</strong> {time_in_readable}</Typography>
        <Typography><strong>Time Out:</strong> {time_out_readable}</Typography>
        <Typography><strong>Submitted on:</strong> {date_submitted_readable}</Typography>

        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button variant="contained" color="success" onClick={handleAccept}>Accept</Button>
          <Button variant="contained" color="error" onClick={handleDeny}>Deny</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

AdminNotify.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  time_in: PropTypes.string,
  time_out: PropTypes.string,
  date_volunteered: PropTypes.string,
  date_submitted: PropTypes.string,
  onAccept: PropTypes.func,
  onDeny: PropTypes.func,
  setReviewData: PropTypes.func,
  reviewData: PropTypes.array
};

export default AdminNotify;