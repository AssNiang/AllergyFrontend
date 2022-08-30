import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RightSideBarComponent } from './components/right-side-bar/right-side-bar.component';
import { LeftSideBarComponent } from './components/left-side-bar/left-side-bar.component';
import { ContentComponent } from './components/content/content.component';
import { routingComponents } from "./app-routing.module";
import { HomeAppliComponent } from './components/home-appli/home-appli.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LsbDisconnectedComponent } from './components/lsb-disconnected/lsb-disconnected.component';
import { LsbConnectedUserComponent } from './components/lsb-connected-user/lsb-connected-user.component';
import { LsbConnectedSpecialistComponent } from './components/lsb-connected-specialist/lsb-connected-specialist.component';
import { AllergeneComponent } from './components/allergene/allergene.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProfilComponent } from './components/profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RightSideBarComponent,
    LeftSideBarComponent,
    ContentComponent,
    routingComponents,
    HomeAppliComponent,
    PostItemComponent,
    LsbDisconnectedComponent,
    LsbConnectedUserComponent,
    LsbConnectedSpecialistComponent,
    AllergeneComponent,
    CategoriesComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
 }
