import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatriceComponent } from './matrice/matrice.component';
import { MatriceResolver } from './matrice/matrice.resolver';
import { MatriceService } from './matrice/matrice.service';

@NgModule({
  declarations: [
    AppComponent,
    MatriceComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [MatriceResolver, MatriceService],
  bootstrap: [AppComponent],
})
export class AppModule { }
