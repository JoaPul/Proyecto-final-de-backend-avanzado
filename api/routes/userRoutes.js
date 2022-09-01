import express from "express";
import { register, getUsers, login, crearAdmin } from "../controllers/userController.js";
import createUserValidator from "../middlewares/userValidator.js";
import loginValidator from "../middlewares/loginValidator.js";

const router = express.Router();

router.post('/register', createUserValidator, register);
router.post('/login', loginValidator, login);
router.get('/allUsers', getUsers);
router.put('/createAdmin/:id', crearAdmin);

export default router;