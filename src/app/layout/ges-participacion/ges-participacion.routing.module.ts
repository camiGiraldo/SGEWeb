import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GesParticipacionComponent} from './ges-participacion.component';

const routes: Routes = [
    {
        path: '',
        component: GesParticipacionComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GesParticipacionRoutingModule {}
