require("dotenv").config()
const nodemailer = require('nodemailer');



const path = require("path");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const Users = require("../models/signupModel");
const ForgotPass = require("../models/forgotPassword");

function generateToken(id, name) {
    return jwt.sign({ userId: id, name: name }, process.env.SECRET_TOKEN_KEY);
}

const generateVerificationCode = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


exports.getLogInPage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"))
};

exports.postLogInUser = async (req, res) => {
    try {
        let emailId = req.body.emailId;
        let password = req.body.password;
        let allUserEmail = await Users.findAll();
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
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await Users.findOne({
            where: {
                emailId:email
            }
        })
        if (user) {
            const transporter = nodemailer.createTransport({
                host: 'smtp-relay.brevo.com',
                port: 587,
                auth: {
                    user: process.env.SMTP_UNAME,
                    pass: process.env.API_KEY
                }
            });

            const vCode = generateVerificationCode()

            const mailOptions = {
                from: `Salik Iqbal <sisalik84@gmail.com>`,
                to: req.body.email,
                subject: 'Forgot Password',
                text: 'This is Your six digit verification code!',
                html: `<h3><p>Your six digit verification code</p></h3> <br> <h1>${vCode}</h1>`
            };

            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(400).json('Error occurred while sending email.');
                } else {
                    const user = await ForgotPass.findOne({
                        where: {
                            email: req.body.email
                        }
                    })
                    if (user) {
                        await user.update({
                            vCode: vCode
                        })
                    } else {
                        await ForgotPass.create({
                            email: req.body.email,
                            vCode: vCode
                        })
                    }
                    res.status(200).json({ message: 'Email sent successfully!', verification:true });
                }
            });
        }else{
            res.json({message:"User Not Found!",verification:false})
        }
    } catch (err) {
        console.log(err)
    }
}

exports.verifyCode = async (req, res) => {
    try {
        const { email, vCode } = req.body;
        const user = await ForgotPass.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            if (user.vCode == vCode) {
                console.log("yes")
                res.status(200).json({ verification: true })
            } else {
                console.log("no")
                res.json({ verification: false })
            }
        } else {
            res.status(404).json({ verification: "User Not Found!!" })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}


exports.updatePassword = async (req, res) => {
    try{
        const { email, password } = req.body;
        console.log(email)
        const user = await Users.findOne({
            where: {
                emailId: email
            }
        });
        if (user) {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    res.status(401).json("Something Went Wrong!")
                }
                await user.update({
                    password: hash
                });
                return res.status(200).json("password changed successfully!!")
            })
        } else {
            res.status(404).json("User Not Found!!")
        }
    } catch(err){
        res.status(400).json(err)
    }
}