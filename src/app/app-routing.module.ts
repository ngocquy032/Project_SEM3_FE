import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './fe-user/users/log-in/log-in.component';
import { SigupComponent } from './fe-user/users/sigup/sigup.component';
const routes: Routes = [

  {
    path: 'login', component: LogInComponent
  },
  {
    path: 'sigup', component: SigupComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
