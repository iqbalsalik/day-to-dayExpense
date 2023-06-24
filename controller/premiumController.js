const User = require("../models/signupModel");
const Expense = require("../models/expenseDebit")

exports.getLeaderboard = async (req, res) => {
  const expenseList = await Expense.findAll();
  const leaderboardList = [];
  const myMap = new Map();
  for (let i = 0; i < expenseList.length; i++) {
    if (myMap.has(expenseList[i].userId)) {
      myMap.set(expenseList[i].userId, myMap.get(expenseList[i].userId) + expenseList[i].amount);

    }else{
      myMap.set(expenseList[i].userId,expenseList[i].amount);
    }
  }
  for(let [key,value] of myMap){
    const user = await User.findByPk(key);
    leaderboardList.push({name:user.name,amount:value});
  }
 leaderboardList.sort((a,b)=> b.amount-a.amount);
  res.status(200).json(leaderboardList)
}