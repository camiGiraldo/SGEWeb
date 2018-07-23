import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthenticationService } from './_services/authentication.service';
import { FacultadesService } from './_services/facultadesService';
import { EgresadosService } from './_services/egresadosService';
import { ProgramasService } from './_services/programasService';
import { EventosService } from './_services/eventosService';

import { DataTablesModule } from 'angular-datatables';

//Libreria para formulario tipo wizard
import { FormWizardModule } from 'angular-wizard-form';

import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DataTablesModule,
        FormsModule,
        HttpModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormWizardModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,

    ],
    declarations: [AppComponent],
    providers: [AuthGuard,
      AuthenticationService,
      FacultadesService,
      EgresadosService,ProgramasService,EventosService],
    bootstrap: [AppComponent]
})
export class AppModule {}
