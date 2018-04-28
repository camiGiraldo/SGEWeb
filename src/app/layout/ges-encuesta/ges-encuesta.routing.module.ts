import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GesEncuenstaComponent } from './ges-encuesta.component';

const routes: Routes = [
    {
        path: '',
        component: GesEncuenstaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GesEncuestaRoutingModule {}
