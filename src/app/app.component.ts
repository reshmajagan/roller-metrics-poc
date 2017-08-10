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
  passOnePolylines: Array<any>;
  passTwoPolylines: Array<any>;
  poly: any = {};
  passTwoPoly: any = {};
  map: any = null;
  flightPlanCoordinates: any;

  ngOnInit(): void {

    this.initializeMap();
    this.flightPlanCoordinates = [
      {index: 1, lat: 37.772, lng: -122.214},
      {index: 2, lat: 21.291, lng: -157.821},
      {index: 3, lat: -18.142, lng: 178.431},
      {index: 4, lat: -27.467, lng: 153.027},
      {index: 5, lat: -28.467, lng: 153.027},
      {index: 6, lat: -19.142, lng: 178.431},
      {index: 7, lat: 20.291, lng: -157.821},
      {index: 8, lat: 36.772, lng: -122.214},
      {index: 9, lat: 37.772, lng: -122.214},
      {index: 10, lat: 21.291, lng: -157.821},
      {index: 11, lat: -18.142, lng: 178.431},
      {index: 12, lat: -27.467, lng: 153.027}

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
      strokeColor: 'red',
      strokeOpacity: 0.8,
      strokeWeight: 1
    });
    this.passTwoPoly = new google.maps.Polyline({
      map: this.map,
      geodesic: true,
      strokeColor: 'yellow',
      strokeOpacity: 0.8,
      strokeWeight: 1
    });
    let i = 0;
    this.loopFunction(i);
  }

  loopFunction(i: number): void {
    setTimeout(() => {

      this.addPointToPath(this.flightPlanCoordinates[i]);
      if (++i < (this.flightPlanCoordinates.length)) {
        this.loopFunction(i);
      }
    }, (1000));
  }

  addPointToPath(point: any): void {
    let latLngVar = new google.maps.LatLng(point.lat, point.lng);
    let passOnePath = this.poly.getPath();
    let passTwoPath = this.passTwoPoly.getPath();
    let pathPolyLine = new google.maps.Polyline({
      path: passOnePath
    });
    // Checking for repeated passes
    if (google.maps.geometry.poly.isLocationOnEdge(latLngVar, pathPolyLine, 10e-1)) {
      let len = passOnePath.getLength();
      if (len > 0) {
        let prevLatLng = passOnePath.getAt(len - 1);
        passTwoPath.push(prevLatLng);

      }
      passTwoPath.push(latLngVar);
    } else {
      let len = passTwoPath.getLength();

      if (len > 0) {
        let prevLatLng = passTwoPath.getAt(len - 1);
        passTwoPath.push(prevLatLng);
      }
      passOnePath.push(latLngVar);
    }
  }

}

