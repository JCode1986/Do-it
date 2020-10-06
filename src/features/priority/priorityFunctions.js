import React from 'react';
import WarningIcon from '@material-ui/icons/Warning';

export function changeIconColor(priorityLevel) {
    switch(priorityLevel) {
        case 1:
            return ( <WarningIcon style={{color:'green', fontSize:'35px'}} alt="complex"/> )
        case 2:
            return ( <WarningIcon style={{color:'gold', fontSize:'35px'}} alt="complex"/> )
        case 3:
            return ( <WarningIcon style={{color:'red', fontSize:'35px'}} alt="complex"/> )
        default:
            break;
    }
}

export function priorityToString(level) {
    if (level === 1) return "Priority Level: Low";
    if (level === 2) return "Priority Level: Medium";
    if (level === 3) return "Priority Level: High";
}