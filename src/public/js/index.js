const socket = io();

socket.emit("mensajito", "hola me estoy comunicando desde el socket del cliente.")

Swal.fire({
    icon: "success", 
    title: "Hola coders",
    text: "Alerta basica de swetalert2", 
    footer: '<a href="">Por que veo esta alerta?</a>'
})





