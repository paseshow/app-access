import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationsComponent } from './components/authentications/authentications.component';
import { ScanComponent } from './components/scan/scan.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationsComponent,
    ScanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
