import express from "express";
import { register, getUsers, login } from "../controllers/userController.js";
import createUserValidator from "../middlewares/userValidator.js";
import loginValidator from "../middlewares/loginValidator.js";

const router = express.Router();

router.post('/register', createUserValidator, register);
//TODO HACER LOGIN, LOGINVALIDATOR
router.post('/login', loginValidator, login);
router.get('/allUsers', getUsers);
//TODO VALIDAR EL TOKEN DE LOGIN DE ADMIN PARA QUE PUEDA CREAR OTRO ADMIN
//TODO HACER UPDATEUSER
// router.put('/createAdmin', adminValidator, updateUser);

export default router;