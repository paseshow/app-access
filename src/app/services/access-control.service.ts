import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { take } from "rxjs";

@Injectable({providedIn: "root"})
export class AccessControlService {

    urlBase: string = environment.url;

    constructor(
        private http: HttpClient
    ){

    }

    accessByQrCode(qrCode: string) {
        return this.http.get(this.urlBase.concat("access/qrcode/").concat(qrCode)).pipe(take(1));
    };
}