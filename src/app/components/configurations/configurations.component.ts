import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

  checksEvento = [
    {evento: 'DEMO1', checked: false},
    {evento: 'DEMO2', checked: false},
    {evento: 'DEMO3', checked: false},
    {evento: 'DEMO4', checked: false},
    {evento: 'DEMO5', checked: false},
    {evento: 'DEMO6', checked: false}
  ];
  
  checkOnClick(check: boolean) {
    this.checksEvento.forEach(row => row.checked = check);
  }
}
