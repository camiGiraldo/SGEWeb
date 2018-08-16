import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GesReconocimientoComponent } from './ges-reconocimiento.component';

const routes: Routes = [
    {
        path: '',
        component: GesReconocimientoComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GesReconocimientoRoutingModule {}
