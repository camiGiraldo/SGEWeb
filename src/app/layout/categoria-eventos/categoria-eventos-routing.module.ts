import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaEventosComponent } from './categoria-eventos.component';

const routes: Routes = [
    {
        path: '',
        component: CategoriaEventosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriaEventosRoutingModule {}
