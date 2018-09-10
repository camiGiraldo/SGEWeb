import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { GesParticipacionRoutingModule } from './ges-participacion.routing.module';
import { GesParticipacionComponent} from './ges-participacion.component';
import { AporteService } from '../../_services/aporteService';
import { TiposParticipacionService } from '../../_services/tiposParticipacionService';
import { PageHeaderModule } from './../../shared';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';



@NgModule({
    imports: [CommonModule,
      GesParticipacionRoutingModule,
      PageHeaderModule,
      NgbModule.forRoot(),
      DataTablesModule,
      FormsModule,
      ReactiveFormsModule],
    declarations: [GesParticipacionComponent]
})
export class GesParticipacionModule{}
