import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { TipoEventoRoutingModule } from './tipo-eventos.routing.module';
import { TipoEventoComponent } from './tipo-eventos.component';
import { CategoriasEventosService } from '../../_services/categoriasEventosService';
import { PageHeaderModule } from './../../shared';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';

@NgModule({
    imports: [CommonModule, 
        TipoEventoRoutingModule,
        PageHeaderModule,
        NgbModule.forRoot(),
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule],
    declarations: [TipoEventoComponent]
})
export class TipoEventoModule {}
