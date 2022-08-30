
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConnectedUserComponent } from "./components/connected-user/connected-user.component";
import { HomeAppliComponent } from "./components/home-appli/home-appli.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { CategoriesComponent } from "./components/categories/categories.component";

const routes: Routes = [
  { path: '', redirectTo:'homeAppli', pathMatch:'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homeAppli', component: HomeAppliComponent },
  { path: 'connected-user/:id', component: ConnectedUserComponent },
  { path: 'categories', component: CategoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  RegistrationComponent,
  LoginComponent,
  HomeAppliComponent,
  CategoriesComponent
]
