import React, { useState } from "react";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    TextField,
    Button
} from '@mui/material';

const RangeSelect = ({initState, title, handleRange}) => {
    const [open, setOpen] = useState(initState);

    const handleCollapseOpen = () => {
        setOpen(!open);
    }

    const formik = useFormik({
        initialValues: { min: 0, max: 5000 },
        validationSchema: Yup.object({
            min: Yup.number()
                .min(0, 'Minimum price is 0')
                .max(10000, `Minimum price can't be greater than 10000` ),
            max: Yup.number()
                .min(5, `Maxmum price can't be less than 5`)
                .max(10000, 'Maximum price is 10000')
        }),
        onSubmit: (values) => {
            handleRange([values.min, values.max]);
        }
    })

    return (
        <div className="collapse_items_wrapper">
            <List>
                <ListItem onClick={handleCollapseOpen} style={{cursor: 'pointer'}}>
                    <ListItemText
                        primary={title}
                        className="collapse_title"
                    />
                    { open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
                </ListItem>
                <Collapse in={open} timeout="auto">
                    <List component="div" disablePadding>
                        <form className="mt-3" onSubmit={formik.handleSubmit}>
                            <TextField
                                style={{
                                    width: '100%'
                                }}
                                label='Min'
                                name='min'
                                variant='outlined'
                                type="number"
                                {...formik.getFieldProps('min')}
                                {...errorHelper(formik, 'min')}
                            />
                            <TextField
                                style={{
                                    width: '100%',
                                    marginTop: '10px'
                                }}
                                label='Max'
                                name='max'
                                variant='outlined'
                                type="number"
                                {...formik.getFieldProps('max')}
                                {...errorHelper(formik, 'max')}
                            />
                            <Button 
                                type="submit"
                                className="mt-3"
                                variant="outlined"
                                size="small"
                            >Search</Button>
                        </form>
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default RangeSelect;