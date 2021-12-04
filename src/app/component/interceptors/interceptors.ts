
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/do';
import { DataService } from '../services/data.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  private AUTH_HEADER = "Authorization";
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
     
        return next.handle(this.addAuthenticationToken(req));
      

  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    
    // should add authorization token into headers except login and signup

    //  const authToken = this.dataService.getAuthToken();
    //  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6I'
      const authToken = localStorage.getItem('token');
     console.log('auth token' + JSON.stringify(request.headers));
      let authReq = request.urlWithParams;
      if(authReq === "api/signin" || authReq === "api/register"){
      const authRequest = request.clone({
      headers: request.headers.set("auth","auth")});
      return authRequest;
      }
      else{
      const authRequest = request.clone({
      headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + authToken)})
    return authRequest;
  };
    
    // }
    
    // return ;
    
  }

}

