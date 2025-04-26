import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
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

    if (exception instanceof HttpException) {
      return this.catchHttpException(exception, request, response);
    }

    this.logger.error('Error sin controlar.', exception);
    this.logger.error(exception);

    const { httpAdapter } = this.httpAdapterHost;
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    httpAdapter.reply(
      response,
      {
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: 'El servicio no se encuentra disponible.',
        error: 'Internal Server Error',
      },
      status,
    );
  }

  catchHttpException(exception: HttpException, request: IRequest, response: IResponse) {
    const { httpAdapter } = this.httpAdapterHost;
    const status = exception.getStatus();

    httpAdapter.reply(
      response,
      {
        statusCode: status,
        timestamp: new Date().toISOString(),
        ...(exception.getResponse() as object),
      },
      status,
    );
  }
}
