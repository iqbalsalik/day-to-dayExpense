const addToDo = document.getElementById("addToDoButton");
const expdes = document.getElementById("expenseDescription");
const descContainer = document.getElementById("descContainer");
const buttonContainer = document.getElementById("addButton");
const dateContainer = document.getElementById("dateContainer");
const textAreaContainer = document.getElementById("textAreaContainer");
const addButtonContainer = document.getElementById("buttonContainer");
const prevDate = document.getElementById("prevDate");
const nextDate = document.getElementById("nextDate");
const ok = document.getElementById("add_to_do");

const month = {
    0: "January",
    1: "Februry",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}

const day = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

const date = new Date();

let innerDateContainer = document.getElementById("date");
let innerMonthYearContainer = document.getElementById("month");
let innerYearContainer = document.getElementById("year");
let innerDayContainer = document.getElementById("day");
const rzpBtn = document.getElementById("rzp-button");
const prem = document.getElementById("prem")

window.addEventListener("DOMContentLoaded",async function(){
    innerDateContainer.innerText = date.getDate();
    innerMonthYearContainer.innerText = month[date.getMonth()]
    innerYearContainer.innerText = date.getFullYear();
    innerDayContainer.innerText = day[date.getDay()]
    const token = localStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/expensePage/allExpense",{headers:{"authorization":token}});
    if(result.data.isPremium ==true){
     rzpBtn.style.display = "none";
    }
})



addToDo.addEventListener("click", addToDoPage);

function addToDoPage(e) {
    e.preventDefault()
    descContainer.style.display = "none";
    buttonContainer.style.display = "none";
    dateContainer.style.display = "block";
    textAreaContainer.style.display = "block";
    addButtonContainer.style.display = "block";
}

let dayName = date.getDay();
let monthName = date.getMonth();
let dateName = date.getDate();

// DATE PREV BUTTON
prevDate.addEventListener("click", function () {
    dateName--;
    dayName--;
    if (dayName < 0) {
        dayName = 6;
    }
    if (dateName < 1) {
        if (monthName == 0) {
            monthName = 11;
            dateName = 31;
            innerYearContainer.innerText = date.getFullYear() - 1
        } else if (monthName == 1 || monthName == 3 || monthName == 5 || monthName == 7 || monthName == 8 || monthName == 10) {
            monthName--;
            dateName = 31
        } else if (monthName == 2) {
            monthName--;
            if (date.getFullYear() % 4 == 0) {
                dateName = 29;
            } else {
                dateName = 28;
            }
        } else if (monthName == 4 || monthName == 6 || monthName == 9 || monthName == 11) {
            monthName--;
            dateName = 30;
        }
    }
    innerDateContainer.innerText = dateName;
    innerDayContainer.innerText = day[dayName];
    innerMonthYearContainer.innerText = month[monthName]
})

//DATE NEXT BUTTON
nextDate.addEventListener("click", function () {
    dateName++;
    dayName++;
    if (dayName > 6) {
        dayName = 0;
    }
    if (dateName > 31) {
        if (monthName == 11) {
            monthName = 0;
            dateName = 1;
            innerYearContainer.innerText = date.getFullYear() + 1
        } else if (monthName == 0 || monthName == 2 || monthName == 4 || monthName == 7 || monthName == 6 || monthName == 9) {
            monthName++;
            dateName = 1;
        }
    } else if (dateName > 30 ) {
        if(monthName == 3 || monthName == 5 || monthName == 8 || monthName == 10){
            dateName = 1;
            monthName++
        }  
    }else if(dateName == 28 || dateName == 29){
        if(monthName ==1){
            dateName = 1;
            monthName++
        }  
    }
    innerDateContainer.innerText = dateName;
    innerDayContainer.innerText = day[dayName];
    innerMonthYearContainer.innerText = month[monthName]
});

ok.addEventListener("click",function(){
    let childNode = ` <h5 style="color:  rgb(1, 150, 150);;"><p id="dateTime">${innerDateContainer.innerText}, ${innerMonthYearContainer.innerText} ${innerYearContainer.innerText} . ${innerDayContainer.innerText}</p></h5>
    <hr style="margin: 0;">
    <div class="details" style="font-size: larger; margin-top: 0.1em;">
        <p id="desc">${expdes.value}</p>
    </div>`
    expdes.value ='';
    descContainer.innerHTML+=childNode;
    descContainer.style.display = "block";
    buttonContainer.style.display = "block";
    dateContainer.style.display = "none";
    textAreaContainer.style.display = "none";
    addButtonContainer.style.display = "none";
})