// import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
// import {TokenService} from '../token/token';

// constructor(
//     private tokenService: TokenService
//   ){

//   }

//   const toke = this.tokenService.token;
//   if(token){
//     const authReq = req.clone({
//       headers: new HttpHeaders({
//         Authorization: 'Bearer ' + token
//       })
//     });
//     return nextTick.handle(authReq);

//   }
// export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

//   return next(req);
// };

// interceptor is like a middleman between our Angular app and the backend server.
// Whenever our app makes an HTTP request (using HttpClient), the interceptor can:
// Look at (or modify) the request before it goes to the server.
// Look at (or modify) the response before your app gets it.

import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Token } from '../token/token';
import { Observable } from 'rxjs';

export const httpTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const tokenService = inject(Token);
  const token = tokenService.token;

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
