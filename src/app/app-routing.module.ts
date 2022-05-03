import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationsComponent } from './components/authentications/authentications.component';

const routes: Routes = [
  {
    path: 'authentications',
    component: AuthenticationsComponent
  },
  {
    path: 'configurations',
    loadChildren: () => import('./components/configurations/configurations.module').then(m => m.ConfigurationsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
