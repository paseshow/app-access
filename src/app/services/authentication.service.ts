import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from 'app/models/token.model';
import { Login } from 'app/models/login.interface';
import { environment } from 'environments/environment';
import { Observable, take } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatosUsuarios } from 'app/models/datosusuarios.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  urlBase: any = environment.url;
  static value: any;

  constructor(private http: HttpClient) {}

  login(formLogin: FormGroup): Observable<Token> {
    const body = {
      ...formLogin.value,
    };

    let httpHeader = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return this.http
      .post<Token>(this.urlBase.concat(), body, {
        headers: httpHeader,
      })
      .pipe(take(1));
  }

  public getDatoUser(): Observable<DatosUsuarios> {
    return this.http.get<DatosUsuarios>(environment.url.concat('/logged'));
  }
}
