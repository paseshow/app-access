import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'acceso';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){
    this.init();
  }

  // validations token
  init() {
    let token = this.tokenService.getToken();

    if(token == null) {
      this.router.navigate(['authentications']);
    }
  };
}
