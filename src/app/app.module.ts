import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './shared/components/components.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ServerErrorInterceptor } from './core/interceptors/server-error.interceptor';
import { FullCalendarModule } from '@fullcalendar/angular';


// 👇 importa el paquete de localización
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

// 👇 registra los datos de "es"
registerLocaleData(localeEs);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    SweetAlert2Module.forRoot(),
    FullCalendarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-ES' } // 👈 define la app en español
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
