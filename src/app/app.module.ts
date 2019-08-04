import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowLocationsComponent } from './comps/show-locations/show-locations.component';
import { ShowCategoriesComponent } from './comps/show-categories/show-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowLocationsComponent,
    ShowCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
