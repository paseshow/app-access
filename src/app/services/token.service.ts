import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class TokenService {
    get(arg0: string, token: string) {
      throw new Error('Method not implemented.');
    }

    private token: string = '';

    getToken(): string | null {
        let valueLocalStorage = localStorage.getItem('token');

        if(!!valueLocalStorage) {
            this.token = valueLocalStorage;
            return this.token;
        }
        
        return null;
    };


}