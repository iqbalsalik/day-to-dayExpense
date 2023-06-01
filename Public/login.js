const logIn = document.getElementById("login");
const email = document.getElementById("logInEmail");
const password = document.getElementById("logInPassword");

logIn.addEventListener("click",async function(e){
    e.preventDefault();
    try{
        const userDetails = {
            emailId:email.value,
            password:password.value
        }
        const result = await axios.post("http://localhost:3000/logIn",userDetails);
        document.write(result.data)
    } catch (err){
        document.write(err.response.data)
    }  
})