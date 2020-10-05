import React, { useState, useEffect } from 'react'

function Countdown(props) {
    const [timeLeft, setTimeLeft] = useState(10);
    const [isDue, setIsDue] = useState(false);

    console.log(props.dateDeadline.seconds - props.dateCreated.seconds, "seconds left")
    // const tick = () => {
    //     setTimeLeft(timeLeft => timeLeft + 1)
    // }

    // useEffect(() => {
    //     const interval = setInterval(tick, 1000)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [])

    useEffect(() => {
        if(timeLeft === 15) {
            setTimeLeft('Poop');
        }
        return () => {
            clearInterval(timeLeft)
        }
    },[timeLeft] )


    return (
        <div>
            {timeLeft}
        </div>
    )
}

export default Countdown
