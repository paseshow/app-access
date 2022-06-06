import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.interface';
import { Token } from 'app/models/token.model';
import { Route, Router } from '@angular/router';
import { DatosUsuarios } from 'app/models/datosusuarios.interface';
import { __values } from 'tslib';
import { error } from '@angular/compiler/src/util';
// import { variationPlacements } from '@popperjs/core';

@Component({
  selector: 'app-authentications',
  templateUrl: './authentications.component.html',
  styleUrls: ['./authentications.component.css'],
})
export class AuthenticationsComponent implements OnInit {
  masterSelected: any;
  checklist: any;
  public myEye: boolean = false;
  public formLogin: FormGroup;
  mensajeLoginError = '';
  mostrarDatosUser: DatosUsuarios;

  constructor(
    private formBuilder: FormBuilder,
    private api: AuthenticationService,
    private route: Router,
    private datosUsuarios: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: [, [Validators.required]],
      password: ['', Validators.required],
    });
  }

  authentications(event: any) {
    this.api.login(this.formLogin).subscribe(
      (responseExit: Token) => {
        // almacenar en el LOCALSTORAGE
        localStorage.setItem('token', responseExit.token);
        this.route.navigate(['configurations']);

        // almacenar en el LOCALSTORAGE
          this.api.getDatoUser().subscribe((responseExit: DatosUsuarios) => {
            // pedimos el ID en el localsotrage
            localStorage.setItem('UserID', responseExit.id);
          });
      },
      (error) => {
        return (this.mensajeLoginError = '¡DNI o CONTRASEÑA INCORRECTA!');
      }
    );
  }

  //mostrar contraseña
  mostrarPass(): boolean {
    let password: any = document.getElementById('pass');
    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }

    // mostrar ojo
    return (this.myEye = !this.myEye);
  }

  iniciarSesion(): any {
    console.log(this.formLogin.value);
    this.authentications(event?.target);
  }

  mostrarUserId(event: any) {
    this.authentications;
  }
}
