import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { FacultadesRoutingModule } from './facultades.routing.module';
import { FacultadesComponent} from './facultades.component';
import { FacultadesService } from '../../_services/facultadesService';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';

import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, FacultadesRoutingModule, PageHeaderModule, NgbModule.forRoot(), DataTablesModule, FormsModule, ReactiveFormsModule],
    declarations: [FacultadesComponent]
})
export class FacultadesModule{}
