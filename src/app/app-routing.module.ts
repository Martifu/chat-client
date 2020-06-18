import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { SalasComponent } from './pages/salas/salas.component';
import { SalaComponent } from './pages/sala/sala.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'unirseSala', component: SalasComponent },
  { path: 'sala/:nombre', component: SalaComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
