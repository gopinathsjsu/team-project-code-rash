//console.log(isWeekend());

var ranger = require("./dateRanges")
var weekend = require("./weekend")
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
Date.prototype.reduceDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
}
function getDays(days_involved =6,d = new Date()){
    //get 5 days before today
  let dayslist=[]
  dayslist.push(d)
  for(var i =1;i<days_involved;i++){
      

      dayslist.push(d.addDays(i).toString())
      dayslist.push(d.reduceDays(i).toString())


  }/*
  for(var day of dayslist){
      console.log(day)
  }*/
  //console.log(dayslist)
  return dayslist

}

function getLastDayofMonth(day,month, year) {
    var d = new Date();
    if (year) { d.setFullYear(year); }
    d.setDate(1); // Roll to the first day of ...
    d.setMonth(month || d.getMonth() + 1); // ... the next month.
    do { // Roll the days backwards until Monday.
      d.setDate(d.getDate() - 1);
    } while (d.getDay() !== day);
    return d;
  }

function getNthDayDate( day,month,year,n){
    var d = new Date();
    if (year) { d.setFullYear(year); }
    d.setDate(1); // Roll to the first day of ...
    d.setMonth(month || d.getMonth()); // ... the next month.
    let count=0
    console.log(day)
    while (true) {
       
      if (d.getDay()==day){
          
          count+=1
          
      }
      if (count==2){
        break
    }
      d.setDate(d.getDate() + 1);
      
      
   
    } 
    return d;
}
function generateHolidays(year=2022){
    let holidayList={}
    let allholidays=[]

    let newyear = new Date("2022-01-01")
    holidayList[newyear] = {description:"new year",dates_involved:getDays(3,new Date(newyear))}
    

    let thirdMonJan = getNthDayDate(1,1,2022,3)
    holidayList[thirdMonJan] = {description:"Birthday of Martin Luther King, Jr.",dates_involved:getDays(2,thirdMonJan)}
    
    let thirdMonFeb = getNthDayDate(1,2,2022,3)
    holidayList[thirdMonFeb] = {description:"Birthday of Washington",dates_involved:getDays(2,thirdMonFeb)}
    
    let lastMonMay=getLastDayofMonth(1,5,2022)
    holidayList[lastMonMay] = {description:"Memorial Day",dates_involved:getDays(2,lastMonMay)}
    
    let freedomday = new Date("2022-07-05")
    holidayList[freedomday] = {description:"Freedom Day",dates_involved:getDays(3,freedomday)}
    
    let firstMonSep=getNthDayDate(1,9,2022,1)
    holidayList[firstMonSep] = {description:"Labor Day",dates_involved:getDays(2,firstMonSep)}
    
    let secondMonOct=getNthDayDate(1,10,2022,2)
    holidayList[secondMonOct] = {description:"Columbus Day",dates_involved:getDays(2,secondMonOct)}
    
    let veteransday = new Date("2022-11-12")
    holidayList[veteransday] = {description:"Veterans Day",dates_involved:getDays(3,veteransday)}
    
    let fourthThursNov=getNthDayDate(4,11,2022,4)
    holidayList[fourthThursNov] = {description:"Thanks Giving",dates_involved:getDays(6,fourthThursNov)}
    
    let christmas=new Date("2022-12-26")
    holidayList[christmas] = {description:"Christmas",dates_involved:getDays(7,christmas)}
    
    for(let [key,value] of Object.entries(holidayList)){
      //console.log(value["dates_involved"])
      //allholidays.add(...value["dates_involved"])
     // console.log
     allholidays=allholidays.concat(value["dates_involved"])

    }

    allholidays=new Set(allholidays)
    //console.log(allholidays)
    return allholidays

}

function checkDates(startDate, stopDate,holidays,baseprice){

  let dateRange = ranger.getDates(startDate,stopDate)
  //console.log(holidays)
  let total=0
  for(let d of dateRange){
    let percent=1  
    if (weekend.isWeekend(d)){
        console.log("a weekend",d)
        percent=0.10
      }

    //  console.log(d)
      if(holidays.has(d.toString())){
        console.log("national holiday",d)
        percent=percent+0.05
      }
      total=total+baseprice*(1+percent)
  }
  //console.log(dateRange)
  console.log(total)
  return total
}
//let allholidayList = generateHolidays()
//checkDates(new Date("2022-12-27"),new Date("2023-01-02"),allholidayList,25)

//let date=new Date("2022-01-01")
//console.log(date)
//let [first] =allholidayList
//console.log(first)
//console.log(date)
//console.log(date.toString()==first.toString())
/*
module.exports = checkDates
module.exports = generateHolidays
*/