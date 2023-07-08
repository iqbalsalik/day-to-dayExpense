const rzpBtn = document.getElementById("rzp-button")
const prem = document.getElementById("prem");
const prevBtn = document.getElementById("prevBtnYearly");
const nextBtn = document.getElementById("nextBtnYearly");
const yearContainer = document.getElementById("yearlyContiner");
const dataTable = document.getElementById("yearlyDataTable");

const yearlyMonth = {
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

const yearlyDate = new Date()
let yearNameYearlyHtml = yearlyDate.getFullYear()

window.addEventListener("DOMContentLoaded",async function(){
    yearContainer.innerText = yearNameYearlyHtml
    showyearlyData()  
})

nextBtn.addEventListener("click",function(){
yearNameYearlyHtml++;
yearContainer.innerText = yearNameYearlyHtml;
showyearlyData()
});

prevBtn.addEventListener("click",function(){
    yearNameYearlyHtml--;
    yearContainer.innerText = yearNameYearlyHtml;
    showyearlyData()
})

async function showyearlyData (){
    dataTable.innerHTML = "";
    const token = localStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/expensePage/allMonthlyExpense",{headers:{"authorization":token}});
    if(result.data.isPremium ==true){
     rzpBtn.style.display = "none";
    }
    let totalCredit = 0;
    let totalDebit = 0;
    let i =0;
    let j = 0;
    while(i<result.data.result.expense_credits.length || j<result.data.result.expense_debits.length){
        if(result.data.result.expense_credits[i]){
        if(result.data.result.expense_credits[i].createdYear==yearContainer.innerText){
                totalCredit+=result.data.result.expense_credits[i].amount
                dataTable.innerHTML+= ` <tr style =background-color: #e3e1e1;">
                <th scope="row">${yearlyMonth[result.data.result.expense_credits[i].createdMonth]}</th>
                <td>${result.data.result.expense_credits[i].category}</td>
                <td>${result.data.result.expense_credits[i].amount}</td>
                <td></td>
                <td></td>
              </tr>`
            }
        }
        if(result.data.result.expense_debits[i]){
        if(result.data.result.expense_debits[i].createdYear ==yearContainer.innerText){
                totalDebit+=result.data.result.expense_debits[i].amount
                dataTable.innerHTML+= ` <tr style = background-color:#d7ffd7;">
                <th scope="row">${yearlyMonth[result.data.result.expense_debits[i].createdMonth]}</th>
                <td>${result.data.result.expense_debits[i].category}</td>
                <td></td>
                <td>${result.data.result.expense_debits[i].amount}</td>
                <td></td>
              </tr>`
            }
        }
        i++;
        j++;
    }
    const Balance = totalCredit-totalDebit;
    dataTable.innerHTML+= ` <tr style =  background-color:#c9d970;;">
    <th scope="row"></th>
    <td  style="font-size: larger; font-weight: bolder;">Total</td>
    <td style="font-size: larger; font-weight: bolder; color: green;">&#8377 ${totalCredit}</td>
    <td id="monthlyTableExpense" style="font-size: larger; font-weight: bolder; color: red;">&#8377 ${totalDebit}</td>
    <td style="font-size: larger; font-weight: bolder;">${Balance}</td>
  </tr>`
    if(result.data.isPremium ==true){
     rzpBtn.style.display = "none";
    }
}