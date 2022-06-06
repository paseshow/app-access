import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { response } from 'express';
import { url } from 'inspector';
import { AuthenticationService } from './services/authentication.service';
import { EventosService } from './services/eventos.service';
import { TokenService } from './services/token.service';

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

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authentication: AuthenticationService,
    private eventoservice: EventosService
  ) {}

  ngOnInit(): void {
    this.AuthenticationService.getUser().subscribe((response: any) =>
      console.log(response)
    );
  }
}
