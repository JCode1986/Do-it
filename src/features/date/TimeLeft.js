import React, { useState } from 'react'

function TimeLeft(props) {
       //get years, months, days, hours, minutes, and seconds
    //deduct all and return for ticking time left counter
    
    let result = 0;

    //current date
    let cYear =  new Date(Date.now()).getUTCFullYear();
    let cMonth = new Date(Date.now()).getMonth();
    let cDay = new Date(Date.now()).getDay();
    let cHour = new Date(Date.now()).getHours();
    let cMinute = new Date(Date.now()).getMinutes();
    let cSecond = new Date(Date.now()).getSeconds();
    //deadline
    let dYear =  deadline.getUTCFullYear();
    let dMonth = deadline.getMonth();
    let dDay = deadline.getDay();
    let dHour = deadline.getHours();
    let dMinute = deadline.getMinutes();
    let dSecond = deadline.getSeconds();

    //time left
    let leftYears = 0;
    let leftMonths = 0;
    let leftDays = 0;
    let leftHours = 0;
    let leftMinutes = 0;
    let leftSeconds = 0;


    if (cYear != dYear) leftYears = dYear - cYear;
    if (cMonth != dMonth) leftMonths = Math.abs(dMonth - cMonth); 
    if (cDay != dDay) leftDays =  Math.abs(dDay - cDay); 
    if (cHour != dHour) leftHours =  Math.abs(dHour - cHour); 
    if (cMinute != dMinute) leftMinutes =  Math.abs(dMinute - cMinute); 
    if (cSecond != dSecond) leftSeconds =  Math.abs(dSecond - cSecond); 

    let results = `${leftYears}, ${leftMonths}, ${leftDays}, ${leftHours} ${leftMinutes}, ${leftSeconds}`

    const secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }



    const [year, setYear] = useState(new Date(Date.now()).getUTCFullYear());
    const [month, setMonth] = useState(new Date(Date.now()).getMonth());
    const [day, setDay] = useState(new Date(Date.now()).getDay())
    const [hour, setHour] = useState(new Date(Date.now()).getHours());
    const [minute, setMinute] = useState(new Date(Date.now()).getMinutes);
    const [second, setSecond] = useState(new Date(Date.now()).getSeconds());
    return (
        <div>
            
        </div>
    )
}

export default TimeLeft