import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { GesEgresadoRoutingModule } from './ges-egresado.routing.module';
import { GesEgresadoComponent} from './ges-egresado.component';
import { PageHeaderModule } from './../../shared';
import { FormWizardModule } from 'angular-wizard-form';
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
      FormWizardModule,
      ReactiveFormsModule],
    declarations: [GesEgresadoComponent]
})
export class GesEgresadoModule {}
