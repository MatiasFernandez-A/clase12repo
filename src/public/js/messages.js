const socket = io(); 
const chatBox = document.getElementById('chatBox'); 


Swal.fire({
    icon: "info", 
    title: "Identificarse, por favor",
    text: "Ingresa el usuario para identificarte en el chat",
    input: "text", 
    inputValidator: (value)=>{
        if (!value){
            return "Debes ingresar el nombre para comenzar con le chat"
        }
    }, 
    allowOutsideClick: false
}).then(result =>{
    user = result.value;
    console.log(result.value);
})

chatBox.addEventListener("keyup", evt =>{
    if(evt.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("menssage", {user: user, message: chatBox.value});// {user: juan, message: "hola     "}
            chatBox.value=""
        } else {
            Swal.fire({
                icon: "warning",
                title: "Alerta",
                text: "Por favor escribe una palabra, los espacios no son un mensaje valido."
            })
        }
    }
}); 
socket.on("messageLogs", data =>{
    const messageLog = document.getElementById('messageLog'); 
    let logs = ""; 
    data.forEach(log => {
        logs += `${log.user} dice ${log.message}<br/>`
    });
    messageLog.innerHTML=logs;
})