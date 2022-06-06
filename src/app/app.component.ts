import { HttpClient } from '@angular/common/http';
// import { Token } from '@angular/compiler';
import { Token } from 'app/models/token.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { response } from 'express';
import { url } from 'inspector';
import { DatosUsuarios } from './models/datosusuarios.interface';
import { AuthenticationService } from './services/authentication.service';
import { EventosService } from './services/eventos.service';
import { TokenService } from './services/token.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'acceso';
  public formLogin: FormGroup;
  AuthenticationService: any;
  EventosService: any;
  TokenService: any;  
  mostrarDatosUser: DatosUsuarios;
  route: any;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authentication: AuthenticationService,
    private api: AuthenticationService,
    private eventoservice: EventosService,
    private token: TokenService
  ) {}

  ngOnInit(): void {
  }
  

  pedirToken(): void{
     this.tokenService.getToken()
     this.api.getDatoUser().subscribe((responseExit: DatosUsuarios) => {
      // pedimos el ID en el localsotrage
      localStorage.setItem('UserID', responseExit.id);
    });   
}
}