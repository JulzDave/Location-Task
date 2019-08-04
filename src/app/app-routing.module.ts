import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowLocationsComponent } from './comps/show-locations/show-locations.component';
import { ShowCategoriesComponent } from './comps/show-categories/show-categories.component';


const routes: Routes = [
  {path:"", component:ShowLocationsComponent},
  {path:"categories", component:ShowCategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
