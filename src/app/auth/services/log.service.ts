import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Generic } from 'src/app/shared/generic.service';

@Injectable({
  providedIn: 'root'
})
export class LogService extends Generic<any>{

  constructor(private fire:AngularFirestore) {
    super(fire);
  }
}
