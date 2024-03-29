import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CurrentUser } from '../models/current-user';
import { ErrorFirebase } from '../models/error-firebase';
import { ErrorHandleFirebase } from '../models/errors-handle';
import { Credential } from '../models/credential';
import { RegisterCredential } from '../models/register-credential';
import { ResponseFirebase } from '../models/response-firebase';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
      
  private isAuth:boolean = false;

  constructor(private authDb: AngularFireAuth, private logService:LogService) {      
    this.logService.setCollection("logIngreso");
  }

  public async Ingresar(loginData: Credential): Promise<ResponseFirebase>{  
    let response:ResponseFirebase = new ResponseFirebase();

    await this.authDb.signInWithEmailAndPassword(loginData.GetEmail(), loginData.GetPass())
    .then((userCredential) => {                 
      this.isAuth = true;
      response.ok = true;
      this.logIngreso(loginData.GetEmail());
    })
    .catch((error) => {
      this.isAuth = false;
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
        this.isAuth = true;
        response.ok = true;
        this.logIngreso(registerData.GetEmail());
      })
      .catch((error) => {
        this.isAuth = false;
        let errorFirebase = ErrorHandleFirebase.getErrorByCode(error.code);           
        response.ok = false;
        response.error = errorFirebase;      
      });

    return response;
  }

  public Desloguearse(){    
    this.isAuth = false;
    this.authDb.signOut();
  }

  public GetIsAuth():boolean{    
    return this.isAuth;
  }

  private logIngreso(email:string){
    let log = {
      email: email,
      fecha: Date.now().toLocaleString()
    };

    this.logService.addItem(log);
  }
}