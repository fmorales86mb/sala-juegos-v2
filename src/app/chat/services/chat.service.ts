import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from '../models/message';
import { Generic } from '../../shared/generic.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Generic<Message> {

  constructor(private fire: AngularFirestore){
    super(fire, "messages");
  }
}
