import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";

export class Generic<T>{
    private itemsCollection: AngularFirestoreCollection<T>;
    items: Observable<T[]>;    

    constructor(private afs: AngularFirestore, collName:string) {
      this.itemsCollection = afs.collection<T>(collName);
      this.items = this.itemsCollection.valueChanges();
    }
  
    addItem(item: T) {
      this.itemsCollection.add(Object.assign({}, item));    
    }
}