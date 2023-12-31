const User = require("../models/user.model");
const Role = require("../models/role.model");
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  let {
    type_identification,
    identification,
    name,
    lastname,
    email,
    phone,
    role,
    ocupation,
    password,
  } = req.body;
  console.log(
    type_identification,
    identification,
    name,
    lastname,
    email,
    phone,
    role,
    ocupation,
    password,
    "yyyyyyy"
  );
  const passwordCrypt = bcrypt.hashSync(password, 10); // Cifrar el password

  switch (role) {
    case "admin":
      role = 1;
      break;
    case "user":
      role = 2;
      break;
    case "invited":
      role = 3;
      break;
  }

  const createUser = User.create({
    type_identification,
    identification,
    name,
    lastname,
    email,
    phone,
    ocupation,
    RoleIdRole: role,
    password: passwordCrypt,
  })

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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id,
      },
    });
    res.json({ msg: "Usuario eliminado exitosamente!" });
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;
    await User.update(
      { name, email, role, password },
      {
        where: {
          id,
        },
      }
    );
    res.json({ msg: "Usuario editado exitosamente!" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser, saludo, deleteUser, editUser };
