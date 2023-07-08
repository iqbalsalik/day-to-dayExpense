const path = require("path");

exports.todoNavigation = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","to-do.html"));
};

exports.dailyNavigation = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","daily.html"));
};

exports.monthlyNavigation = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","monthly.html"))
};

exports.yearlyNavigation = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","yearly.html"));
};

