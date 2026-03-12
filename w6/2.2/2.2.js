const form = document.getElementById("orderForm")

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const date = document.getElementById("date")
const address = document.getElementById("address")
const note = document.getElementById("note")

const total = document.getElementById("total")
const noteCount = document.getElementById("noteCount")

const confirmBox = document.getElementById("confirmBox")
const summary = document.getElementById("summary")

const prices = {
    Ao:150000,
    Quan:200000,
    Giay:300000
}

function showError(id,msg){
    document.getElementById(id).textContent = msg
}

function clearError(id){
    document.getElementById(id).textContent = ""
}

function validateProduct(){
    if(product.value===""){
        showError("productError","Vui lòng chọn sản phẩm")
        return false
    }
    clearError("productError")
    return true
}

function validateQuantity(){
    const q = Number(quantity.value)

    if(!q || q<1 || q>99){
        showError("quantityError","Số lượng từ 1-99")
        return false
    }
    clearError("quantityError")
    return true
}

function validateDate(){

    if(date.value===""){
        showError("dateError","Chọn ngày giao")
        return false
    }

    const today = new Date()
    const selectDate = new Date(date.value)

    const diff = (selectDate - today)/(1000*60*60*24)

    if(diff < 0){
        showError("dateError","Không chọn ngày quá khứ")
        return false
    }

    if(diff > 30){
        showError("dateError","Không quá 30 ngày")
        return false
    }

    clearError("dateError")
    return true
}

function validateAddress(){
    if(address.value.trim().length < 10){
        showError("addressError","Địa chỉ ít nhất 10 ký tự")
        return false
    }
    clearError("addressError")
    return true
}

function validateNote(){

    if(note.value.length > 200){
        showError("noteError","Tối đa 200 ký tự")
        return false
    }

    clearError("noteError")
    return true
}

function validatePayment(){

    const pay = document.getElementsByName("payment")

    for(let p of pay){
        if(p.checked){
            clearError("paymentError")
            return true
        }
    }

    showError("paymentError","Chọn phương thức thanh toán")
    return false
}

function calculateTotal(){

    const p = product.value
    const q = Number(quantity.value)

    if(prices[p] && q){

        const money = prices[p] * q
        total.textContent = money.toLocaleString("vi-VN")
    }
}

note.addEventListener("input",function(){

    const length = note.value.length

    noteCount.textContent = length + "/200"

    if(length>200){
        noteCount.style.color="red"
    }else{
        noteCount.style.color="black"
    }
})

product.addEventListener("change",calculateTotal)
quantity.addEventListener("input",calculateTotal)

product.addEventListener("blur",validateProduct)
quantity.addEventListener("blur",validateQuantity)
date.addEventListener("blur",validateDate)
address.addEventListener("blur",validateAddress)

form.addEventListener("submit",function(e){

    e.preventDefault()

    const valid =
        validateProduct() &
        validateQuantity() &
        validateDate() &
        validateAddress() &
        validateNote() &
        validatePayment()

    if(valid){

        const p = product.value
        const q = quantity.value
        const d = date.value
        const money = total.textContent

        summary.textContent =
        "Sản phẩm: "+p+
        " | Số lượng: "+q+
        " | Tổng tiền: "+money+
        " | Ngày giao: "+d

        confirmBox.style.display="block"
    }

})

document.getElementById("confirmBtn").onclick=function(){

    form.style.display="none"
    confirmBox.style.display="none"

    document.getElementById("success").textContent="Đặt hàng thành công 🎉"
}

document.getElementById("cancelBtn").onclick=function(){

    confirmBox.style.display="none"
}