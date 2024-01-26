import { ERequest, EResponse } from "../models/api.model";

export const test = (req: ERequest, res: EResponse) => {
  res.send("test working");
};
