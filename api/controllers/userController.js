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

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        msg: 'Usuario no encontrado',
      });
    }

    //?crear token y regresarlo

    const passCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!passCorrect) {
      return res.status(401).json({
        msg: 'Credenciales inválidas',
      });
    }

    const payload = {
      userId: user.id,
      userRole: user.role
    }

    const token = jwt.encode(payload, config.jwt.secret);

    return res.json({
      mdg: "Login correcto",
      data: { token }
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al hacer login',
    });
  }
}

const crearAdmin = async (req, res) => {
  try {
    const token = req.headers.Authorization;

    if (!token) {
      return res.status(400).json({
        msg: 'Cabecera Authorization faltante',
      });
    }

    const payload = jwt.decode(token, config.jwt.secret);

    const user = await User.findById(payload.userRole);

    if (!user) {
      return res.status(401).json({
        msg: "No tienes privilegios para crear Admin",
      });
    } else if (user == "Admin") {
      const { id } = req.params;
      const admin = await User.findByIdAndUpdate(id, { role: "Admin" }, { new: true });
      return res.status(200).json({
        msg: "Ha nacido un nuevo Admin",
        data: admin
      });
    } else {
      return res.status(401).json({
        msg: "No tienes privilegios para crear Admin",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: 'Error de validación',
      error
    });
  }
}

export { getUsers, register, login, crearAdmin };