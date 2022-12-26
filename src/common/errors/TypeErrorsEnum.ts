import { ResponseStatusCode } from "../http/ResponseStatusCode";

export enum TypeErros {
  VALIDATION = ResponseStatusCode.LOGIC_ERROR,
  LOGIC = ResponseStatusCode.LOGIC_ERROR,
  FATAL = ResponseStatusCode.FATAL_ERROR,
  INTEGRATION = ResponseStatusCode.FATAL_ERROR,
  OK = ResponseStatusCode.OK
}