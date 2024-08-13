import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';

import { HomeListingRoutingModule } from './home-listing-routing.module';
import { HomeListingsComponent } from './home-listings/home-listings.component';
import {SharedModule} from "../shared/shared.module";
import { PropertiesComponent } from './properties/properties.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LandingPageModule } from '../landing-page/landing-page.module';

@NgModule({
  declarations: [
    HomeListingsComponent,
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    HomeListingRoutingModule,
    SharedModule,
    NgOptimizedImage,
    AsyncPipe,
    NgxSpinnerModule,
    LandingPageModule
  ]
})
export class HomeListingModule { }
