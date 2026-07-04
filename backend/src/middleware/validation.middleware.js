export const validateSchema = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.length > 1 ? issue.path.slice(1).join('.') : issue.path.join('.'),
        message: issue.message,
      }));

      return res.status(400).json({
        status: 'error',
        error: {
          code: 'VALIDATION_FAILED',
          message: 'The request payload failed structural validation checks.',
          details,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    }

    // Replace original properties with validated and parsed data
    if (result.data.body) req.body = result.data.body;
    if (result.data.query) req.query = result.data.query;
    if (result.data.params) req.params = result.data.params;

    next();
  };
};
