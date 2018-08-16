import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { GesReconocimientoRoutingModule } from './ges-reconocimiento.routing.module';
import { GesReconocimientoComponent} from './ges-reconocimiento.component';
import { TiposReconocimientosService } from '../../_services/tiposReconocimientosService';
import { PageHeaderModule } from './../../shared';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';



@NgModule({
    imports: [CommonModule,
      GesReconocimientoRoutingModule,
      PageHeaderModule,
      NgbModule.forRoot(),
      DataTablesModule,
      FormsModule,
      ReactiveFormsModule],
    declarations: [GesReconocimientoComponent]
})
export class GesReconocimientoModule{}
