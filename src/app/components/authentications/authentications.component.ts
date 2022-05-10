import { Component, OnInit } from '@angular/core';
import { text } from 'express';

@Component({
  selector: 'app-authentications',
  templateUrl: './authentications.component.html',
  styleUrls: ['./authentications.component.css']
})
export class AuthenticationsComponent implements OnInit {
  masterSelected: any;
  checklist: any;
  constructor() { }
  public myClass: boolean = false;


  ngOnInit() {
  }

  mostrarPass(){
    //mostrar contraseña
      let password :any = document.getElementById('pass');
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      } // mostrar ojo
      return this.myClass = !this.myClass;
    }
}
