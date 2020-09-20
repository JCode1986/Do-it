
const timeConverter =() => {
    //date conversion from https://stackoverflow.com/questions/14638018/current-time-formatting-with-javascript
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = new Date(); 
    let day = days[d.getDay()];
    let hr = d.getHours();
    let min = d.getMinutes();

    if (min < 10) {
    min = "0" + min;
    }

    let ampm = "am";

    if( hr >= 12 ) {
    hr -= 12;
    }

    ampm = "pm";

    let getDate = d.getDate();
    let getMonth = months[d.getMonth()];
    let getYear = d.getFullYear();

    return `${day} ${hr}:${min}${ampm} ${getDate} ${getMonth} ${getYear}`
}

export default timeConverter;


