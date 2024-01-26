import { IError } from "../models/api.model";

export const errorHandler = (statusCode: number, message: string): IError => ({
  statusCode,
  message,
});
