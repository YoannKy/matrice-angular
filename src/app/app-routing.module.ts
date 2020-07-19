import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatriceComponent } from './matrice/matrice.component';
import { MatriceResolver } from './matrice/matrice.resolver';

const routes: Routes = [{
  path: '',
  component: MatriceComponent,
  resolve: {
    matrice: MatriceResolver,
  },
}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
