import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaEventosRoutingModule } from './categoria-eventos-routing.module';
import { CategoriaEventosComponent } from './categoria-eventos.component';

@NgModule({
    imports: [CommonModule, CategoriaEventosRoutingModule],
    declarations: [CategoriaEventosComponent]
})
export class CategoriaEventosModule {}
