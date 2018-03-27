import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GesEgresadoComponent } from './ges-egresado.component';

const routes: Routes = [
    {
        path: '',
        component: GesEgresadoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GesEgresadoRoutingModule {}
