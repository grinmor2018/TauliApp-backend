import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

//The ArgumentsHost class provides methods for retrieving the arguments being passed to a handler. 
//It allows choosing the appropriate context (e.g., HTTP, RPC (microservice), or WebSockets) to retrieve the arguments from. 
@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    //Switch context to HTTP.
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    //In HTTP server applications, the host object encapsulates Express's [request, response, next] array, 
    //where request is the request object, response is the response object, 
    //and next is a function that controls the application's request-response cycle.

    if (exception['status'] === HttpStatus.UNAUTHORIZED) {
      if (typeof exception['response'] !== 'string') {
        exception['response']['message'] =
          exception['response'].message || 'You do not have permission to access this resource';
      }
    }

    res.status(exception['status']).json({
      statusCode: exception['status'],
      error: exception['response'].name || exception['response'].error || exception['name'],
      message: exception['response'].message || exception['response'] || exception['message'],
      timestamp: new Date().toISOString(),
      path: req ? req.url : null,
    });
  }
}
