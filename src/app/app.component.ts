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
  passThreePolylines: Array<any>;

  polyline: any = {};
  passTwoPoly: any = {};
  map: any = null;
  flightPlanCoordinates: any;
  polyOptions: any;
  gpsData: any;

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
        data => { this.gpsData = data;
                },
        // error => { console.log(error); }
      );

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  public initializeMap() {
    GoogleMapApiLoader.load().then((res: any) => {
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: 41.879, lng: -87.624},
         zoom: 2,
      });
      this.map = map;
      this.polyOptions = {
        geodesic: true,
        strokeOpacity: 1,
        strokeWeight: 1,
        map: this.map

      };
      this.livePolyLines();

    });

  }

  public livePolyLines(): void {
    this.polyline = new google.maps.Polyline(this.polyOptions);
    this.polyline.strokeColor = 'red';

    this.loopThroughPoints(0);
  }

  loopThroughPoints(i: number): void {
    setTimeout(() => {

      this.addPointToPath(this.flightPlanCoordinates[i]);
      if (++i < (this.flightPlanCoordinates.length)) {
        this.loopThroughPoints(i);
      }
    }, (1000));
  }

  addPointToPath(point: any): void {
    let latLngVar = new google.maps.LatLng(point.lat, point.lng);

    let path, len, prevLatLng, pathPolyLine;

    // Check Pass 3
    path = this.passThreePolylines[0].getPath();
    pathPolyLine = new google.maps.Polyline({
      path: path
    });

    if (!google.maps.geometry.poly.isLocationOnEdge(latLngVar, pathPolyLine, 10e-1)) {

      // Check Pass 2
      path = this.passTwoPolylines[0].getPath();
      pathPolyLine = new google.maps.Polyline({
        path: path
      });
      if (!google.maps.geometry.poly.isLocationOnEdge(latLngVar, pathPolyLine, 10e-1)) {

        /**Pass 1 */
        path = this.passOnePolylines[0].getPath();
        pathPolyLine = new google.maps.Polyline({
          path: path
        });
        if (!google.maps.geometry.poly.isLocationOnEdge(latLngVar, pathPolyLine, 10e-1)) {
          this.polyline.push(latLngVar);
        } else {
          /**Pass 2 */
          this.passOnePolylines.push(this.polyline);
          path = this.polyline.getPath();
          len = path.getLength();
          this.polyline = new google.maps.Polyline(this.polyOptions);
          this.polyline.strokeColor = 'yellow';
          if (len > 0) {
            prevLatLng = path.getAt(len - 1);
            this.polyline.path.push(prevLatLng);
          }
          this.polyline.path.push(latLngVar);
        }
      } else {
        /**Pass 3 */
        this.passTwoPolylines.push(this.polyline);
        path = this.polyline.getPath();
        len = path.getLength();
        this.polyline = new google.maps.Polyline(this.polyOptions);
        this.polyline.strokeColor = '#00FD53'; // light green color
        if (len > 0) {
          prevLatLng = path.getAt(len - 1);
          this.polyline.path.push(prevLatLng);
        }
        this.polyline.path.push(latLngVar);
      }
    } else {
      /**Last pass itself */
    }

  }

}

