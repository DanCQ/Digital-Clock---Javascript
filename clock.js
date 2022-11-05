const background = document.querySelector(".background"); //selects container background
const clock = document.querySelector(".clock"); //selects clock face


//allows clear view of the background picture
clock.addEventListener("click", function() {

  let contact = document.querySelector(".contact");
  
  background.style.backgroundSize = "contain";
  clock.style.visibility = "hidden";
  contact.style.color = "black";
  contact.style.textShadow = "0px 0px 2px lightsteelblue";

  //sets back to normal
  setTimeout(function() {
    background.style.backgroundSize = "cover";
    clock.style.visibility = "visible";
  },5000); //waits 5 seconds to run

  setTimeout(function() {
    contact.style.color = "";
    contact.style.textShadow = "";
  },10000); //waits 10 seconds to run

});


//Gets calendar & clock text display
function timeStamp() {

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekdayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(); //gets your local date & time
  const day = date.getDate(); //number of day in the current month
  const month = monthArray[date.getMonth()]; //number of month for array
  const time = date.toLocaleTimeString(); //a time string value
  const year = date.getFullYear(); //current year
  const weekday = weekdayArray[date.getDay()]; //number of weekday for array

  const hours = time.substring(0, time.search(":")); //display string from 0 to first :
  const minutes = time.substring(time.search(":") + 1, time.lastIndexOf(":")); //display from after first : to before last :
  const daylight = time.substring(time.search("M") - 2, time.search("M") + 1); //display two spaces before M & include M

  //inserts time into html document
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = `${weekday}, ${month} ${day}, ${year}`;

  const hh = document.getElementById("hh"); //hour display
  hh.innerHTML = hours;

  const mm = document.getElementById("mm"); //minute display
  mm.innerHTML = minutes + daylight;
}


//creates a blinking effect for the colon (the seconds indicator)
function seconds() {
  
  const colon = document.getElementById("colon");
  
  if (colon.className != "hide") {
    colon.className = "hide";
    return colon;
  } else {
    colon.className = "";
    return colon;
  }
}


//Changes background image based on user's time w/ const(currentHour)
const backgroundUI = function (hour) {
  
  if (hour >= 5 && hour <= 9) {

    background.style.background = 'url(https://i.postimg.cc/K8zpGz1c/1.jpg)';
    clock.style.color = "black";
  }
  if (hour >= 10 && hour <= 15) {
    background.style.background = 'url(https://i.postimg.cc/qvhcDCtK/2.jpg)';
    clock.style.color = "black";
  }
  if (hour >= 16 && hour <= 20) {
    background.style.background = 'url(https://i.postimg.cc/QMcQhGJx/3.jpg)';
    clock.style.color = "white";
  }
  if (hour >= 21 || hour <= 4) {
    background.style.background =  'url(https://i.postimg.cc/Y0DgbpM8/4.jpg)';
    clock.style.color = "white";
  }

  background.style.backgroundPosition = 'center';
  background.style.backgroundRepeat = 'no-repeat';
  background.style.backgroundSize = 'cover';
};


//gets local date & time for use w/ backgroundUI() function
const currentHour = function () {

  const hourNow = new Date().getHours();
  return hourNow;
};


//runs function after html document loads
window.onload = function() {
  
  timeStamp(); //runs once without delay
  backgroundUI( currentHour() ); //runs once without delay
  
  //avoids a refresh to see background change (runs every minute)
  setInterval(function () { backgroundUI( currentHour() ) }, 1000 * 60 ); 
  
  setInterval(function () { timeStamp() }, 1000); //keeps time running every second (millisecond)
  setInterval(function () { seconds() }, 1000 / 2); //runs twice per second (millisecond)
};
