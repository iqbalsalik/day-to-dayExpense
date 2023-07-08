

let innerDateContainer = document.getElementById("date");
let innerMonthYearContainer = document.getElementById("month");
let innerYearContainer = document.getElementById("year");
let innerDayContainer = document.getElementById("day");

const addToDo = document.getElementById("addToDoButton");
const buttonContainer = document.getElementById("addButton");
const fillingArea = document.getElementById("toAddContainer");

const prevDate = document.getElementById("prevDate");
const nextDate = document.getElementById("nextDate");

const credit = document.getElementById("credit");
const debit = document.getElementById("debit");
const expName = document.getElementById("expName");
const expAmount = document.getElementById("expAmount");
const expDescr = document.getElementById("expDescr");
const okButton = document.getElementById("okButton");
const totalAmount = document.getElementById("amountPara");
const amountCreditParaList = document.getElementById("amountCreditParaList");
const amountDebitParaList = document.getElementById("amountDebitParaList");
const incomeCreditContainer = document.getElementById("incomeCreditContainer");
const incomeCreditText = document.getElementById("incomeCreditText");
const incomeCreditAmount = document.getElementById("incomeCreditAmount");
const incomeDebitContainer = document.getElementById("incomeDebitContainer");
const incomeDebitText = document.getElementById("incomeDebitText");
const incomeDebitAmount = document.getElementById("incomeDebitAmount");
const plusIncomeCredit = document.getElementById("plusIncomeCredit");
const plusIncomeDebit = document.getElementById("plusIncomeDebit");
const rzpBtn = document.getElementById("rzp-button");
const prem = document.getElementById("prem");
const leaderboardList = document.getElementById("leaderboardList");
const tBody = document.getElementById("tBody");



const monthlyHtmlTotalIncomeCredit = document.getElementById("monthlyHtmlTotalIncomeCredit");
const monthlyHtmlTotalIncomeDebit = document.getElementById("monthlyHtmlTotalIncomeDebit");
const monthlyHtmlBalanceLeft = document.getElementById("monthlyHtmlBalanceLeft");

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

let count = 0;
let countCredit = 0;

let dayName = date.getDay();
let monthName = date.getMonth();
let dateName = date.getDate();
let yearName = date.getFullYear();

//ON DOM CONTENT LOADED
window.addEventListener("DOMContentLoaded", showAllData(dateName,monthName,yearName,dayName))



addToDo.addEventListener("click", addToDoPage);

function addToDoPage(e) {
    e.preventDefault()
    fillingArea.style.display = "block";
    addToDo.style.display = "none";
}



// DATE PREV BUTTON
prevDate.addEventListener("click", async function () {
    dateName--;
    dayName--;
    if (dayName < 0) {
        dayName = 6;
    }
    if (dateName < 1) {
        if (monthName == 0) {
            monthName = 11;
            dateName = 31;
            yearName--
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
    innerYearContainer.innerText = yearName
    innerDateContainer.innerText = dateName;
    innerDayContainer.innerText = day[dayName];
    innerMonthYearContainer.innerText = month[monthName];
    showAllData(dateName,monthName,yearName,dayName)
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
    } else if (dateName > 30) {
        if (monthName == 3 || monthName == 5 || monthName == 8 || monthName == 10) {
            dateName = 1;
            monthName++
        }
    } else if (dateName == 28 || dateName == 29) {
        if (monthName == 1) {
            dateName = 1;
            monthName++
        }
    }
    innerDateContainer.innerText = dateName;
    innerDayContainer.innerText = day[dayName];
    innerMonthYearContainer.innerText = month[monthName]

    showAllData(dateName,monthName,yearName,dayName)
});

credit.addEventListener("click", function () {
    console.log("cliked")
    debit.style.backgroundColor = "rgb(206, 202, 202)";
    credit.style.backgroundColor = " rgba(12, 253, 253, 0.308)";
    toAddContainer.style.backgroundColor = "rgba(200, 245, 245, 0.712)";
    expAmount.style.backgroundColor = "rgba(200, 245, 245, 0.712)";
    expName.style.backgroundColor = "rgba(200, 245, 245, 0.712)";
    expDescr.style.backgroundColor = "rgba(200, 245, 245, 0.712)";
    okButton.classList.remove('debit');
    okButton.classList.add('credit');
})

debit.addEventListener("click", function () {
    console.log("debit")
    debit.style.backgroundColor = "rgba(12, 253, 253, 0.308)";
    credit.style.backgroundColor = "rgb(206, 202, 202)";
    toAddContainer.style.backgroundColor = "rgba(160, 243, 243, 0.712)";
    expAmount.style.backgroundColor = "rgba(160, 243, 243, 0.712)";
    expName.style.backgroundColor = "rgba(160, 243, 243, 0.712)";
    expDescr.style.backgroundColor = "rgba(160, 243, 243, 0.712)";
    okButton.classList.remove("credit");
    okButton.classList.add("debit")
})

okButton.addEventListener("click", addDebitCredit)

async function showAllData(dtNa,moNa,yeNa,daNa){
    innerDateContainer.innerText = dtNa;
    innerMonthYearContainer.innerText = month[moNa]
    innerYearContainer.innerText = yeNa;
    innerDayContainer.innerText = day[daNa]
    const token = localStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/expensePage/allExpense", { headers: { "authorization": token } });
    const result2 = await axios.get("http://localhost:3000/expense/allCredits", { headers: { "authorization": token } })
    let totalCredit = 0;
    incomeCreditContainer.innerHTML = "";
    incomeDebitContainer.innerHTML = "";
    if (result2.data.length) {
        plusIncomeCredit.style.display = "none";
        incomeCreditContainer.style.display = "block";
        for (let i = 0; i < result2.data.length; i++) {
            totalCredit = totalCredit + +result2.data[i].amount
            if(innerDateContainer.innerText == result2.data[i].createdDate && innerMonthYearContainer.innerText == month[result2.data[i].createdMonth] && innerYearContainer.innerText == result2.data[i].createdYear){
                if (i % 2 == 0) {
                    showOnGreenScreenC(result2.data[i].category, result2.data[i].amount, result2.data[i].id)
                } else {
                    showOnWhiteScreenC(result2.data[i].category, result2.data[i].amount, result2.data[i].id)
                }
            }
            countCredit++;
        }
    }
    if(incomeCreditContainer.innerHTML == ""){
        incomeCreditContainer.innerHTML = `<div class="mt-1 mb-1 text-center" style="font-size: larger;" id="plusIncomeCredit">Tap on "+" to add new item
        </div>`
    }
    amountCreditParaList.innerText = totalCredit;
    if (result.data.isPremium == true) {
        rzpBtn.style.display = "none";
        prem.style.display = "block"
        showLeaderboard()
    }
    let totalDebit = 0;
    if (result.data.result.length) {
        plusIncomeDebit.style.display = "none";
        incomeDebitContainer.style.display = "block";
        for (let i = 0; i < result.data.result.length; i++) {
            totalDebit = totalDebit + +result.data.result[i].amount
            if(innerDateContainer.innerText == result.data.result[i].createdDate && innerMonthYearContainer.innerText == month[result.data.result[i].createdMonth] && innerYearContainer.innerText == result.data.result[i].createdYear){
                if (i % 2 == 0) {
                    showOnGreenScreen(result.data.result[i].category, result.data.result[i].amount, result.data.result[i].id)
                } else {
                    showOnWhiteScreen(result.data.result[i].category, result.data.result[i].amount, result.data.result[i].id)
                }
            }
            count++;
        }
    }
    if(incomeDebitContainer.innerHTML ==''){
        incomeDebitContainer.innerHTML = `<div class="mt-1 mb-1 text-center" style="font-size: larger;" id="plusIncomeCredit">Tap on "+" to add new item
        </div>`
    }
    amountDebitParaList.innerText = totalDebit;
    totalAmount.innerText = amountCreditParaList.innerText - amountDebitParaList.innerText;

}

async function addDebitCredit(e){
    try {
        let totalAmountNumber = Number(totalAmount.innerText);
        let interedAmount = Number(expAmount.value);
        if (e.target.classList.contains("credit")) {
            const token = localStorage.getItem("token");
            const result = await axios.post("http://localhost:3000/expense/creditAmount", {
                category: expName.value,
                amount: interedAmount,
                description: expDescr.value,
                createdDate:dateName,
                createdMonth:monthName,
                createdYear:yearName
            }, { headers: { "Authorization": token } })
            let finalAmount = totalAmountNumber + interedAmount;
            totalAmount.innerText = finalAmount;
            let creditedAmount = Number(amountCreditParaList.innerText);
            const totalCreditedAmount = creditedAmount + interedAmount;
            amountCreditParaList.innerText = totalCreditedAmount;
            plusIncomeCredit.style.display = "none";
            incomeCreditContainer.style.display = "block";
            if (countCredit % 2 == 0) {
                showOnGreenScreenC(expName.value, expAmount.value, result.data.id)
            } else {
                showOnWhiteScreenC(expName.value, expAmount.value, result.data.id);
            }
        } else {
            const token = localStorage.getItem("token");
            const result = await axios.post("http://localhost:3000/expense/debitAmount", {
                category: expName.value,
                amount: expAmount.value,
                description: expDescr.value,
                createdDate:dateName,
                createdMonth:monthName,
                createdYear:yearName
            }, { headers: { "authorization": token } })
            let finalAmount = totalAmountNumber - result.data.amount;
            totalAmount.innerText = finalAmount;
            let debitedAmount = Number(amountDebitParaList.innerText);
            const totalDebitedAmount = debitedAmount + +result.data.amount;
            amountDebitParaList.innerText = totalDebitedAmount;
            plusIncomeDebit.style.display = "none";
            incomeDebitContainer.style.display = "block";
            if (count % 2 == 0) {
                showOnGreenScreen(expName.value, expAmount.value, result.data.id)
            } else {
                showOnWhiteScreen(expName.value, expAmount.value, result.data.id);
            }
        }
        expAmount.value = '';
        expName.value = '';
        expDescr.value = '';
        fillingArea.style.display = "none";
        addToDo.style.display = "block";
        count++;
    } catch (err) {
        console.log(err)
    }
}
function showOnGreenScreen(expName, expAmount, expId) {
    incomeDebitContainer.innerHTML += `<div id="${expId}" class="row" style = "width:100%; margin-left:2px; background-color:#d7ffd7;">
    <div class="col-auto mr-auto d-flex" style="font-size: larger; color: black;"> ${expName}</div>
    <div class="col-auto" style="font-size: larger; color: black;"> &#8377 ${expAmount}</div>
    <button onclick="deleteExpense('${expId}',${expAmount})"  style = "border: none; background-color: #baedba; border-radius: 10px;">DeleteEXpense</button>
</div>`
}
function showOnGreenScreenC(expName, expAmount, expId) {
    incomeCreditContainer.innerHTML += `<div id="${expId}" class="row" style = "width:100%; margin-left:2px; background-color:#d7ffd7;">
    <div class="col-auto mr-auto d-flex" style="font-size: larger; color: black;"> ${expName}</div>
    <div class="col-auto" style="font-size: larger; color: black;"> &#8377 ${expAmount}</div>
    <button onclick="deleteCredit('${expId}',${expAmount})"  style = "border: none; background-color: #baedba; border-radius: 10px;">DeleteEXpense</button>
</div>`
}
function showOnWhiteScreen(expName, expAmount, expId) {
    incomeDebitContainer.innerHTML += `<div id="${expId}" class="row" style = "width:100%; margin-left:2px; background-color: #e3e1e1;">
    <div class="col-auto mr-auto d-flex" style="font-size: larger; color: black;"> ${expName}</div>
    <div class="col-auto" style="font-size: larger; color: black;"> &#8377 ${expAmount}</div>
    <button onclick="deleteExpense('${expId}','${expAmount}')" style = "border: none; background-color: #d9d4d4; border-radius: 10px;">DeleteEXpense</button>
</div>`
}
function showOnWhiteScreenC(expName, expAmount, expId) {
    incomeCreditContainer.innerHTML += `<div id="${expId}" class="row" style = "width:100%; margin-left:2px; background-color: #e3e1e1;">
    <div class="col-auto mr-auto d-flex" style="font-size: larger; color: black;"> ${expName}</div>
    <div class="col-auto" style="font-size: larger; color: black;"> &#8377 ${expAmount}</div>
    <button onclick="deleteCredit('${expId}','${expAmount}')" style = "border: none; background-color: #d9d4d4; border-radius: 10px;">DeleteEXpense</button>
</div>`
}

async function deleteExpense(expId, expAmount) {
    try {
        const token = localStorage.getItem("token")
        await axios.delete(`http://localhost:3000/expense/${expId}`, { headers: { "authorization": token } });
        let deletedDebitAmount = Number(amountDebitParaList.innerText) - Number(expAmount);
        amountDebitParaList.innerText = deletedDebitAmount;
        totalAmount.innerText = Number(totalAmount.innerText) + Number(expAmount)
        let childNode = document.getElementById(expId);
        incomeDebitContainer.removeChild(childNode)
        if(incomeDebitContainer.innerHTML == ""){
            plusIncomeDebit.style.display = "block"
        }
    } catch (err) {
        console.log(err.response.data)
        document.write(err.response.data)
    }
}

async function deleteCredit(expId, expAmount) {
    try {
        const token = localStorage.getItem("token")
        await axios.delete(`http://localhost:3000/credit/${expId}`, { headers: { "authorization": token } });
        let deletedCreditAmount = Number(amountCreditParaList.innerText) - Number(expAmount);
        amountCreditParaList.innerText = deletedCreditAmount;
        totalAmount.innerText = Number(totalAmount.innerText) - Number(expAmount)
        let childNode = document.getElementById(expId);
        incomeCreditContainer.removeChild(childNode)
        if(incomeCreditContainer.innerHTML == ""){
            plusIncomeCredit.style.display = "block"
        }
    } catch (err) {
        console.log(err.response.data)
        document.write(err.response.data)
    }
}


rzpBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    const token = localStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/premiummembership", { headers: { "authorization": token } });

    let option = {
        "key": result.data.key_id,
        "order_id": result.data.order.id,
        "handler": async function (result) {
            await axios.post("http://localhost:3000/updateTransactionStatus", {
                order_id: option.order_id,
                payment_id: result.razorpay_payment_id
            }, {
                headers: { "Authorization": token }
            });
            alert("You are a Premium Member Now!")
            rzpBtn.style.display = "none";
            prem.style.display = "block"
        }
    }
    const rzp1 = new Razorpay(option);
    rzp1.open();
    showLeaderboard()

    rzp1.on("payment.failed", async function (response) {
        await axios.post("http://localhost:3000/updateFailureTransactionStatus", {
            order_id: option.order_id
        }, {
            headers: { "Authorization": token }
        })
        alert(response.error.description)
    })
})

function showLeaderboard() {
    let inputElement = document.createElement("input");
    inputElement.type = "button";
    inputElement.value = "Show Leaderboard"
    inputElement.innerText = "Show Leaderboard"
    inputElement.classList.add("btn", "btn-outline-warning", "my-2", "my-sm-0");
    prem.appendChild(inputElement);
    rzpBtn.style.display = "none";
    prem.style.display = "block";
    inputElement.onclick = async function (e) {
        e.preventDefault()
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:3000/premium/getLeaderboard", {
            headers: { "Authorization": token }
        });
        leaderboardList.style.display = "block";
        let leaderboardCount = 1
        console.log(result)
        for (let i = 0; i < result.data.length; i++) {
            tBody.innerHTML += `
              <tr>
                <td>${leaderboardCount}</td>
                <td>${result.data[i].name}</td>
                <td>${result.data[i].totalExpense}</td>
              </tr>`
            leaderboardCount++
        }
        inputElement.disabled = true;
    }
}