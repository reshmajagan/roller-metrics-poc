import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  SimpleChanges
} from '@angular/core';

import { GoogleMapApiLoader } from './shared/google-map-api-loader';
import { LoadPathService } from './load-path.service';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnChanges {
  constructor(
    private loadPathService: LoadPathService
  ) {}

  @ViewChild('map') mapElement: any;

  title = 'app';
  poly: any = {};
  map: any = null;
  flightPlanCoordinates: any;

  ngOnInit(): void {

    this.initializeMap();
    this.flightPlanCoordinates = [
      {index: 1, lat: 37.772, lng: -122.214},
      {index: 2, lat: 21.291, lng: -157.821},
      {index: 3, lat: -18.142, lng: 178.431},
      {index: 4, lat: -27.467, lng: 153.027}
    ];

    this.loadPathService.loadPath()
      .subscribe(
        data => { console.log('successful');
                  console.log(data);
                },
        // error => { console.log(error); }
      );

  }

  ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.redrawMap && !changes.redrawMap.firstChange) {
  //     if (this.map) {
  //       const center = this.map.getCenter();
  //       setTimeout(this.resizeMap.bind(this, center), 750);
  //     }
  //   }

  //   this.initializeMap();
  }

  public initializeMap() {
    GoogleMapApiLoader.load().then((res: any) => {
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: 41.879, lng: -87.624},
         zoom: 2,
      });
      this.map = map;
      this.livePolyLines();

    });

  }

  public livePolyLines(): void {
    this.poly = new google.maps.Polyline({
      map: this.map,
      geodesic: true,
      strokeColor: 'green',
      strokeOpacity: 0.8,
      strokeWeight: 2
    });
    let i = 0;
    this.loopFunction(i);
  }

  loopFunction(i: number): void {
    setTimeout(() => {

      this.addPointToPath(this.flightPlanCoordinates[i]);
      if (++i < 4) {
        this.loopFunction(i);
      }
    }, (1000));
  }

  addPointToPath(point: any): void {
    let latLngVar = new google.maps.LatLng(point.lat, point.lng);
    this.addLatLng(latLngVar);
  }

  public polylinesOnClick(): void {
    this.poly = new google.maps.Polyline({
      map: this.map,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
  }

  // Handles click events on a map, and adds a new point to the Polyline.
  public addLatLng(latLng) {
    let path = this.poly.getPath();
    path.push(latLng);

  }
}

