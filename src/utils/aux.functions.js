function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
}

function checkAdmin(req, res, next) {
  const user = req.user
    if (user && req.user.rol === "ADMIN") {
        return next()
    } else {
        res.json({ error : -1, descripcion: `ruta ${req.path} método ${req.method} no autorizada`})
    }
}

export { checkAuthentication, checkAdmin }