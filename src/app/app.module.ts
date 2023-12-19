import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentBranch1Component } from './component-branch1/component-branch1.component';
import { ComponentBranch2Component } from './component-branch2/component-branch2.component';
import { LogInComponent } from './users/log-in/log-in.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SigupComponent } from './users/sigup/sigup.component';
@NgModule({
  declarations: [
    AppComponent,
    ComponentBranch1Component,
    ComponentBranch2Component,
    LogInComponent,
    SigupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
