import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private collName:string = 'users';
  currentUser:User;    

  private itemsCollection: AngularFirestoreCollection<User>;
    items: Observable<User[]>;    

    constructor(private afs: AngularFirestore) {
      this.itemsCollection = afs.collection<User>(this.collName);
      this.items = this.itemsCollection.valueChanges();
    }
  
    addUser(item: User) {
      this.itemsCollection.doc(item.email).set(Object.assign({}, item));  
      this.currentUser = item;  
    }    

    getUser(id:string){
      return this.itemsCollection.doc(id).get();
    }

    setCurrentUserById(id:string): void{
      this.itemsCollection.doc(id).get().subscribe(user => {
        this.currentUser = user.data();
      });
    }
}
