import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";

export class Generic<T>{
    protected itemsCollection: AngularFirestoreCollection<T>;
    items: Observable<T[]>;    

    constructor(private afs: AngularFirestore, collName:string) {
      this.itemsCollection = afs.collection<T>(collName);
      this.items = this.itemsCollection.valueChanges();
    }
  
    addItem(item: T) {
      this.itemsCollection.add(Object.assign({}, item));    
    }

    setItemWithId(item: T, id:string) {
      this.itemsCollection.doc(id).set(Object.assign({}, item));    
    }
    
    getItem(id:string){
      return this.itemsCollection.doc(id).get();
    }
}