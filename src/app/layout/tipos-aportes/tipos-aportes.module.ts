import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { TiposAportesRoutingModule } from './tipos-aportes.routing.module';
import { TiposAportesComponent} from './tipos-aportes.component';
import { TiposAportesService } from '../../_services/tiposAportesService';
import { PageHeaderModule } from './../../shared';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';



@NgModule({
    imports: [CommonModule,
      TiposAportesRoutingModule,
      PageHeaderModule,
      NgbModule.forRoot(),
      DataTablesModule,
      FormsModule,
      ReactiveFormsModule],
    declarations: [TiposAportesComponent]
})
export class TiposAportesModule{}
