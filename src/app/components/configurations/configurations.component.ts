import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {

  checksEvento = [
    {evento: 'DEMO1', checked: false},
    {evento: 'DEMO2', checked: false},
    {evento: 'DEMO3', checked: false},
    {evento: 'DEMO4', checked: false},
    {evento: 'DEMO5', checked: false},
    {evento: 'DEMO6', checked: false}
  ];
  

  constructor(
    private router: Router
  ) { }

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

  redirect() {
    this.router.navigate(['configurations','scan']);
  };

  checkOnClick(check: boolean) {
    this.checksEvento.forEach(row => row.checked = check);
  }
}
