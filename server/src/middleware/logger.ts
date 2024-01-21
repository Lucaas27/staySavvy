import morgan from "morgan";
import { Request } from "express";

export const reqLogger = () => {
  morgan.token("concealedJsonReq", (req: Request) => {
    const concealedBody = { ...req.body };
    // Replace the password field with "***"
    if (concealedBody.password) {
      concealedBody.password = "***";
    }
    if (concealedBody.confirmPassword) {
      concealedBody.confirmPassword = "***";
    }
    return JSON.stringify(concealedBody);
  });

  return morgan(
    ":method :url :status :res[content-length] - :response-time ms :concealedJsonReq"
  );
};
