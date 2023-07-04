const logIn = document.getElementById("login");
const email = document.getElementById("logInEmail");
const password = document.getElementById("logInPassword");
const forgotPasswordButton = document.getElementById("forgotPasswordButton");
const forgotPasswordForm = document.getElementById("forgotPassword");
const forgotPasswordEmail = document.getElementById("forgotPasswordEmail");
const forgotPasswordSubmit = document.getElementById("forgotPasswordSubmit");
const loginForm = document.getElementById("logInForm");
const signInPage = document.getElementById("signUpHelp");
const forgotPasswordHelp = document.getElementById("forgotPasswordHelp");

logIn.addEventListener("click", async function (e) {
    e.preventDefault()
    try {
        const userDetails = {
            emailId: email.value,
            password: password.value
        }
        const result = await axios.post("http://localhost:3000/logIn", userDetails);
        localStorage.setItem("token", result.data.token);
        window.location.href = "/expensePage";
    } catch (err) {
        document.write(err.response.data)
    }
})

forgotPasswordButton.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.style.display = "none";
    signInPage.style.display = "none";
    forgotPasswordHelp.style.display = "none";
    forgotPasswordForm.style.display = "block";
})

forgotPasswordSubmit.addEventListener("click", async function (e) {
    try {
        e.preventDefault()
        if (!forgotPasswordEmail.value) {
            return document.write(`<h1>Email Field is Mandatory!!`)
        }
        const result = await axios.post("http://localhost:3000/password/forgotpassword", { email: forgotPasswordEmail.value });
        console.log(result.data.verification)
        if (result.data.verification == true) {
            forgotPasswordForm.style.display = "none"
            const childElement = `<form>
           <div class="form-group row">
             <label for="staticEmail" class="col-sm-2 col-form-label">Email :</label>
             <div class="col-sm-10">
               <input type="text" readonly class="form-control-plaintext" id="staticEmail" value=${forgotPasswordEmail.value}>
             </div>
           </div>
           <div class="form-group row">
             <label for="verificationCode" class="col-sm-2 col-form-label">Verification Code:</label>
             <div class="col-sm-10">
               <input type="number" class="form-control" id="verificationCode" placeholder="verificationCode">
             </div>
           </div>
           <div id = "warning"></div>
           <button class="btn btn-primary mb-2" style="margin-left: 12rem" onclick="verifyPassword(event)">Verify</button>
   
         </form>`
            const pverification = document.getElementById("pVerification");
            pverification.innerHTML += childElement
            pverification.style.display = "block";
        } else {
            document.write("User Not Found")
        }
    } catch (err) {
        document.write("Something Went Wrong!!")
    }

})

async function verifyPassword(e) {
    try {
        e.preventDefault()
        const verificationCode = document.getElementById("verificationCode").value;
        const staticEmail = document.getElementById("staticEmail").value;
        const result = await axios.post("http://localhost:3000/password/verifyPassword", { email: staticEmail, vCode: verificationCode })

        if (result.data.verification == true) {
            const pverification = document.getElementById("pVerification");
            const cverification = document.getElementById("cVerification");
            pverification.style.display = "none";
            const childElement = `<form>
            <div class="form-group">
              <label for="confirmPassword1">Enter new Password</label>
              <input type="password" class="form-control" id="confirmPassword1" placeholder="New Password">
            </div>
            <div class="form-group">
              <label for="confirmPassword2">Confirm Password</label>
              <input type="text" class="form-control" id="confirmPassword2" placeholder="Reinter password">
            </div>
            <button class="btn btn-primary mb-2" style = "margin-left:12rem" onclick="submitNewPassword(event,'${staticEmail}')">Submit</button>
          </form>`
            cverification.innerHTML += childElement
            cverification.style.display = "block";
        } else if (result.data.verification == false) {
            const warning = document.getElementById("warning");
            warning.style.color = "red"
            warning.innerText = "Wrong Code!!";
            setTimeout(() => {
                warning.style.display = "none"
            }, 3000);
        } else {
            const warning = document.getElementById("warning");
            warning.style.color = "red"
            warning.innerText = result.data.verification
            setTimeout(() => {
                warning.style.display = "none"
            }, 3000);

        }
    } catch (err) {
        document.write("Something Went Wrong!!")
    }
}

async function submitNewPassword(e, staticEmail) {
    try {
        e.preventDefault();
        const confirmPassword1 = document.getElementById("confirmPassword1");
        const confirmPassword2 = document.getElementById("confirmPassword2");
        if (confirmPassword1.value != confirmPassword2.value) {
            document.getElementById("warning").innerText = "Password Doesn't match!"
        } else {
            const result = await axios.post("http://localhost:3000/password/updatePassword", { password: confirmPassword1.value, email: staticEmail });
            console.log(result)
            document.write(result.data)
            setTimeout(() => {
                window.location.href = "/logIn";
            }, 2000);
        }
    } catch (err) {
        document.write("Something Went Wrong!!")
    }
}