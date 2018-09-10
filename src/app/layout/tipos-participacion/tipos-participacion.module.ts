import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { TiposParticipacionRoutingModule } from './tipos-participacion.routing.module';
import { TiposParticipacionComponent} from './tipos-participacion.component';
import { TiposParticipacionService } from '../../_services/tiposParticipacionService';
import { PageHeaderModule } from './../../shared';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';



@NgModule({
    imports: [CommonModule,
      TiposParticipacionRoutingModule,
      PageHeaderModule,
      NgbModule.forRoot(),
      DataTablesModule,
      FormsModule,
      ReactiveFormsModule],
    declarations: [TiposParticipacionComponent]
})
export class TiposParticipacionModule{}
