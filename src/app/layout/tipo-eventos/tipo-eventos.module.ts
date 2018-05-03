import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoEventoRoutingModule } from './tipo-eventos.routing.module';
import { TipoEventoComponent } from './tipo-eventos.component';

@NgModule({
    imports: [CommonModule, TipoEventoRoutingModule],
    declarations: [TipoEventoComponent]
})
export class TipoEventoModule {}
