export function validateSchema(schema) {
    return (req, res, next)=> {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            res.status(422).json({ errors });
            return; 
        }
        next();
    };
}
export function validateSchemaWhitImage(schema, fileFieldName) {
  return (req, res, next) => {
    const data = { ...req.body };
    if (req.file) {
      data[fileFieldName] = req.file;
    }

    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(422).json({ errors });
    }

    next();
  };
}
