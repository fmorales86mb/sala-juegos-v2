import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { Generic } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Generic<Message> {

    constructor(private fire: AngularFirestore){
      super(fire, "message");
    }
}
