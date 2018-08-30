import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiposAportesComponent } from './tipos-aportes.component';

const routes: Routes = [
    {
        path: '',
        component: TiposAportesComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TiposAportesRoutingModule {}
