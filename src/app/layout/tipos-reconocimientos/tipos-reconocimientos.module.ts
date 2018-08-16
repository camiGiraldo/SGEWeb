import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { TiposReconocimientosRoutingModule } from './tipos-reconocimientos.routing.module';
import { TiposReconocimientosComponent} from './tipos-reconocimientos.component';
import { TiposReconocimientosService } from '../../_services/tiposReconocimientosService';
import { PageHeaderModule } from './../../shared';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';



@NgModule({
    imports: [CommonModule,
      TiposReconocimientosRoutingModule,
      PageHeaderModule,
      NgbModule.forRoot(),
      DataTablesModule,
      FormsModule,
      ReactiveFormsModule],
    declarations: [TiposReconocimientosComponent]
})
export class TiposReconocimientosModule{}
