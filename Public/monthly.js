const prevDateMonthlyHtml = document.getElementById("prevDate");
const innerMonthContainer = document.getElementById("innerMonthContainerMonthlyHtml");
const innerYearContainerMonthlyHtml = document.getElementById("innerYearContainerMonthlyHtml");
const monthlyTable = document.getElementById("monthlyTableBody");
const totalCreditedAmount = document.getElementById("monthlyHtmlTotalIncomeCredit");
const totalDebitedAmount = document.getElementById("monthlyHtmlTotalIncomeDebit");
const monthlyBalanceLeft = document.getElementById("monthlyHtmlBalanceLeft");


const monthMonthlyHtml = {
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

const dateMonthlyHtml = new Date();

window.addEventListener("DOMContentLoaded",async function(){
    innerMonthContainer.innerText = monthMonthlyHtml[dateMonthlyHtml.getMonth()]
    innerYearContainerMonthlyHtml.innerText = dateMonthlyHtml.getFullYear();
    document.getElementById("date").innerText = dateMonthlyHtml.getDate();
    document.getElementById("month").innerText = monthMonthlyHtml[dateMonthlyHtml.getMonth()];
    document.getElementById("year").innerText = dateMonthlyHtml.getFullYear()

   showAllMonthlyData();
})



let monthNameMonthlyHtml = dateMonthlyHtml.getMonth();
let yearNameMonthlyHtml = dateMonthlyHtml.getFullYear();

// DATE PREV BUTTON
prevDateMonthlyHtml.addEventListener("click", function (e) {
    e.preventDefault()
    monthNameMonthlyHtml--;
    if(monthNameMonthlyHtml<0){
        monthNameMonthlyHtml = 11;
        yearNameMonthlyHtml--
        innerYearContainerMonthlyHtml.innerText = yearNameMonthlyHtml;
    }
    innerMonthContainer.innerText = monthMonthlyHtml[monthNameMonthlyHtml];

    showAllMonthlyData()
})

//DATE NEXT BUTTON
nextDate.addEventListener("click",function(e){
    e.preventDefault();
    monthNameMonthlyHtml++;
    if(monthNameMonthlyHtml>11){
        monthNameMonthlyHtml = 0;
        yearNameMonthlyHtml++;
        innerYearContainerMonthlyHtml.innerText = yearNameMonthlyHtml
    }
    innerMonthContainer.innerText = monthMonthlyHtml[monthNameMonthlyHtml];
    showAllMonthlyData()
})

async function showAllMonthlyData(){
    monthlyTable.innerHTML = ""
    const token = localStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/expensePage/allMonthlyExpense",{headers:{"authorization":token}});
    console.log(result)
    let totalCredit = 0;
    let totalDebit = 0;
    let i =0;
    let j = 0;
    while(i<result.data.result.expense_credits.length || j<result.data.result.expense_debits.length){
        if(result.data.result.expense_credits[i]){
        if(month[result.data.result.expense_credits[i].createdMonth]==innerMonthContainer.innerText && result.data.result.expense_credits[i].createdYear ==innerYearContainerMonthlyHtml.innerText){
                totalCredit+=result.data.result.expense_credits[i].amount
                monthlyTable.innerHTML+= ` <tr style =background-color: #e3e1e1;">
                <th scope="row">${result.data.result.expense_credits[i].createdDate}-${monthMonthlyHtml[result.data.result.expense_credits[i].createdMonth]}-${result.data.result.expense_credits[i].createdYear}</th>
                <td>${result.data.result.expense_credits[i].description}</td>
                <td>${result.data.result.expense_credits[i].category}</td>
                <td>${result.data.result.expense_credits[i].amount}</td>
                <td></td>
              </tr>`
            }
        }
        if(result.data.result.expense_debits[i]){
        if(month[result.data.result.expense_debits[i].createdMonth]==innerMonthContainer.innerText && result.data.result.expense_debits[i].createdYear ==innerYearContainerMonthlyHtml.innerText){
                totalDebit+=result.data.result.expense_debits[i].amount
                monthlyTable.innerHTML+= ` <tr style = background-color:#d7ffd7;">
                <th scope="row">${result.data.result.expense_debits[i].createdDate}-${monthMonthlyHtml[result.data.result.expense_debits[i].createdMonth]}-${result.data.result.expense_debits[i].createdYear}</th>
                <td>${result.data.result.expense_debits[i].description}</td>
                <td>${result.data.result.expense_debits[i].category}</td>
                <td></td>
                <td>${result.data.result.expense_debits[i].amount}</td>
              </tr>`
            }
        }
        i++;
        j++;
    }
    const Balance = totalCredit-totalDebit;
    monthlyTable.innerHTML+= ` <tr style =  background-color:#c9d970;;">
    <th scope="row"></th>
    <td style="font-size: larger; font-weight: bolder;">Total</td>
    <td></td>
    <td style="font-size: larger; font-weight: bolder; color: green;">&#8377 ${totalCredit}</td>
    <td style="font-size: larger; font-weight: bolder; color: red;">&#8377 ${totalDebit}</td>
  </tr>`
    if(result.data.isPremium ==true){
     rzpBtn.style.display = "none";
    }
    totalCreditedAmount.innerText = totalCredit;
    totalDebitedAmount.innerText = totalDebit;
    monthlyBalanceLeft.innerText = Balance;
}