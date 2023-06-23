const User = require("../models/signupModel");
const Expense = require("../models/expenseDebit")

exports.getLeaderboard = async(req,res)=>{
const expenseList = await Expense.findAll();
const leaderboardList = [];
for(let i =0;i<expenseList.length;i++){
const user = await User.findByPk(expenseList[i].userId);
leaderboardList.push({name:user.name,amount:expenseList[i].amount})
}
  
    for (let i = 0; i < leaderboardList.length - 1; i++) {
      // Last i elements are already in place, so we can reduce the inner loop iterations
      for (let j = 0; j < leaderboardList.length - i - 1; j++) {
        // Compare adjacent elements and swap them if they are in the wrong order
        if (leaderboardList[j].amount < leaderboardList[j + 1].amount) {
          [leaderboardList[j], leaderboardList[j + 1]] = [leaderboardList[j + 1], leaderboardList[j]];
        }
      }
    }
res.status(200).json(leaderboardList)
}