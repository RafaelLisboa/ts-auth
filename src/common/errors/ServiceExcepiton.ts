import { Errors } from "./ErrorsEnum";
import { TypeErros } from "./TypeErrorsEnum";

export default class ServiceException {
  statusCode: number;
  description: string;
  message: string

  public constructor(statusCode: number = 400, errorMessage: Errors) {
    this.statusCode = statusCode;
    this.description = TypeErros[statusCode];
    this.message = errorMessage.toString();
  }


}