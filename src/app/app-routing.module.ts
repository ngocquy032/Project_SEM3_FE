import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentBranch2Component } from './component-branch2/component-branch2.component';

const routes: Routes = [
  {
    path: '', component: ComponentBranch2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
