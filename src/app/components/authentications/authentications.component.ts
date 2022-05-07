import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'app/models/token.model';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-authentications',
  templateUrl: './authentications.component.html',
  styleUrls: ['./authentications.component.css']
})
export class AuthenticationsComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.authentications();
  }

  authentications(){
    this.authenticationService.login(40108490, "40108490").subscribe(
      (responseExit: Token) => {
        localStorage.setItem("token", responseExit.token);
        this.route.navigate(['configurations'])
      }, error => {

      });
  };

}
