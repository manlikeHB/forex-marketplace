import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // response.status(error.statusCode).json(error.response);

    response
      .status(error.statusCode || 400) // Use extracted status code or default to 400
      .json({
        statusCode: error.statusCode || 400,
        message: error.details || 'Internal Server Error',
      });
  }
}
