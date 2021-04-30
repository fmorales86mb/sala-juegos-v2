import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentUser:User;
  private itemsCollection: AngularFirestoreCollection<User>;
  items: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<User>('users');
    this.items = this.itemsCollection.valueChanges();
  }

  addItem(item: User) {
    this.itemsCollection.add(Object.assign({}, item));
    this.currentUser = item;
  }
}
