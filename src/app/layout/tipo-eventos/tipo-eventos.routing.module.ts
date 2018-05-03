import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoEventoComponent } from './tipo-eventos.component';

const routes: Routes = [
    {
        path: '',
        component: TipoEventoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipoEventoRoutingModule {}
