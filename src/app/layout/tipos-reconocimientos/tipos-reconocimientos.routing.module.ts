import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiposReconocimientosComponent } from './tipos-reconocimientos.component';

const routes: Routes = [
    {
        path: '',
        component: TiposReconocimientosComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TiposReconocimientosRoutingModule {}
