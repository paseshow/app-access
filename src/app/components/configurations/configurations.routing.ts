import { Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';
import { ScanComponent } from './scan/scan.component';

export const Route: Routes = [
  {
    path: '',
    component: ConfigurationsComponent,
  },
  {
    path: 'scan',
    component: ScanComponent,
  },
];
