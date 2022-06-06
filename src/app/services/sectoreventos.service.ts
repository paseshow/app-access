import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { SectorEventos } from 'app/models/sectoreventos.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SectorEventosService {
     values(values: any) {
       throw new Error('Method not implemented.');
     }
  urlBase: any = environment.url;
  static value: any;

  constructor(private http: HttpClient) {}
            
  public getSectorEventos(): Observable<SectorEventos[]> {
    return this.http.get<SectorEventos[]>(
      environment.url.concat('/userEvent/1/155/sectoreventos')
    );
  }
}
