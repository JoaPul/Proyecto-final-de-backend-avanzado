import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import config from "../config/index.js";

//GET
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({
      msg: 'Aqui estan todos los usarios',
      data: users
    })
  } catch (error) {
    return res.status(400).json({
      error
    })
  }
}

const register = async (req, res) => {
  try {
    const encryptedPass = await bcrypt.hash(req.body.password, 4);
    req.body.password = encryptedPass;
    const user = await User.create(req.body);
    user.password = undefined;

    return res.json({
      msg: 'Usuario creado',
      data: { user }
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        msg: 'Ya existe un usuario registrado con ese correo',
      });
    }
    return res.status(500).json({
      msg: 'Ocurrio un error al registrar usuario',
      error,
    });
  }
}

export { getUsers, register };