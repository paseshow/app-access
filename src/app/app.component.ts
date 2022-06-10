import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DatosUsuarios } from './models/datosusuarios.interface';
import { AuthenticationService } from './services/authentication.service';
import { TokenService } from './services/token.service';
import { UserEventService } from './services/user-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Paseshow';

  constructor(
    private tokenService: TokenService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private userEventService: UserEventService
  ) { }

  ngOnInit(): void {
    this.pedirToken();
  }


  pedirToken(): void {
    let token = this.tokenService.getToken();

    if (token) {
      this.authenticationService.getDatoUser().subscribe((responseExit: DatosUsuarios) => {
        localStorage.setItem('UserID', responseExit.id);

        this.getConfigurationsUser(+responseExit.id);
      });
    } else {
      this.router.navigate(['authentications'])
    }
  };

  getConfigurationsUser(userId: number) {
    this.userEventService.getConfigurationsByUser(userId).subscribe(
      (response: any) => {
        if(!!response) {
          localStorage.setItem('configurations', JSON.stringify(response));
          this.userEventService.configurations.next(response);
          this.router.navigate(['configurations', 'scan']);
        }
      }, error => {

      });

  };


}