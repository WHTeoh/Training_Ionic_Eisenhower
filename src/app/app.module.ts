import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { DataProviderService } from './services/data-provider.service';

import { APP_BASE_HREF } from "@angular/common";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    DataProviderService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
