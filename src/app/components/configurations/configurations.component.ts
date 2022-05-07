import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {

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
}
