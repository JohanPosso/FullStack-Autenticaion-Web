const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  const { name, email, role, password } = req.body;
  const passwordCrypt = bcrypt.hashSync(password, 10); // Cifrar el password

  const createUser = User.create({ name, email, role, password: passwordCrypt })

    .then((createUser) => {
      res.json({ message: "Usuario creado exitosamente", createUser });
    })
    .catch((err) => {
      res.json(err);
    });
};

const saludo = async (req, res) => {
  const todo = await User.findAll()
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports = { createUser, saludo };
