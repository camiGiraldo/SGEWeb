import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { PageHeaderModule } from './../../shared';


import { ReportesComponent } from './reportes.component';
import { ReportesRoutingModule } from './reportes.routing.module';


@NgModule({
    imports: [CommonModule, ReportesRoutingModule,PageHeaderModule,DataTablesModule],
    declarations: [ReportesComponent]
})
export class ReportesModule {}
