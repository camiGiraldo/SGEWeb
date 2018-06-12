import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { GesEgresadoRoutingModule } from './ges-egresado.routing.module';
import { GesEgresadoComponent} from './ges-egresado.component';
import { PageHeaderModule } from './../../shared';
import {
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';


@NgModule({
    imports: [CommonModule,
      GesEgresadoRoutingModule,
      PageHeaderModule,
      NgbModule.forRoot(),
      DataTablesModule,
      FormsModule, 
      ReactiveFormsModule],
    declarations: [GesEgresadoComponent]
})
export class GesEgresadoModule {}
