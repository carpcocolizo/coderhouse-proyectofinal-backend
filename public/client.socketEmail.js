const socket = io();
const messagesPool = document.getElementById("messagesPool");
const messageInput = document.getElementById("messageInput");


async function renderMessages(messagesInfo) {
  messagesPool.innerHTML = "";
  const response = await fetch("/plantillaemailmensajes.hbs");
  const plantilla = await response.text();
  const userResponse = await fetch("/userdata");
  const user = await userResponse.json();
  await messagesInfo.forEach((message) => {
    if (message.email == user.username || message.to == user.username) {  // Solo puede ver sus mensajes y las respuesta del admin a sus mensajes
      const template = Handlebars.compile(plantilla);
      const html = template(message);
      messagesPool.innerHTML += html;
    }
  });
}

socket.on("server:message", (messageInfo) => {
  if (messageInfo == null) {
    console.log("no hay mensajes");
  } else {
    renderMessages(messageInfo);
  }
});
