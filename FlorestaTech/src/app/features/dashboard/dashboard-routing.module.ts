import { ChartComponent } from './components/chart/chart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'graphics',
    pathMatch: 'full',
  },
  {
    path: 'graphics',
    component: ChartComponent,
    title: 'FlorestaTech - Dashboards',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
