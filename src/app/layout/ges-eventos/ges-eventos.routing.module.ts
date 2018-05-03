import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GesEventosComponent } from './ges-eventos.component';

const routes: Routes = [
    {
        path: '',
        component: GesEventosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GesEventosRoutingModule {}
