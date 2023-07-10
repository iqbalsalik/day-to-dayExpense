const rzpBtnYearly = document.getElementById("rzp-buttonYearly")
const prem = document.getElementById("prem");
const prevBtn = document.getElementById("prevBtnYearly");
const nextBtn = document.getElementById("nextBtnYearly");
const yearContainer = document.getElementById("yearlyContiner");
const dataTable = document.getElementById("yearlyDataTable");
const yearlyBtnContainer = document.getElementById('yearlyDownloadBtnContainer');
const downloadListYearly = document.getElementById("listOfDownloadedFilesYearly");
const downloadListContainerYearly = document.getElementById("prevRecordsYearly")
const prevNextBtnContainerYearly = document.getElementById("prevNextBtnYearly")

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

async function showyearlyData (page){
    page = page || 1
    dataTable.innerHTML = "";
    const token = localStorage.getItem("token");
    const result = await axios.get(`http://localhost:3000/expensePage/allMonthlyExpense?page=${page}`,{headers:{"authorization":token}});
    // if(result.data.isPremium ==true){
    //  rzpBtnYearly.style.display = "none";
    // }
    let i =0;
    let j = 0;
    while(i<2 || j<2){
        if(result.data.resultC[i]){
        if(result.data.resultC[i].createdYear==yearContainer.innerText){
                dataTable.innerHTML+= ` <tr style =background-color: #e3e1e1;">
                <th scope="row">${yearlyMonth[result.data.resultC[i].createdMonth]}</th>
                <td>${result.data.resultC[i].category}</td>
                <td>${result.data.resultC[i].amount}</td>
                <td></td>
                <td></td>
              </tr>`
            }
        }
        if(result.data.resultD[i]){
        if(result.data.resultD[i].createdYear ==yearContainer.innerText){
                dataTable.innerHTML+= ` <tr style = background-color:#d7ffd7;">
                <th scope="row">${yearlyMonth[result.data.resultD[i].createdMonth]}</th>
                <td>${result.data.resultD[i].category}</td>
                <td></td>
                <td>${result.data.resultD[i].amount}</td>
                <td></td>
              </tr>`
            }
        }
        i++;
        j++;
    }
    const Balance = result.data.totalCredit-result.data.totalExpense;
    dataTable.innerHTML+= ` <tr style =  background-color:#c9d970;;">
    <th scope="row"></th>
    <td  style="font-size: larger; font-weight: bolder;">Total</td>
    <td style="font-size: larger; font-weight: bolder; color: green;">&#8377 ${result.data.totalCredit}</td>
    <td id="monthlyTableExpense" style="font-size: larger; font-weight: bolder; color: red;">&#8377 ${result.data.totalExpense}</td>
    <td style="font-size: larger; font-weight: bolder;">${Balance}</td>
  </tr>`

    if(result.data.isPremium ==true){        
     prem.innerHTML= `<button class="btn  mt-1 "
     style=" height: 45px; border-radius: 25px; background-color:#ffc107 " onclick ="showPrevDownloadsYearly(event)">Show Downloads</button>`;
     prem.style.display = "block"
     yearlyBtnContainer.innerHTML = `<div class="col-12">
     <button class="btn  mt-5 float-right" style="background-color:rgb(1, 150, 150); height: 45px; border-radius: 25px; margin-left: 30em;" onclick = "downloadYearlyData(event)"><i class="bi bi-filetype-pdf" style="font-size: 1.3em;"></i>
     </button>
 </div>`
    }

    if(!result.data.isPrevPage){
        prevNextBtnContainerYearly.innerHTML = `<div class="row">
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div class="content">
              <button class="btn btn-sm bg-info" onclick =showyearlyData()  style="display: inline;" disabled>prev</button>
              <button class="btn btn-sm bg-info" onclick =showyearlyData(${result.data.nextPage}) style="display: inline;">next</button>
          </div>
        </div>
      </div>`
    }else if(!result.data.isNextPage){
        prevNextBtnContainerYearly.innerHTML = `<div class="row">
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div class="content">
              <button class="btn btn-sm bg-info" onclick =showyearlyData(${result.data.prevPage})  style="display: inline;" >prev</button>
              <button class="btn btn-sm bg-info" onclick =showyearlyData() style="display: inline;" disabled>next</button>
          </div>
        </div>
      </div>`
    }else{
        prevNextBtnContainerYearly.innerHTML = `<div class="row">
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div class="content">
              <button class="btn btn-sm bg-info" onclick =showyearlyData(${result.data.prevPage})  style="display: inline;" >prev</button>
              <button class="btn btn-sm bg-info" onclick =showyearlyData(${result.data.nextPage}) style="display: inline;">next</button>
          </div>
        </div>
      </div>`
    }
}

async function showPrevDownloadsYearly(e){
    e.preventDefault()
try{
    downloadListYearly.innerHTML = "";
    downloadListContainerYearly.style.display = "block"
    const token = localStorage.getItem("token");
    const result = await axios.get("http://localhost:3000/expensePage/showDownloads",{headers:{"authorization":token}});
    for(let i =0;i<result.data.records.length;i++){
        downloadListYearly.innerHTML+= `<tr style =  background-color:#c9d970;;">
        <td scope="row">${i+1}</td>
        <td>${result.data.records[i].date}</td>
        <td> <a href="${result.data.records[i].fileUrl}">Download Again</a></td>
      </tr>`
    }

}catch(err){
    document.write(err)
}
}

async function downloadYearlyData (e){
    e.preventDefault()
  try{
      const token = localStorage.getItem("token");
      const result =  await axios.get("http://localhost:3000/expensePage/download",{headers:{"authorization":token}});
      if(result.data.response=="Success"){
          const a = document.createElement("a");
          a.href = result.data.fileUrl;
          a.click();
      }else{
          throw new Error(result.data.response)
      }
  }catch(err){
      throw new Error(result.data.response)
  }
}