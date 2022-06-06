import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboar',
  templateUrl: './dashboar.component.html',
  styleUrls: ['./dashboar.component.css']
})
export class DashboarComponent implements OnInit {
  route: any;

  constructor() { }

  ngOnInit(): void {
  }

  irConfig() {
    this.route.navigate(['configurations']);
  }

}
