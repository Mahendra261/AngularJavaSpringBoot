
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class AuthGuardService implements CanActivate {
isLogin: boolean;
  constructor(public dataService: DataService, public router: Router) { }

  canActivate(): boolean {
    // return true if authenticated else redirect to login page

    this.dataService.getAuthStatus()
    .subscribe(res =>{
      if(res){
        this.isLogin = res;
      }else{
        this.router.navigate(['login']);
      }
    },
    error =>{
      this.router.navigate(['login']);
    })
    
    return this.isLogin;
  
  }
  

}

