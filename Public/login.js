const logIn = document.getElementById("login");
const email = document.getElementById("logInEmail");
const password = document.getElementById("logInPassword");
const forgotPasswordButton = document.getElementById("forgotPasswordButton");
const forgotPasswordForm  = document.getElementById("forgotPassword");
const forgotPasswordEmail = document.getElementById("forgotPasswordEmail");
const forgotPasswordSubmit = document.getElementById("forgotPasswordSubmit");
const loginForm = document.getElementById("logInForm");
const signInPage = document.getElementById("signUpHelp");
const forgotPasswordHelp = document.getElementById("forgotPasswordHelp");

logIn.addEventListener("click",async function(e){
    e.preventDefault()
    try{
        const userDetails = {
            emailId:email.value,
            password:password.value
        }
        const result = await axios.post("http://localhost:3000/logIn",userDetails);
        localStorage.setItem("token",result.data.token);
        window.location.href = "/expensePage";
    } catch (err){
        document.write(err.response.data)
    }  
})

forgotPasswordButton.addEventListener("click", function(e){
    e.preventDefault();
    loginForm.style.display = "none";
    signInPage.style.display = "none";
    forgotPasswordHelp.style.display = "none";
    forgotPasswordForm.style.display = "block";
})

forgotPasswordSubmit.addEventListener("click",async function(e){
    try{
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(!forgotPasswordEmail.value){
            return document.write(`<h1>Email Field is Mandatory!!`)
        }
        const result = await axios.post("http://localhost:3000/password/forgotpassword",{email:forgotPasswordEmail.value},{headers:{"authorization":token}})
    } catch(err){
        console.log(err)
    }
   
})