console.log("test")

const socket = io();
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
    console.log(socket.id); // undefined
});


const input = document.getElementById('input');
input.addEventListener('click', function (e) {
    console.log("sent button clicked")
    socket.emit('message', "button clicked");
});

console.log("client loaded")