module.exports = (app) => {
  const user = require("../controller/user.controller.js");
const auth=require("../middleware/auth")

  app.post("/api/login",user.login);

  app.post("/api/signup", user.create);

  app.get("/api/getuser",auth, user.getone);

  app.get("/api/get",auth, user.get);

  app.put("/api/update/:id",auth, user.update);

  app.delete("/api/delete/:id",auth, user.delete);

};

    