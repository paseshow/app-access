import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  qrCode: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  onScanSuccess(result: string) {
    console.log("Scan Success -----------");
    console.log(result);
    this.qrCode = result;
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
