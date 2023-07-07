const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    const desCryptPassword = bcrypt.compareSync(password, user.password);

    if (!desCryptPassword)
      return res.status(404).json({ error: "Credenciales Incorrecta" });

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const token = jwt.sign(
      { name: user.name, email: user.email, role: user.role },
      "secret",
      { expiresIn: "1h" }
    );
    res.header("token", token).json({
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.error("Error al encontrar el usuario:", error);
    res.status(500).json({ error: "Error al encontrar el usuario" });
  }
};

module.exports = loginUser;