import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramasComponent } from './programas.component';

const routes: Routes = [
    {
        path: '',
        component: ProgramasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgramasRoutingModule {}
