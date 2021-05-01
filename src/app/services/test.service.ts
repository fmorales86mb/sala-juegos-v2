import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private itemsCollection: AngularFirestoreCollection<Data>;
  items: Observable<Data[]>;    

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Data>('test');
    this.items = this.itemsCollection.valueChanges();
  }

  addItem(item: Data) {
    return this.itemsCollection.add(Object.assign({}, item));

    // let id = this.afs.createId();
    // let ref = this.itemsCollection.add(Object.assign({}, item));
    // ref.then((value) => console.log(value));
    //this.itemsCollection.doc("002").set(Object.assign({}, item));
  } 
  
  getItem(id:string){
    //this.itemsCollection.doc(id).get().subscribe((data) => console.log(data));
  }

  getAll() {
    //return this.afs.collection('test').snapshotChanges();
  }
}
