import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GesEgresadoRoutingModule } from './ges-egresado.routing.module';
import { GesEgresadoComponent} from './ges-egresado.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, GesEgresadoRoutingModule, PageHeaderModule, NgbModule.forRoot()],
    declarations: [GesEgresadoComponent]
})
export class GesEgresadoModule {}
