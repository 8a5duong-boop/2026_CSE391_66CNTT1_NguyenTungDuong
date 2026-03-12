const form = document.getElementById("registerForm")

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const terms = document.getElementById("terms")

function showError(id, message){
    document.getElementById(id).textContent = message
}

function clearError(id){
    document.getElementById(id).textContent = ""
}

function validateFullname(){
    const regex = /^[a-zA-Z\s]{3,}$/
    if(fullname.value.trim() === ""){
        showError("fullnameError","Không được để trống")
        return false
    }
    if(!regex.test(fullname.value)){
        showError("fullnameError","Ít nhất 3 ký tự, chỉ chữ và khoảng trắng")
        return false
    }
    clearError("fullnameError")
    return true
}

function validateEmail(){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(email.value.trim() === ""){
        showError("emailError","Email không được để trống")
        return false
    }
    if(!regex.test(email.value)){
        showError("emailError","Email không đúng định dạng")
        return false
    }
    clearError("emailError")
    return true
}

function validatePhone(){
    const regex = /^0[0-9]{9}$/
    if(phone.value.trim() === ""){
        showError("phoneError","Không được để trống")
        return false
    }
    if(!regex.test(phone.value)){
        showError("phoneError","SĐT phải 10 số và bắt đầu bằng 0")
        return false
    }
    clearError("phoneError")
    return true
}

function validatePassword(){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if(password.value === ""){
        showError("passwordError","Không được để trống")
        return false
    }
    if(!regex.test(password.value)){
        showError("passwordError","Ít nhất 8 ký tự, có chữ hoa, thường và số")
        return false
    }
    clearError("passwordError")
    return true
}

function validateConfirmPassword(){
    if(confirmPassword.value !== password.value){
        showError("confirmPasswordError","Mật khẩu không khớp")
        return false
    }
    clearError("confirmPasswordError")
    return true
}

function validateGender(){
    const genders = document.getElementsByName("gender")
    for(let g of genders){
        if(g.checked){
            clearError("genderError")
            return true
        }
    }
    showError("genderError","Vui lòng chọn giới tính")
    return false
}

function validateTerms(){
    if(!terms.checked){
        showError("termsError","Bạn phải đồng ý điều khoản")
        return false
    }
    clearError("termsError")
    return true
}


fullname.addEventListener("blur", validateFullname)
email.addEventListener("blur", validateEmail)
phone.addEventListener("blur", validatePhone)
password.addEventListener("blur", validatePassword)
confirmPassword.addEventListener("blur", validateConfirmPassword)

fullname.addEventListener("input", ()=>clearError("fullnameError"))
email.addEventListener("input", ()=>clearError("emailError"))
phone.addEventListener("input", ()=>clearError("phoneError"))
password.addEventListener("input", ()=>clearError("passwordError"))
confirmPassword.addEventListener("input", ()=>clearError("confirmPasswordError"))


form.addEventListener("submit", function(event){

    event.preventDefault()

    let isValid =
        validateFullname() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirmPassword() &
        validateGender() &
        validateTerms()

    if(isValid){
        form.style.display="none"
        document.getElementById("successMessage").textContent =
            "Đăng ký thành công 🎉 " + fullname.value
    }

})