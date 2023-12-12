import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentBranch1Component } from './component-branch1/component-branch1.component';

const routes: Routes = [
  {
    path: '', component: ComponentBranch1Component

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
