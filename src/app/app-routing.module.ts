import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';


import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';
import { SearchComponent } from './pages/search/search.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
