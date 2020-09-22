
//date format function to match date format for create date
function dateFormat(dateString) {
    let a = dateString.split(" ");
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    switch(a[0]) {
      case "Sun":
        a[0] = days[0]
        break;
      case "Mon":
        a[0] = days[1]
        break;
      case "Tue":
        a[0] = days[2]
        break;
      case "Wed":
        a[0] = days[3]
        break;
      case "Thu":
        a[0] = days[4]
        break;
      case "Fri":
        a[0] = days[5]
        break;
      case "Sat":
        a[0] = days[6]
        break;
        default:
            break;
    }
    
    let time = a[4].split(":");    
    let hr = parseInt(time[0])
    let min = parseInt(time[1])
    
    if (min < 10) {
      min = "0" + min;
    }
        
    let ampm = "AM";

    
    if (hr > 11) {
        hr -= 12;
        ampm = "PM"
    }

    if (hr === 0) {
      hr = 12;
    }
    
    return `${a[0]} ${hr}:${min} ${ampm} ${a[2]} ${a[1]} ${a[3]}`
}

export default dateFormat;