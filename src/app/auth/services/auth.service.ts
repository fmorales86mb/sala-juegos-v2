import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CurrentUser } from '../models/current-user';
import { ErrorFirebase } from '../models/error-firebase';
import { ErrorHandleFirebase } from '../models/errors-handle';
import { Credential } from '../models/credential';
import { RegisterCredential } from '../models/register-credential';
import { ResponseFirebase } from '../models/response-firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private userId: any;    

  constructor(private authDb: AngularFireAuth) {      
      this.userId = null;
  }

  public async Ingresar(loginData: Credential): Promise<ResponseFirebase>{  
    let response:ResponseFirebase = new ResponseFirebase();

    await this.authDb.signInWithEmailAndPassword(loginData.GetEmail(), loginData.GetPass())
    .then((userCredential) => {                 
      CurrentUser.isAuth = true;
      CurrentUser.user = userCredential.user;
      response.ok = true;
    })
    .catch((error) => {
      CurrentUser.isAuth = false;
      let errorFirebase = ErrorHandleFirebase.getErrorByCode(error.code);           
      response.ok = false;
      response.error = errorFirebase;          
    });
            
    return response;
  }

  public async Registrarse(registerData: RegisterCredential):Promise<ResponseFirebase>{
    let response:ResponseFirebase = new ResponseFirebase();

    await this.authDb.createUserWithEmailAndPassword(registerData.GetEmail(), registerData.GetPass())
      .then((userCredential) => {
        CurrentUser.isAuth = true;
        CurrentUser.user = userCredential.user;
        response.ok = true;
      })
      .catch((error) => {
        CurrentUser.isAuth = false;
        let errorFirebase = ErrorHandleFirebase.getErrorByCode(error.code);           
        response.ok = false;
        response.error = errorFirebase;      
      });

    return response;
  }

  public Desloguearse(){    
    this.authDb.signOut();
    CurrentUser.isAuth = false;
  }

  public GetUserId(){
    return this.userId;
  }

  public GetIsAuth():boolean{    
    return CurrentUser.isAuth;
  }
}