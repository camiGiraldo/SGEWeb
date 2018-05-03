import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GesEventosRoutingModule } from './ges-eventos.routing.module';
import { GesEventosComponent } from './ges-eventos.component';

@NgModule({
    imports: [CommonModule, GesEventosRoutingModule],
    declarations: [GesEventosComponent]
})
export class GesEventosModule {}
