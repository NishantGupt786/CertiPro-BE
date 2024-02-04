const z = require("zod");

const loginCheck = z.object({
  email: z.string().email(),
  password: z.string(),
});

function loginValidation(req, res, next) {
  const result = loginCheck.safeParse(req.body);

  if (result.success) {
    const validFields = Object.keys(loginCheck.shape);
    const requestFields = Object.keys(req.body);
    
    const unexpectedFields = requestFields.filter(field => !validFields.includes(field));

    if (unexpectedFields.length > 0) {
      res.status(400).json({ messages: [`Unexpected field(s): ${unexpectedFields.join(', ')}`] });
    } else {
      console.log("success");
      next();
    }
  } else {
    const errorMessages = result.error.issues[0]
    res.status(400).json({ messages: errorMessages });
  }
}

module.exports = loginValidation;
