import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Token } from "app/models/token.model";
import { environment } from "environments/environment";
import { Observable, take } from "rxjs";

@Injectable({ providedIn: 'root'})
export class AuthenticationService {

    urlBase: string = environment.url;

    constructor(
        private http: HttpClient
    ){

    }

    login(username: number, password: string): Observable<Token>{
        const body = {
            username: username,
            password: password
        };

        let httpHeader = new HttpHeaders().append("Content-Type", "application/json");
        return this.http.post<Token>(this.urlBase.concat("/authentication"), body, { headers: httpHeader}).pipe(take(1));
    };
}