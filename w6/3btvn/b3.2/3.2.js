const step1 = document.getElementById("step1")
const step2 = document.getElementById("step2")
const step3 = document.getElementById("step3")

const stepInfo = document.getElementById("stepInfo")

const fullname = document.getElementById("fullname")
const birth = document.getElementById("birth")

const email = document.getElementById("email")
const password = document.getElementById("password")
const confirm = document.getElementById("confirm")

function showError(id,msg){
document.getElementById(id).textContent = msg
}

function clearError(id){
document.getElementById(id).textContent=""
}

function validateStep1(){

let ok = true

if(fullname.value.trim().length <3){
showError("nameError","Ít nhất 3 ký tự")
ok = false
}else{
clearError("nameError")
}

if(birth.value===""){
showError("birthError","Chọn ngày sinh")
ok = false
}else{
clearError("birthError")
}

const genders = document.getElementsByName("gender")
let checked = false

for(let g of genders){
if(g.checked) checked=true
}

if(!checked){
showError("genderError","Chọn giới tính")
ok=false
}else{
clearError("genderError")
}

return ok
}

function validateStep2(){

let ok = true

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!regex.test(email.value)){
showError("emailError","Email không hợp lệ")
ok=false
}else{
clearError("emailError")
}

if(password.value.length <8){
showError("passError","Mật khẩu ≥ 8 ký tự")
ok=false
}else{
clearError("passError")
}

if(password.value !== confirm.value){
showError("confirmError","Mật khẩu không khớp")
ok=false
}else{
clearError("confirmError")
}

return ok
}

document.getElementById("next1").onclick=function(){

if(validateStep1()){

step1.style.display="none"
step2.style.display="block"

stepInfo.textContent="Bước 2 / 3"

}

}

document.getElementById("back1").onclick=function(){

step2.style.display="none"
step1.style.display="block"

stepInfo.textContent="Bước 1 / 3"

}

document.getElementById("next2").onclick=function(){

if(validateStep2()){

step2.style.display="none"
step3.style.display="block"

stepInfo.textContent="Bước 3 / 3"

document.getElementById("summary").textContent =
"Họ tên: "+fullname.value+
" | Email: "+email.value

}

}

document.getElementById("back2").onclick=function(){

step3.style.display="none"
step2.style.display="block"

stepInfo.textContent="Bước 2 / 3"

}

document.getElementById("form").addEventListener("submit",function(e){

e.preventDefault()

step3.style.display="none"

document.getElementById("success").textContent="Đăng ký thành công 🎉"

})