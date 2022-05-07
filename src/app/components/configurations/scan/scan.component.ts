import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { AccessControlService } from 'app/services/access-control.service';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  qrCode: string = '';
  data = {
    ubicacionId: '',
    evento: '',
    descuento: '',
    usuario: '',
    funcion: '',
    fecha: ''
  };

  torchEnabled = false;
  tryHarder = false;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  constructor(
    private accessControlService: AccessControlService
  ) { }

  ngOnInit(): void {
    //this.onScanSuccess("042A89F29D565E0E0F38E40D6CE5B86D");
  }

  onCodeResult(result: string) {
    console.log("Scan Success -----------");
    console.log(result);
    this.qrCode = result;

    this.accessControlService.accessByQrCode(result).subscribe(
      (responseExit: any) => {
        this.data = {
          descuento: responseExit[0].descuento_sector_id.descripcion,
          evento:  responseExit[0].sector_evento_id.evento_id.nombre,
          fecha: 'hoy',
          funcion: responseExit[0].sector_evento_id.descripcion,
          ubicacionId: responseExit[0].id,
          usuario: responseExit[0].reserva_id.cliente_id.nombre
        }
      }, error => {

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
