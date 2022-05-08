function isWeekend(date = new Date()) {
    //console.log(date.getDay())
    //console.log(date,date.getDay())
    return date.getDay()=== 6 || date.getDay() === 5;
  }
module.exports = {isWeekend}