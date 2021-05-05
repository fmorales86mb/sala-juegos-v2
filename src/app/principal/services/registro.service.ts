import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Generic } from 'src/app/shared/generic.service';
import { RegistroJuego } from '../models/registro-juego';

@Injectable({
  providedIn: 'root'
})
export class RegistroService extends Generic<RegistroJuego>{

  constructor(private fire:AngularFirestore) {
    super(fire);    
   }
}
