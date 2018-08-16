import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { PageHeaderModule } from './../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ReporteEgreProgComponent } from './rep-egre-programa.component';
import { ReporteEgreProgRoutingModule } from './rep-egre-programa.routing.module';


@NgModule({
    imports: [CommonModule, ReporteEgreProgRoutingModule,PageHeaderModule,DataTablesModule, FormsModule,                               // <========== Add this line!
    ReactiveFormsModule],
    declarations: [ReporteEgreProgComponent]
})
export class ReporteEgreProgModule {}
