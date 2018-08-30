import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { GesAporteRoutingModule } from './ges-aportes.routing.module';
import { GesAporteComponent} from './ges-aportes.component';
import { AporteService } from '../../_services/aporteService';
import { TiposAportesService } from '../../_services/tiposAportesService';
import { PageHeaderModule } from './../../shared';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';



@NgModule({
    imports: [CommonModule,
      GesAporteRoutingModule,
      PageHeaderModule,
      NgbModule.forRoot(),
      DataTablesModule,
      FormsModule,
      ReactiveFormsModule],
    declarations: [GesAporteComponent]
})
export class GesAportesModule{}
