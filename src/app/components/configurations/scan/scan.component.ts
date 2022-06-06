import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { AccessControlService } from 'app/services/access-control.service';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit , AfterViewInit{

  @ViewChild(QrScannerComponent, { static: false })
  qrScannerComponent: QrScannerComponent;

  qrCode: string = '';
  data = {
    ubicacionId: '',
    evento: '',
    descuento: '',
    usuario: '',
    funcion: '',
    fecha: ''
  };

  dataCamaras: string = '';

  stopAfterScan: boolean = false;

  constructor(
    private accessControlService: AccessControlService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    navigator.mediaDevices.enumerateDevices().then( dev => {
      
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
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.onCodeResult();
  }

  onCodeResult() {

    this.qrScannerComponent.capturedQr.subscribe(result => {
      this.stopAfterScan = true;
      console.log("Scan Success -----------");
      console.log(result);
      this.qrCode = result;

      this.accessControlService.accessByQrCode(result).subscribe(
        (responseExit: any) => {
          this.data = {
            descuento: responseExit[0].descuento_sector_id.descripcion,
            evento: responseExit[0].sector_evento_id.evento_id.nombre,
            fecha: 'hoy',
            funcion: responseExit[0].sector_evento_id.descripcion,
            ubicacionId: responseExit[0].id,
            usuario: responseExit[0].reserva_id.cliente_id.nombre
          }
        }, error => {
          this.qrCode = "ERROR ---".concat(result);
      });
      this.stopAfterScan = false;
    });
    


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
