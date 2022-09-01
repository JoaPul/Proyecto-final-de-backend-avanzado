import express from "express";
import { register, getUsers } from "../controllers/userController.js";
import createUserValidator from "../middlewares/userValidator.js";

const router = express.Router();

router.post('/register', createUserValidator, register);
//TODO HACER LOGIN, LOGINVALIDATOR
router.post('/login', loginValidator, login);
//TODO VALIDAR EL TOKEN DE LOGIN DE ADMIN PARA QUE PUEDA CREAR OTRO ADMIN
router.get('/allUsers', adminValidator, getUsers);
//TODO HACER UPDATEUSER
router.put('/createAdmin', adminValidator, updateUser);

export default router;