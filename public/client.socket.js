const socket = io();
const messageForm = document.getElementById("messageForm");
const messagesPool = document.getElementById("messagesPool");
const messageInput = document.getElementById("messageInput");

function sendMessage(messageInfo) {
  socket.emit("client:message", messageInfo);
}

async function renderMessages(messagesInfo) {
  messagesPool.innerHTML = "";
  const response = await fetch("/plantillamensajes.hbs");
  const plantilla = await response.text();
  await messagesInfo.forEach((message) => {
    const template = Handlebars.compile(plantilla);
    const html = template(message);
    messagesPool.innerHTML += html;
  });
}

async function submitHandlerMessage(event) {
  event.preventDefault();
  const response = await fetch("/userdata");
  const user = await response.json();
  const messageInfo = {
    email: user.username,
    body: messageInput.value,
    date: new Date(),
    rol: user.rol,
  };
  sendMessage(messageInfo);
}

messageForm.addEventListener("submit", submitHandlerMessage);

socket.on("server:message", (messageInfo) => {
  if (messageInfo == null) {
    console.log("no hay mensajes");
  } else {
    renderMessages(messageInfo);
  }
});
