import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Generic } from 'src/app/shared/generic.service';
import { Encuesta } from '../models/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService extends Generic<Encuesta> {

  constructor(private fire:AngularFirestore) { 
    super(fire);
  }

  init(collName:string){
    super.setCollection(collName);
  }
}
