import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Subject, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserEventService {

    urlBase = environment.url;
    configurations = new Subject();

    constructor(
        private http: HttpClient
    ){}

    getConfigurationsByUser(userId: number) {
        return this.http.get(this.urlBase.concat('userEvent/config/').concat(userId.toString()) ).pipe(take(1));
    };


}