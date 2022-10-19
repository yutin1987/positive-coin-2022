import ResponseError from "./ResponseError";

export default function withErrorsHandler(handlers) {
  const methods = Object.keys(handlers);
  return async (req, res) => {
    try {
      if (methods.includes(req.method) === false) {
        res.setHeader('Allow', methods);
        throw new ResponseError(`Method ${req.method} Not Allowed`, 405);
      }

      const result = await handlers[req.method](req, res);
      res.status(200).json({ status: 'ok', result });
    } catch (error) {
      if (error instanceof ResponseError) {
        res.status(error.status).json({ message: error.message });
        return;
      } 
      if (['development', 'test'].indexOf(process.env.NODE_ENV) > -1) console.error(error);
      res.status(500).json({ message: 'internal server error' }); 
    }
  };
} 