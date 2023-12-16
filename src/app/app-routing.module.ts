import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentBranch1Component } from './component-branch1/component-branch1.component';
import { ComponentBranch2Component } from './component-branch2/component-branch2.component';
import { LogInComponent } from './users/log-in/log-in.component';
const routes: Routes = [
  {
    path: 'component1', component: ComponentBranch1Component
  },

  {
    path: 'component2', component: ComponentBranch2Component
  },
  {
    path: 'login', component: LogInComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
