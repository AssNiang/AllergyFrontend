
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeAppliComponent } from "./components/home-appli/home-appli.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { CategoriesComponent } from "./components/categories/categories.component";

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homeAppli', component: HomeAppliComponent },
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
