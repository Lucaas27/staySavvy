import morgan from "morgan";
import { Request } from "express";

export const reqLogger = () => {
  morgan.token("jsonReq", (req: Request) => JSON.stringify(req.body));
  return morgan(
    ":method :url :status :res[content-length] - :response-time ms :jsonReq"
  );
};
