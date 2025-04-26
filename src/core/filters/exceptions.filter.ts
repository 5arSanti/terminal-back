import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request as IRequest, Response as IResponse } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<IRequest>();
    const response = ctx.getResponse<IResponse>();

    const { httpAdapter } = this.httpAdapterHost;

    if (exception instanceof HttpException) {
      // Si es un HttpException (BadRequest, NotFound, Forbidden, etc)
      return this.catchHttpException(exception, request, response);
    }

    // Para cualquier otro error desconocido:
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'El servicio no se encuentra disponible.';
    let errorName = 'Internal Server Error';

    if (exception instanceof Error) {
      // Mostrar en consola un stack completo
      this.logger.error(exception.message, exception.stack);

      // Usar el mensaje real de la excepción si existe
      message = exception.message;
      errorName = exception.name || 'Internal Server Error';
    } else {
      this.logger.error('Error no controlado', JSON.stringify(exception));
    }

    httpAdapter.reply(
      response,
      {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
        error: errorName,
      },
      status,
    );
  }

  private catchHttpException(exception: HttpException, request: IRequest, response: IResponse) {
    const { httpAdapter } = this.httpAdapterHost;
    const status = exception.getStatus();
  
    let responseData: object;
  
    const exceptionResponse = exception.getResponse();
    if (typeof exceptionResponse === 'object') {
      responseData = exceptionResponse;
    } else {
      responseData = { message: exceptionResponse };
    }
  
    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...responseData,
    };
  
    httpAdapter.reply(response, responseBody, status);
  }
}
