const prevDateMonthlyHtml = document.getElementById("prevDate");
const innerMonthContainer = document.getElementById("innerMonthContainerMonthlyHtml");
const innerYearContainerMonthlyHtml = document.getElementById("innerYearContainerMonthlyHtml");
const monthlyTable = document.getElementById("monthlyTableBody");
const totalCreditedAmount = document.getElementById("monthlyHtmlTotalIncomeCredit");
const totalDebitedAmount = document.getElementById("monthlyHtmlTotalIncomeDebit");
const monthlyBalanceLeft = document.getElementById("monthlyHtmlBalanceLeft");
const btnContainer = document.getElementById("monthlyDownloadBtnContainer");
const downloadList = document.getElementById("listOfDownloadedFiles");
const downloadListContainer = document.getElementById("prevRecords")
const premMonth = document.getElementById("premMonth");


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

    if(result.data.result.isPremium ==true){
     premMonth.innerHTML= `<button class="btn  mt-1 "
     style=" height: 45px; border-radius: 25px; background-color:#ffc107 " onclick ="showPrevDownloads(event)">Show Downloads</button>`;
     premMonth.style.display = "block"
     btnContainer.innerHTML = `<div class="col-12">
     <button class="btn  mt-5 float-right"
         style="background-color:rgb(1, 150, 150); height: 45px; border-radius: 25px; margin-left: 30em;" onclick ="downloadMonthlyData(event)"> <i class="bi bi-filetype-pdf" style="font-size: 1.3em;"></i>
     </button>
 </div>`
    }
    totalCreditedAmount.innerText = totalCredit;
    totalDebitedAmount.innerText = totalDebit;
    monthlyBalanceLeft.innerText = Balance;
}


async function downloadMonthlyData (e){
    e.preventDefault()
    try{
        const token = localStorage.getItem("token");
        const result =  await axios.get("http://localhost:3000/expensePage/download",{headers:{"authorization":token}});
        if(result.data.response=="Success"){
            const a = document.createElement("a");
            a.href = result.data.fileUrl;
            // a.download = "myExpense.csv"
            a.click();
        }else{
            throw new Error(result.data.response)
        }
    }catch(err){
        throw new Error(result.data.response)
    }
}

async function showPrevDownloads(e){
    e.preventDefault()
try{
    downloadList.innerHTML = "";
    downloadListContainer.style.display = "block"
    const token = localStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/expensePage/showDownloads",{headers:{"authorization":token}});
    for(let i =0;i<result.data.records.length;i++){
        downloadList.innerHTML+= `<tr style =  background-color:#c9d970;;">
        <td scope="row">${i+1}</td>
        <td>${result.data.records[i].date}</td>
        <td> <a href="${result.data.records[i].fileUrl}">Download Again</a></td>
      </tr>`
    }

}catch(err){
    document.write(err)
}
}