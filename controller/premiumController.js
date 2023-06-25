const User = require("../models/signupModel");

// exports.getLeaderboard = async (req, res) => {
//   const user = await User.findAll({
//     attributes:["id","name",[sequelize.fn("sum",sequelize.col("amount")),"totalCost"]],
//     include:[
//       {
//         model:Expense,
//         attributes:[]
//       }
//     ],
//     group:["users.id"],
//     order:[["totalCost","DESC"]]
//   })
//   res.status(200).json(user)
// }

exports.getLeaderboard = async (req, res) => {
  const user = await User.findAll({
    attributes:["id","name","totalExpense"],
    order:[["totalExpense","DESC"]]
  })
  res.status(200).json(user)
}