import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eventos } from 'app/models/eventos.interface';
import { SectorEventos } from 'app/models/sectoreventos.interface';
import { EventosService } from 'app/services/eventos.service';
import { SectorEventosService } from 'app/services/sectoreventos.service';
import { environment } from 'environments/environment';
import * as e from 'express';
import { response } from 'express';
import { url } from 'inspector';
import { subscribeOn } from 'rxjs';
import { Url } from 'url';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css'],
})
export class ConfigurationsComponent implements OnInit {
  eventoSeleccion: Eventos[] = [];
  selectEvento = 'Seleccione algún evento';
  selEvento: any;
  selected: any;
  valorId: string;
  mensajeLoginError: '';

  funcionSeleccion: SectorEventos[] = [];
  eventosFuncion: []; // ===> eventos.funcion.interfaces para que no repita sus valores.
  selectFuncion = 'Seleccione';

  checksSectores = [
    { Sector: 'DEMO1', checked: false },
    { Sector: 'DEMO2', checked: false },
    { Sector: 'DEMO3', checked: false },
    { Sector: 'DEMO4', checked: false },
    { Sector: 'DEMO5', checked: false },
    { Sector: 'DEMO6', checked: false },
  ];

  constructor(
    private router: Router,
    private eventosService: EventosService,
    private sectorEventosService: SectorEventosService
  ) {}

  // MOSTRAR EVENTOS
  ngOnInit(): void {
    this.eventosService.getEventos().subscribe(
      (responseExit: Eventos[]) => {
        this.eventoSeleccion = responseExit;
      },
      (error) => {}
    );

    // this.eventosFuncion.forEach(EventosFuncion => {

    // })
    // this.mostrarFunciones()
    //   // MOSTRAR FUNCIONES
    //   this.sectorEventosService.getSectorEventos().subscribe(
    //     (responseExit: SectorEventos[]) => {
    //       this.funcionSeleccion = responseExit;
    //     },
    //     (error) => {}
    //   );
  }

  mostrarFunciones(event: any) {
    this.sectorEventosService.getSectorEventos().subscribe(
      (responseExit: SectorEventos[]) => {
        this.funcionSeleccion = responseExit;
      },
      (error) => {}
    );
  }

  onScanSuccess(result: string) {
    console.log(result);
  }

  onScanError(result: Error) {
    console.log(result);
  }

  onScanResult(result: string) {
    console.log(result);
  }

  redirect() {
    this.router.navigate(['configurations', 'scan']);
  }

  //SELECCIONAR TODOS LOS CHECKS DE SECTORES
  checkOnClick(check: boolean) {
    this.checksSectores.forEach((row) => (row.checked = check));
  }

  mostrarEventoId(event: any) {
    console.log(event.target.value);
    this.mostrarFunciones(event.target.value);
  }
}
// function mostrar() {
//   throw new Error('Function not implemented.');
// }
