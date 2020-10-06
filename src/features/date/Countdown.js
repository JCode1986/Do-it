import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core';

function Countdown(props) {
  
    const [timeLeft, setTimeLeft] = useState(0);
 
    useEffect(() => {
        const tick = () => {
            let start = Math.round(new Date().getTime() / 1000);
            let end = props.dateDeadline.seconds;
            setTimeLeft(end - start);
        }
        const interval = setInterval(tick, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [props.dateDeadline])

    const due = () => {
        if(props.dateDeadline.toDate() <= Date.now()){
            return '(Due)'
        }
    }

    const day = Math.floor((props.dateDeadline.seconds - Math.round(new Date().getTime() / 1000)) / (3600*24));
    return (
        <div>
            <div variant="body2">
                <em>
                {
                    typeof timeLeft === 'number' && !day >= 1 ? 
                    <Typography variant="body2">Time Remaining: {new Date(timeLeft * 1000).toISOString().substr(11, 8)}</Typography>
                    :
                    day >= 1 ?
                    <Typography variant="body2">Time Remaining: 24+ hours</Typography>
                    :
                    <Typography style={{color:'red'}} variant="body2"><strong>Time Remaining: {due()}</strong></Typography>
                }
                </em>
            </div>
        </div>
    )
}

export default Countdown
