import { Request, Response } from "express";

export type ERequest = Request;
export type EResponse = Response;

export interface IError {
  statusCode: number;
  message: string;
}
