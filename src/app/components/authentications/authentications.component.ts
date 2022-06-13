import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/services/authentication.service';
import { Token } from 'app/models/token.model';
import { Route, Router } from '@angular/router';
import { DatosUsuarios } from 'app/models/datosusuarios.interface';
import { __values } from 'tslib';
import { UserEventService } from 'app/services/user-event.service';


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
    private router: Router,
    private datosUsuarios: AuthenticationService,
    private userEventService: UserEventService
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

        this.logged();
        
      },
      (error) => {
        return (this.mensajeLoginError = '¡DNI o CONTRASEÑA INCORRECTA!');
      }
    );
  }

  //mostrar contraseña
  mostrarPass(): boolean {
    let password: any = document.getElementById('pass');
    
    password.type = password.type === 'password' ? 'text' : 'password';

    // mostrar ojo
    return this.myEye = !this.myEye;
  }

  iniciarSesion(): any {
    this.authentications(event?.target);
  }

  mostrarUserId(event: any) {
    this.authentications(event);
  };


  logged() {
    this.api.getDatoUser().subscribe((responseExit: DatosUsuarios) => {
      // pedimos el ID en el localsotrage
      localStorage.setItem('UserID', responseExit.id);
      this.getConfigurationsUser(+responseExit.id);

    });
  };

  getConfigurationsUser(userId: number) {
    this.userEventService.getConfigurationsByUser(userId).subscribe(
      (response: any) => {
        if(!!response) {
          localStorage.setItem('configurations', response.toString());
          this.userEventService.configurations.next(response);
          this.router.navigate(['configurations', 'scan']);
        }
      }, error => {

      });

  };
}
