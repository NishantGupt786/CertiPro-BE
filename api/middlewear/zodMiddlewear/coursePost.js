const z = require("zod");

const coursePost = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
});

function coursePostValidation(req, res, next) {
  const result = coursePost.safeParse(req.body);

  if (result.success) {
    next();
  } else {
    const errorMessages = result.error ? result.error.issues[0] : ['Validation failed'];
    res.status(400).json({ messages: errorMessages });
  }
}

module.exports = coursePostValidation;
