const z = require("zod");

const coursePost = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.literal('Technology').or(z.literal('Art')).or(z.literal('School')).or(z.literal('Business')).or(z.literal('Other')),
});

function coursePostValidation(req, res, next) {
  const result = coursePost.safeParse(req.body);

  if (result.success) {
    next();
  } else {
    const errorMessages = result.error ? result.error.issues.map((issue) => issue.message) : ['Validation failed'];
    res.status(400).json({ messages: errorMessages });
  }
}

module.exports = coursePostValidation;