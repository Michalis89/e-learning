import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { FiltersComponent } from './shared/filters/filters.component';
import { RatingComponent } from './shared/rating/rating.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './state/app.state';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HeaderSpaceComponent } from './shared/header-space/header-space.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FavouritesComponent,
    FiltersComponent,
    RatingComponent,
    ListItemsComponent,
    HeaderSpaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([AppState], { developmentMode: !environment.production }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
