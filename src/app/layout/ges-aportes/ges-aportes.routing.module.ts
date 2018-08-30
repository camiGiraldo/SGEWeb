import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GesAporteComponent} from './ges-aportes.component';

const routes: Routes = [
    {
        path: '',
        component: GesAporteComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GesAporteRoutingModule {}
