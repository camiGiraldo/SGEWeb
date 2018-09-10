import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute  } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'ges-egresado', loadChildren: './ges-egresado/ges-egresado.module#GesEgresadoModule' },
            { path: 'ges-encuesta/:id', loadChildren: './ges-encuesta/ges-encuesta.module#GesEncuestaeModule' },
            { path: 'facultades', loadChildren: './facultades/facultades.module#FacultadesModule' },
            { path: 'programas', loadChildren: './programas/programas.module#ProgranasModule' },
            { path: 'ges-eventos', loadChildren: './ges-eventos/ges-eventos.module#GesEventosModule' },
            { path: 'rep-egre-programa', loadChildren: './rep-egre-programa/rep-egre-programa.module#ReporteEgreProgModule' },
            { path: 'categoria-eventos', loadChildren: './categoria-eventos/categoria-eventos.module#CategoriaEventosModule' },
            { path: 'tipo-eventos', loadChildren: './tipo-eventos/tipo-eventos.module#TipoEventoModule' },
            { path: 'tipos-reconocimientos', loadChildren: './tipos-reconocimientos/tipos-reconocimientos.module#TiposReconocimientosModule' },
            { path: 'ges-reconocimiento', loadChildren: './ges-reconocimiento/ges-reconocimiento.module#GesReconocimientoModule' },
            { path: 'tipos-aportes', loadChildren: './tipos-aportes/tipos-aportes.module#TiposAportesModule' },
            { path: 'ges-aportes', loadChildren: './ges-aportes/ges-aportes.module#GesAportesModule' },
            { path: 'tipos-participacion', loadChildren: './tipos-participacion/tipos-participacion.module#TiposParticipacionModule' },
            { path: 'ges-participacion', loadChildren: './ges-participacion/ges-participacion.module#GesParticipacionModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
