import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { CategoriaEventosRoutingModule } from './categoria-eventos-routing.module';
import { CategoriaEventosComponent } from './categoria-eventos.component';
import { CategoriasEventosService } from '../../_services/categoriasEventosService';
import { PageHeaderModule } from './../../shared';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';

@NgModule({
    imports: [CommonModule, 
        CategoriaEventosRoutingModule,
        PageHeaderModule,
        NgbModule.forRoot(),
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule],
    declarations: [CategoriaEventosComponent]
})
export class CategoriaEventosModule {}
