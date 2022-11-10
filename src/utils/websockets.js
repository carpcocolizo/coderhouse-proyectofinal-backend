import daos from "../daos/index.js";

const listaDeMensajes = daos.MensajeDao.getInstance();

export default async function configSocket(socket, io) {
  const mensajesDb = await listaDeMensajes.getAll();
  socket.emit("server:message", mensajesDb);
  socket.on("client:message", async (messageInfo) => {
    await listaDeMensajes.insert(messageInfo);
    const mensajesDb = await listaDeMensajes.getAll();
    io.emit("server:message", mensajesDb);
  });
}