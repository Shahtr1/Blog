import { EResponse } from "../models/api.model";

export const errorHandler = (error: any, res: EResponse) => {
  if (error instanceof Error) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(500).json({ message: "An unknown error occurred" });
  }
};
