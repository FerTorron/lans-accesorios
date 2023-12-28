const socketClient = io()
const nombreUsuario = document.getElementById("nombreusuario")
const formulario = document.getElementById("formulario")
const inputmensaje = document.getElementById("mensaje")
const chat = document.getElementById("chat")

let usuario = nombreUsuario.textContent
socketClient.emit("nuevoUsuario", usuario)

formulario.onsubmit = (e) => {
    e.preventDefault()
    const info = {
        user: usuario,
        message: inputmensaje.value
    }
    socketClient.emit("message", info)
    inputmensaje.value = " "

}

socketClient.on("chat", mensaje => {
    const chatrender = mensaje.map(e => {
        return `<p><strong>${e.user}:</strong>${e.message}`
    }).join(" ")
    chat.innerHTML = chatrender
})

socketClient.on("broadcast", usuario => {
    console.log("hola")
    Swal.fire({
        toast: true,
        position: "top-right",
        title: `${usuario} se ha unido al Chat`,
        timer: 2000,
        showConfirmButton: false,
        icon: "info"
    })
})