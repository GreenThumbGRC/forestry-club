import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: { 
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, 
            width: 250, 
        },
    },
};

export default function BasicSelect({ id, data }) {
    const [memberName, setMemberName] = React.useState('');

    const handleChange = (event) => {
        setMemberName(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Name</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id={id}
                    value={memberName}
                    label="Age"
                    onChange={handleChange}
                    MenuProps={MenuProps}
                >
                    {data.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
}