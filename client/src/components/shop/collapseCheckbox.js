import React, { useState } from "react";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Collapse
} from '@mui/material';

const CollapseCheckbox = ({initState, title, list, handleFilters}) => {
    const [open, setOpen] = useState(initState);
    const [checked, setChecked] = useState([]);

    const handleCollapseOpen = () => {
        setOpen(!open);
    }

    const renderList = () => (
        list ? list.map((item) => (
            <ListItem key={item._id}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                    <Checkbox 
                        onChange={() => handleOnChange(item._id)}
                        checked={checked.indexOf(item._id) !== -1}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        )) : null 
    )

    const handleOnChange = (id) => {
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];

        if(currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        handleFilters(newChecked);
    }

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
                        {renderList()}
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default CollapseCheckbox;