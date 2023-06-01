const submit = document.getElementById("submit");
const userName = document.getElementById("userName");
const InputEmail = document.getElementById("InputEmail");
const InputPassword = document.getElementById("InputPassword");

submit.addEventListener("click", async function(e){
    e.preventDefault();
    try{
        if(userName.value ===''|| InputEmail.value ===''||InputPassword.value ===''){
            document.write("Every field is mandatory!!")
        }else{
            const userDetails = {
                name:userName.value,
                emailId:InputEmail.value,
                password:InputPassword.value
            }
        
             const result = await axios.post("http://localhost:3000/user/signup",userDetails);
             console.log(result)
             userName.value = '';
             InputEmail.value = '';
             InputPassword.value = '';
        }
    } catch (err){
        document.write(err.response.data)
    }  
})