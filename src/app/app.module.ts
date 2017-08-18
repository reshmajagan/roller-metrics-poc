import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { GOOGLE_API_KEY } from './shared/constants';
import { LoadPathService } from './load-path.service';
import { TimeSpanPipe } from './shared/pipes/time-span.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    TimeSpanPipe
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEY,
      libraries: ['geometry']
    }),
    HttpModule
  ],
  exports: [
    TimeSpanPipe
  ],
  providers: [
    LoadPathService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
