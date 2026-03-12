const form = document.getElementById("registerForm")

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")

const nameCount = document.getElementById("nameCount")
const strength = document.getElementById("strength")

const togglePass = document.getElementById("togglePass")

function showError(id,msg){
document.getElementById(id).textContent = msg
}

function clearError(id){
document.getElementById(id).textContent=""
}

function validateName(){

if(fullname.value.trim().length <3){
showError("fullnameError","Ít nhất 3 ký tự")
return false
}

clearError("fullnameError")
return true
}

function validateEmail(){

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!regex.test(email.value)){
showError("emailError","Email không hợp lệ")
return false
}

clearError("emailError")
return true
}

function validatePassword(){

if(password.value.length <8){
showError("passwordError","Mật khẩu ≥ 8 ký tự")
return false
}

clearError("passwordError")
return true
}

function validateConfirm(){

if(password.value !== confirmPassword.value){
showError("confirmError","Mật khẩu không khớp")
return false
}

clearError("confirmError")
return true
}

fullname.addEventListener("input",function(){

const len = fullname.value.length

nameCount.textContent = len + "/50"

if(len>50){
nameCount.style.color="red"
}else{
nameCount.style.color="black"
}

})

password.addEventListener("input",function(){

const value = password.value

let score = 0

if(value.length >=8) score++
if(/[A-Z]/.test(value)) score++
if(/[0-9]/.test(value)) score++
if(/[^A-Za-z0-9]/.test(value)) score++

if(score<=1){
strength.textContent="Yếu"
strength.style.color="red"
}
else if(score<=3){
strength.textContent="Trung bình"
strength.style.color="orange"
}
else{
strength.textContent="Mạnh"
strength.style.color="green"
}

})

togglePass.onclick=function(){

if(password.type==="password"){
password.type="text"
}
else{
password.type="password"
}

}

form.addEventListener("submit",function(e){

e.preventDefault()

const valid =
validateName() &
validateEmail() &
validatePassword() &
validateConfirm()

if(valid){

form.style.display="none"

document.getElementById("success").textContent="Đăng ký thành công 🎉"

}

})