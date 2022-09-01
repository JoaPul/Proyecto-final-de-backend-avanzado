import joi from "joi";

let options = ['Administrator', 'Employee', 'Customer'];
const createUserSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  address: {
    street: joi.string().required(),
    location: joi.string().required(),
    exteriorNo: joi.number().required(),
    interiorNo: joi.number(),
    betweenStr: joi.string().required(),
    city: joi.string().required(),
    country: joi.string().required(),
    zipCode: joi.number().required(),
    references: joi.string().required(),
  },
  email: joi.string().required(),
  password: joi.string().valid("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/").required(),
  phone: joi.number().required(),
  role: joi.string().valid(...options).default('Customer').required(),
  carritoActivo: joi.boolean().default(false)
})

export default async (req, res, next) => {
  try {
    await createUserSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      msg: 'Error de validación',
      error
    });
  }
}