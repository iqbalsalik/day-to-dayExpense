require("dotenv").config()
const nodemailer = require('nodemailer');
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const path = require("path");


const Users = require("../models/signupModel");
const forgotPassword = require("../models/forgotPasswordReques");


const RecordService = require("../Services/recordServices");

function generateToken(id, name) {
    return jwt.sign({ userId: id, name: name }, process.env.SECRET_TOKEN_KEY);
}

exports.getLogInPage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"))
};

exports.postLogInUser = async (req, res) => {
    try {
        let emailId = req.body.emailId;
        let password = req.body.password;
        let allUserEmail = await RecordService.findAllUsers()
        console.log(allUserEmail)
        let emailCheck = false;
        Array.from(allUserEmail).forEach(user => {
            if (user.emailId === emailId) {
                emailCheck = true;
                bcrypt.compare(password, user.password, (err, isMatched) => {
                    if (isMatched) {
                        res.status(200).json({ message: "succesfully LogedIn", token: generateToken(user.id, user.name) })
                    } else {
                        res.status(401).json("Wrong Password!")
                    }
                })
            }
        })
        if (!emailCheck) {
            res.status(404).json("User Not Found!!")
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        
        const user = await RecordService.findUserByEmail(req);
        if (user) {
            const id = uuid.v4()

            await user.createForgotPassword({
                id,
                isActive: true
            })

            const transporter = nodemailer.createTransport({
                host: 'smtp-relay.brevo.com',
                port: 587,
                auth: {
                    user: process.env.SMTP_UNAME,
                    pass: process.env.API_KEY
                }
            });

            const mailOptions = {
                from: `Salik Iqbal <sisalik84@gmail.com>`,
                to: req.body.email,
                subject: 'Forgot Password',
                text: 'Link to reset Password!',
                html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`
            };

            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error)
                    res.status(400).json('Error occurred while sending email.');
                } else {
                    res.status(200).json({ message: 'Email sent successfully!', verification: true });
                }
            });
        } else {
            res.json({ message: "User Not Found!", verification: false })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json("Something Went Wrong!")
    }
}

exports.verifyCode = async (req, res) => {
    try {
        const request = await forgotPassword.findByPk(req.params.id);
        if (request.isActive) {
            await request.update({ isActive: false });
            res.send(`<!doctype html>
            <html lang="en">
            
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                <title>Day-To-Day Expenses</title>
            </head>
            
            <body>
                   <div class="container" id="cVerification" style="max-width: 19rem; min-height:15rem; margin-top: 6rem; border-radius: 15px; background-color:  rgb(143 221 221);">
                    <div id="warning"></div>
                    <form>
                        <div class="form-group">
                          <label for="confirmPassword1">Enter new Password</label>
                          <input type="password" class="form-control" id="confirmPassword1" placeholder="New Password">
                        </div>
                        <div class="form-group">
                          <label for="confirmPassword2">Confirm Password</label>
                          <input type="text" class="form-control" id="confirmPassword2" placeholder="Reinter password">
                        </div>
                        <button class="btn btn-primary mb-2" style = "margin-left:6rem" onclick="preventD(event)">Submit</button>
                      </form>
                </div>
                
            
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                    integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                    crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
                    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                    crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
                    integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                    crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                    <script>
                    async function preventD(e){
                        e.preventDefault();
                        try {
                            const confirmPassword1 = document.getElementById("confirmPassword1");
                            const confirmPassword2 = document.getElementById("confirmPassword2");
                            if (confirmPassword1.value != confirmPassword2.value) {
                                document.getElementById("warning").innerText = "Password Doesn't match!"
                                setTimeout(() => {
                                    document.getElementById("warning").innerText = ""
                                }, 3000);
                            }else if(confirmPassword1.value =='' || confirmPassword2.value ==''){
                                document.getElementById("warning").innerText = "Every field is mandatory"
                                setTimeout(() => {
                                    document.getElementById("warning").innerText = ""
                                }, 3000);
                            } else {
                                const password = confirmPassword1.value;
                                const result = await axios.post("http://localhost:3000/password/updatePassword/${req.params.id}",{password:password});
                                alert("Password Successfully Changed!")
                                window.location.href = "/logIn";
                            }
                        } catch (err) {
                            document.write("Something Went Wrong!!")
                        }
                    }
                    </script>
                    
            </body>
            
            </html>`
            )
        } else {
            res.status(401).send(`<html>
            <h2 style = "color:red;">"Expired Link..Please regenerate the link!!"</h2>
            </html>`)
        }
    } catch (err) {
        res.status(400).json(err)
    }
}


exports.updatePassword = async (req, res) => {

    try {
        const resetpasswordid = req.params.resetpasswordid;
        const password = req.body.password;
        const resetpasswordrequest = await forgotPassword.findOne({ where: { id: resetpasswordid } })
        const user = await Users.findOne({ where: { id: resetpasswordrequest.userId } })
        if (user) {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(401).json("Something Went Wrong!")
                }
                await user.update({
                    password: hash
                });
                return res.status(200).json("password changed successfully!!")
            })
        } else {
            res.status(404).json("User Not Found!!")
        }
    } catch (error) {
        return res.status(403).json({ error, success: false })
    }
}