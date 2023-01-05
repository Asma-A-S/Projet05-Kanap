const orderId = getOrderId()
displayOrederId(orderId)

function getOrderId(){
const location = window.location.search
const urlParams = new URLSearchParams(location)
return urlParams.get("orderId");
}
function displayOrederId(orderId){
    document.getElementById("orderId").textContent = orderId;
    localStorage.clear()
}
