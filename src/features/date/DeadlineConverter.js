
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
    let hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    
    switch(time[0]) {
      case "13":
        time[0] = hours[0]
        break;
      case "14":
        time[0] = hours[1]
        break;
      case "15":
        time[0] = hours[2]
        break;
      case "16":
        time[0] = hours[3]
        break;
      case "17":
        time[0] = hours[4]
        break;
      case "18":
        time[0] = hours[5]
        break;
      case "19":
        time[0] = hours[6]
        break;
          case "20":
        time[0] = hours[7]
        break;
      case "21":
        time[0] = hours[8]
        break;
      case "22":
        time[0] = hours[9]
        break;
      case "23":
        time[0] = hours[10]
        break;
      case "00":
        time[0] = hours[11]
        break;
        default:
            break;
    }
    
    let hr = parseInt(time[0])
    let min = parseInt(time[1])
    
    if (min < 10) {
      min = "0" + min;
    }
        
    let ampm = "AM";
    
    if( hr > 12 ) {
      hr -= 12;
    }
    
    ampm = "PM";
    
    return `${a[0]} ${hr}:${min}${ampm} ${a[2]} ${a[1]} ${a[3]}`
}

export default dateFormat;