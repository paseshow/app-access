import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Eventos } from "app/models/eventos.interface";
// import { Eventos } from "app/models/eventos.interface";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EventosService {
  values(values: any) {
    throw new Error('Method not implemented.');
  }
  urlBase: any = environment.url;
  static value: any;

  constructor(private http: HttpClient) {}

  public getEventos(): Observable<Eventos[]> {
    return this.http.get<Eventos[]>(environment.url.concat('/userEvent/1/eventos'));
  }
    
    
    
    
}