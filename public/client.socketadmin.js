const socket = io();
const messageForm = document.getElementById("messageForm");
const messageOption = document.getElementById("answer");
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

// Asi es como se renderizan los mails a los que se puede responder:

async function renderOptions(messagesInfo) {
  messageOption.innerHTML = "";
  let mails = [];
  messagesInfo.forEach((message) => {
    if (message.rol == "USER") {
      mails.push(message);
    }
  });
  const allMails = mails.map((mes) => mes.email);
  const uniqueMails = [...new Set(allMails)];
  const response = await fetch("/plantillaselect.hbs");
  const plantilla = await response.text();
  uniqueMails.forEach((message) => {                     // El admin puede contestarle solo a los que hicieron preguntas
    let obj = { email: message };
    const template = Handlebars.compile(plantilla);
    const html = template(obj);
    messageOption.innerHTML += html;
  });
}

// Con la propiedad "to" se puede elegir el receptor del mensaje
// Gracias a esta propiedad deberiamos poder organizar el contenido en el front, para que las respuestas esten debajo de las preguntas

async function submitHandlerMessage(event) {
  event.preventDefault();
  const response = await fetch("/userdata");
  const user = await response.json();
  const messageInfo = {
    email: user.username,
    body: messageInput.value,
    date: new Date(),
    rol: user.rol,
    to: messageOption.value,
  };
  sendMessage(messageInfo);
}

messageForm.addEventListener("submit", submitHandlerMessage);

socket.on("server:message", (messageInfo) => {
  if (messageInfo == null) {
    console.log("no hay mensajes");
  } else {
    renderOptions(messageInfo);
    renderMessages(messageInfo);
  }
});
