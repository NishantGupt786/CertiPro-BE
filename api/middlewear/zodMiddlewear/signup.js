const z = require("zod");

const signupCheck = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

function signupValidation(req, res, next) {
  const result = signupCheck.safeParse(req.body);

  if (result.success) {
    const validFields = Object.keys(signupCheck.shape);
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

module.exports = signupValidation;
