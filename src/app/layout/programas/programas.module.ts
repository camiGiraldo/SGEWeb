import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { ProgramasRoutingModule } from './programas.routing.module';
import { ProgramasComponent } from './programas.component';
import { FacultadesService } from '../../_services/facultadesService';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';

import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, ProgramasRoutingModule, PageHeaderModule, NgbModule.forRoot(), DataTablesModule, FormsModule, ReactiveFormsModule],
    declarations: [ProgramasComponent]
})
export class ProgranasModule{}
