
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeAppliComponent } from "./components/home-appli/home-appli.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";

const routes: Routes = [
  { path: '', redirectTo:'homeAppli', pathMatch:'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homeAppli', component: HomeAppliComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  RegistrationComponent,
  LoginComponent,
  HomeAppliComponent
]
