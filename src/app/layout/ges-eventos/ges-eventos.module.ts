import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { GesEventosRoutingModule } from './ges-eventos.routing.module';
import { GesEventosComponent } from './ges-eventos.component';
import {
    ReactiveFormsModule,
    FormsModule,

} from '@angular/forms';

import { PageHeaderModule } from './../../shared';
@NgModule({
    imports: [CommonModule,
      GesEventosRoutingModule,
      PageHeaderModule,
      NgbModule.forRoot(),
      DataTablesModule,
      FormsModule, ReactiveFormsModule],
    declarations: [GesEventosComponent]
})
export class GesEventosModule {}
