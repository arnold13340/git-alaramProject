
//getting the container
let container = document.getElementById("container");

//creating the clock container and appending to the clock container
let clockContainer = document.createElement("div");
clockContainer.classList.add("clock-container");
container.appendChild(clockContainer);

//creating live time container and appendig to the clock container
let liveTimeContainer = document.createElement("div")
liveTimeContainer.classList.add("live-time-container");
clockContainer.appendChild(liveTimeContainer);

//creating the live time para and appending to the live time container
let liveTime = document.createElement("p");
liveTime.classList.add("live-time");
liveTime.textContent = "";
liveTimeContainer.appendChild(liveTime);

//creating the container for input and appending to the clock container
let inputContainer = document.createElement("div");
inputContainer.classList.add("input-container")
clockContainer.appendChild(inputContainer);

//creating the hour number input and appending to the inputContainer
let hour = document.createElement('input');
hour.placeholder='HH'
hour.classList.add("hour")
hour.type = "number";
inputContainer.appendChild(hour);

//creating the minute number input and appending to the inputContainer
let minute = document.createElement('input');
minute.placeholder="MM"
minute.classList.add("minute");
minute.type = "number";
inputContainer.appendChild(minute);

let second = document.createElement('input');
second.placeholder="SS"
second.classList.add("second");
second.type = "number";
inputContainer.appendChild(second);

//creating the select Input appending to the input container
let select = document.createElement('select');
select.classList.add("select")
inputContainer.appendChild(select);

//creation the AM option value and appending to the select
let amOption = document.createElement('option');
amOption.value = "AM";
amOption.textContent = "AM";
select.appendChild(amOption);

//creation the PM option value and appending to the select
let pmOption = document.createElement('option');
pmOption.value = "PM";
pmOption.textContent = "PM";
select.appendChild(pmOption);

//creating the button element and appending to the clockContainer
let buttonElement = document.createElement("button");
buttonElement.classList.add("button");
buttonElement.textContent = "Set Alarm"
clockContainer.appendChild(buttonElement);

let stopbuttonElement = document.createElement("button");
stopbuttonElement.classList.add("stop-button");
stopbuttonElement.textContent = "Stop Alarm"
clockContainer.appendChild(stopbuttonElement);


stopbuttonElement.addEventListener('click',()=>{
    audioPlayer.pause();
    audioPlayer.currentTime = 0;

})

//function for create and appending the alarm list
let createAndAppendAlarm = (event) => {
    event.preventDefault();

    const selectedHour = parseInt(hour.value);
    const selectedMinute = parseInt(minute.value);
    const selectedSecond=parseInt(second.value);
    const selectedPeriod = select.value;

    if (selectedHour >= 1 && selectedHour <= 12 && selectedMinute >= 0 && selectedMinute <= 59 && selectedSecond >=0 && selectedSecond <=59) {
        const formattedHour = selectedHour < 10 ? `0${selectedHour}` : selectedHour;
        const formattedMinute = selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute;
        const formattedSecond=selectedSecond < 10 ? `0${selectedSecond}` : selectedSecond;

        let appendContainer = document.createElement("div");
        appendContainer.classList.add("append-container");
        clockContainer.appendChild(appendContainer);

        let uList = document.createElement("ul");
        uList.classList.add("u-list");
        appendContainer.appendChild(uList);

        let list = document.createElement("li");
        list.classList.add("list");
        list.textContent = `${formattedHour}:${formattedMinute}:${formattedSecond} ${selectedPeriod}`;
        list.setAttribute("data-alarm-value", `${formattedHour}:${formattedMinute}:${formattedSecond} ${selectedPeriod}`)
        uList.appendChild(list);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"
        deleteButton.classList.add('delete-button');
        uList.appendChild(deleteButton);

        hour.value = "";
        minute.value = "";
        second.value="";
    }
}

//creating evenet listener for the button
buttonElement.addEventListener('click', createAndAppendAlarm);

const audioPlayer = new Audio();
audioPlayer.src = "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3";


//logic for the music 
let checkAndDisplayAlarmMatch = () => {
    const alarms = document.querySelectorAll(".list");
    alarms.forEach((alarm) => {
        const alarmValue = alarm.getAttribute("data-alarm-value");
        if (liveTime.textContent.trim() === alarmValue.trim()) {

            // Display an alert when liveTime matches alarmValue
            audioPlayer.play();
          

        }
            console.log(liveTime.textContent.trim() === alarmValue.trim())
    });
}

//logic live clock 
let updateClock = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds=date.getSeconds();
    let period = hours >= 12 ? "PM" : "AM";

    if (hours > 12) {
        hours -= 12;
    }

    if (hours === 0) {
        hours = 12;
    }

    const timeString = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${period}`;
    liveTime.textContent = timeString;

    checkAndDisplayAlarmMatch();
}

updateClock();
setInterval(updateClock, 1000);

// Function to remove the alarm container when the delete button is clicked
const removeAlarmContainer = (event) => {
    const containerToRemove = event.target.closest(".append-container");
    if (containerToRemove) {
        containerToRemove.remove();
        audioPlayer.pause();
    }
}

// Event delegation: Add a single click event listener to the clockContainer
clockContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        removeAlarmContainer(event);
    }
});


