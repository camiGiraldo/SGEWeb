import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteEgreProgComponent } from './rep-egre-programa.component';

const routes: Routes = [
    {
        path: '',
        component: ReporteEgreProgComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReporteEgreProgRoutingModule {}
