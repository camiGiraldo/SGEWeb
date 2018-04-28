import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GesEncuestaRoutingModule } from './ges-encuesta.routing.module';
import { GesEncuenstaComponent } from './ges-encuesta.component';

@NgModule({
    imports: [CommonModule, GesEncuestaRoutingModule],
    declarations: [GesEncuenstaComponent]
})
export class GesEncuestaeModule {}
