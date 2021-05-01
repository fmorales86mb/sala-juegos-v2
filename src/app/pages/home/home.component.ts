import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from 'src/app/models/data';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loginForm: FormGroup;
  public titleGame:string;

  dataTest: Data[];

  constructor(private fb:FormBuilder, private testService:TestService) {
    this.titleGame = "Ta-Te-Ti";
   }

  clickIngresar(){
    console.log(this.loginForm);
  }

  test(){
    let item:Data = new Data();
    item.age = 20;
    item.name = "prueba 2";
    

    // this.testService.items.subscribe(data => {
    //   console.log(data);
    // });

    this.testService.addItem(item).then((d) => {console.log(d.id)});
    //this.testService.getItem("002");
    //this.testService.getAll();
    //console.log(this.dataTest);
  }

  ngOnInit(): void {
    // this.testService.getAll().subscribe(data => {
    //   this.dataTest = data.map(e => {
    //     // return {
    //     //   id: e.payload.doc.id,
    //     //   ...e.payload.doc.data()
    //     // } as Data;
    //     //return e.payload.doc.data() as Data;
    //   })
    // });

    
  }

}
