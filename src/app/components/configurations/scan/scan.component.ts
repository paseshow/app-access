import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { AccessControlService } from 'app/services/access-control.service';
import { UserEventService } from 'app/services/user-event.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit, AfterViewInit {

  @ViewChild(QrScannerComponent, { static: false })
  qrScannerComponent: QrScannerComponent;

  qrCode: string = '';
  data = {
    ubicacionId: '',
    evento: '',
    descuento: '',
    usuario: '',
    funcion: ''
  };

  ingresoCorrecto: boolean = false;
  ingresoDenegado: boolean = false;
  mensaje: string = ' Error con el servidor....';
  mensajeHoraIngreso: string = ' Error con el servidor....';
  viewMensaje: boolean = false;

  stopAfterScan: boolean = false;

  configurationsUser = {
    configurations: [],
    offline: false
  };


  qrYaIgresados: string[] = [];
  qrVacio = [''];
  camare: any;
  offline: boolean;

  constructor(
    private accessControlService: AccessControlService,
    private userEventService: UserEventService
  ) {
  }

  ngOnInit(): void {
    this.userEventService.configurations.subscribe((configurations: any) => {
      
      this.configurationsUser = configurations[configurations.length - 1];
       this.configurationsUser.offline = true;
    });
  }



  ngAfterViewInit(): void {
    navigator.mediaDevices.enumerateDevices().then(dev => {

      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of dev) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('back')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.camare = choosenDev;
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.camare = videoDevices[0];
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.viewMensaje = false;
    this.onCodeResult();
  }

  onCodeResult() {

    this.qrScannerComponent.capturedQr.subscribe(result => {
      this.qrScannerComponent.stopScanning();
      this.stopAfterScan = true;
      this.ingresoCorrecto = false;
      this.ingresoDenegado = false;
      //CONDICION PARA USO DE SCAN EN OFFLINE
      if (this.configurationsUser.offline) {

        let indexResult = this.qrYaIgresados.indexOf(result);
        if (indexResult != -1) {
          //RECHAZAR INGRESO.
          this.ingresoDenegado = true;
          this.mensaje = 'YA INGRESO';
          this.stopAfterScan = true;
          this.qrScannerComponent.startScanning(this.camare);
        } else {
          //TODAVIA NO INGRESO.
          this.qrYaIgresados.push(result);
          this.mensaje = 'OK';
          this.ingresoCorrecto = true;
          this.viewMensaje = true;
          this.stopAfterScan = true;
          this.qrScannerComponent.startScanning(this.camare);
        }

      } else {
        this.accessControlService.accessByQrCode(result)
          .pipe(finalize(() => {
            this.viewMensaje = true;
            this.stopAfterScan = true;
            this.qrScannerComponent.startScanning(this.camare);
          }))
          .subscribe(
            (responseExit: any) => {

              try {
                this.configurationsUser.configurations.forEach((unaConfigirations: any) => {

                  if (unaConfigirations.id_evento != responseExit[0].sector_evento_id.evento_id.id) {
                    this.mensaje = 'EVENTO INCORRECTO';
                    this.ingresoDenegado = true;
                  } else {
                    unaConfigirations.sectores_eventos_configurations_user.forEach((unSectorEvento: any) => {
                      unSectorEvento.sectores.forEach((unSector: any) => {
                        if (unSector.id_sector != responseExit[0].sector_evento_id.sector_id.id) {
                          this.mensaje = 'SECTOR INCORRECTO';
                          this.ingresoDenegado = true;
                        } else {
                          throw 'Break';
                        }
                      });
                    });
                  }
                });
              } catch (e) {
                if (e == 'Break')
                  this.mensaje = 'OK';
                this.ingresoCorrecto = true;
              }

              this.data = {
                descuento: responseExit[0].descuento_sector_id.descripcion,
                evento: responseExit[0].sector_evento_id.evento_id.nombre,
                funcion: responseExit[0].sector_evento_id.descripcion,
                ubicacionId: responseExit[0].id,
                usuario: responseExit[0].reserva_id.cliente_id.nombre,
              }
            }, error => {

              if (error.status == 400) {
                this.mensaje = 'YA INGRESO';
                this.mensajeHoraIngreso = 'FECHA: ' + error.error[0].fecha_ingreso.substring(0, 11).replace('T', ' ')
                  + '- ' + 'HORA:' + error.error[0].fecha_ingreso.substring(10, 16).replace('T', ' ') + 'hs';
                this.ingresoDenegado = true;
                this.data = {
                  descuento: error.error[0].descuento_sector_id.descripcion,
                  evento: error.error[0].sector_evento_id.evento_id.nombre,
                  funcion: error.error[0].sector_evento_id.descripcion,
                  ubicacionId: error.error[0].id,
                  usuario: error.error[0].reserva_id.cliente_id.nombre
                }
              } else {
                this.ingresoDenegado = true;
                this.mensaje = 'ERROR EN EL SERVIDOR';
              }
            });
      }
    }
    );
  }

  onScanError(result: any) {
    console.log("Scan Error -----------");
    console.log(result);
    this.qrCode = result;
  }

  onScanComplete(result: any) {
    console.log("Scan Complete -----------");
    console.log(result);
    this.qrCode = result;
  }

}

function indexOf(data: { ubicacionId: string; evento: string; descuento: string; usuario: string; funcion: string; }) {
  throw new Error('Function not implemented.');
}
function accessByQrCode(accessByQrCode: any) {
  throw new Error('Function not implemented.');
}

