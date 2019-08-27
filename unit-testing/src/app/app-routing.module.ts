import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JokesComponent } from './jokes/jokes.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/jokes', pathMatch: 'full'
  },
  {
    path: 'jokes', component: JokesComponent
  },
  {
    path: '**', redirectTo: '/jokes', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
