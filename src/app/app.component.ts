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
  passOnePolylines: Array<any> = [];
  passTwoPolylines: Array<any> = [];
  passThreePolylines: Array<any> = [];
  passFourPolylines: Array<any> = [];
  passFivePolylines: Array<any> = [];
  passSixPolylines: Array<any> = [];
  passSevenPolylines: Array<any> = [];

  polyline: any = {};
  map: any = null;
  flightPlanCoordinates: any;
  polyOptions: any;
  gpsData: any;
  passNumber: number = 0;

  ngOnInit(): void {

    this.flightPlanCoordinates = [
      {index: 1, latitude: 37.772, longitude: -122.214},
      {index: 2, latitude: 21.291, longitude: -157.821},
      {index: 3, latitude: -18.142, longitude: 178.431},
      {index: 4, latitude: -27.467, longitude: 153.027},
      {index: 5, latitude: -28.467, longitude: 153.027},
      {index: 6, latitude: -19.142, longitude: 178.431},
      {index: 7, latitude: 20.291, longitude: -157.821},
      {index: 8, latitude: 36.772, longitude: -122.214},
      {index: 9, latitude: 37.772, longitude: -122.214},
      {index: 10, latitude: 21.291, longitude: -157.821},
      {index: 11, latitude: -18.142, longitude: 178.431},
      {index: 12, latitude: -27.467, longitude: 153.027},
      {index: 13, latitude: 38.772, longitude: -122.214},
      {index: 14, latitude: 22.291, longitude: -157.821},
      {index: 15, latitude: -17.142, longitude: 178.431},
      {index: 16, latitude: -26.467, longitude: 153.027},
      {index: 17, latitude: -27.467, longitude: 153.027},
      {index: 18, latitude: -18.142, longitude: 178.431},
      {index: 19, latitude: 21.291, longitude: -157.821},
      {index: 20, latitude: 35.772, longitude: -122.214},
      {index: 21, latitude: 38.772, longitude: -122.214},
      {index: 22, latitude: 22.291, longitude: -157.821},
      {index: 23, latitude: -17.142, longitude: 178.431},
      {index: 24, latitude: -26.467, longitude: 153.027},
      {index: 25, latitude: -15.142, longitude: 178.431},
      {index: 26, latitude: -28.467, longitude: 153.027},
      {index: 27, latitude: -29.467, longitude: 153.027},
      {index: 28, latitude: -16.142, longitude: 178.431},
      {index: 29, latitude: 23.291, longitude: -157.821},
      {index: 30, latitude: 30.772, longitude: -122.214},

    ];
  //   this.flightPlanCoordinates = [
  //     {index: 0, latitude: 38.9948002, longitude: -77.4332245 },
  //     {index: 1, latitude: 38.9958232, longitude: -77.5342321},
  //     {index: 2, latitude: 39.0, longitude: -77.6342321},
  //     {index: 3, latitude: 39.1, longitude: -77.7},
  //     {index: 4, latitude: 39.0, longitude: -77.6342321},
  //     {index: 5, latitude: 38.9958232, longitude: -77.53},
  //     {index: 6, latitude: 38.9948002, longitude: -77.43322},
  //     // {index: 7, latitude: 20.291, longitude: -157.821},
  //     // {index: 8, latitude: 36.772, longitude: -122.214},
  //     // {index: 9, latitude: 37.772, longitude: -122.214},
  //     // {index: 10, latitude: 21.291, longitude: -157.821},
  // ];

    this.loadPathService.loadPath()
      .subscribe(
        data => { this.gpsData = data.gps_data;
                  this.livePolyLines();

                },
        // error => { console.log(error); }
      );
    this.initializeMap();

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  public initializeMap() {
    GoogleMapApiLoader.load().then((res: any) => {
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        // center: {lat: 38.9948002, lng: -77.4332245},
        // zoom: 11,
        center: {lat: 37.772, lng: -122.214},
        zoom: 1
      });
      this.map = map;
      this.polyOptions = {
        geodesic: true,
        strokeOpacity: 0.9,
        strokeWeight: 1,
        map: this.map
      };

    });

  }

  public livePolyLines(): void {
    this.polyline = new google.maps.Polyline({
        geodesic: true,
        strokeOpacity: 0.9,
        strokeWeight: 1,
        map: this.map,
        strokeColor: 'red'
      });

    this.loopThroughPoints(0);

  }

  loopThroughPoints(i: number): void {
    setTimeout(() => {

      // this.addPointToPath(this.gpsData[i]);
      // if (++i < (this.gpsData.length)) {
      //   this.loopThroughPoints(i);
      // }
      this.addPointToPath(this.flightPlanCoordinates[i]);
      if (++i < (this.flightPlanCoordinates.length)) {
        this.loopThroughPoints(i);
      } else {
        console.log(this.passOnePolylines);
        console.log(this.passTwoPolylines);
        console.log(this.passThreePolylines);

      }
    }, (1000));
  }

  addPointToPath(point: any): void {
    let latLngVar = new google.maps.LatLng(point.latitude, point.longitude);

    let path, tempPath, len, prevLatLng, pathPolyLine, index, prevPolyline, checkWhichPass;

    /**Check for Pass 4 */
    index = 0;
    while (this.passThreePolylines && this.passThreePolylines[index] /*&& (this.passNumber === 0)*/) {

      path = this.passThreePolylines[index].getPath();
      pathPolyLine = new google.maps.Polyline({
        path: path
      });
      checkWhichPass = 4;
      this.checkNewPoint(latLngVar, pathPolyLine, checkWhichPass);
      // if (google.maps.geometry.poly.isLocationOnEdge(latLngVar, pathPolyLine, 10e-6)) {
      //   /**Pass 4 */
      //   console.log('pass 4');

      //   // this.passNumber = 4;
      //   this.passThreePolylines.push(this.polyline);

      //   this.polyline = new google.maps.Polyline({
      //     geodesic: true,
      //     strokeOpacity: 0.9,
      //     strokeWeight: 1,
      //     map: this.map,
      //     strokeColor: '#1ABD01' // dark green color
      //   });
      //   tempPath = this.passThreePolylines[this.passThreePolylines.length - 1].getPath();
      //   len = tempPath.getLength();
      //   path = this.polyline.getPath();
      //   if (len > 0) {
      //     prevLatLng = tempPath.getAt(len - 1);
      //     path.push(prevLatLng);
      //   }
      //   path.push(latLngVar);
      //   this.passFourPolylines.push(this.polyline);
      //   break;
      // }
      index++;

    }
    /**Check for Pass 3 */
    index = 0;
    while (this.passTwoPolylines && this.passTwoPolylines[index] /*&& (this.passNumber === 0)*/) {

      path = this.passTwoPolylines[index].getPath();
      pathPolyLine = new google.maps.Polyline({
        path: path
      });
      checkWhichPass = 3;
      checkWhichPass = this.checkNewPoint(latLngVar, pathPolyLine, checkWhichPass);
      if (checkWhichPass > 0) {
        break;
      }
      // if (google.maps.geometry.poly.isLocationOnEdge(latLngVar, pathPolyLine, 10e-6)) {
      //   /**Pass 3 */
      //   console.log('pass 3');

      //   this.passNumber = 3;
      //   this.passTwoPolylines.push(this.polyline);

      //   this.polyline = new google.maps.Polyline({
      //     geodesic: true,
      //     strokeOpacity: 0.9,
      //     strokeWeight: 1,
      //     map: this.map,
      //     strokeColor: '#00FD53'
      //   });
      //   // this.polyline.strokeColor = '#00FD53'; // light green color
      //   tempPath = this.passTwoPolylines[this.passTwoPolylines.length - 1].getPath();
      //   len = tempPath.getLength();
      //   path = this.polyline.getPath();
      //   if (len > 0) {
      //     prevLatLng = tempPath.getAt(len - 1);
      //     path.push(prevLatLng);
      //   }
      //   path.push(latLngVar);
      //   this.passThreePolylines.push(this.polyline);
      //   break;
      // }
      index++;

    }
    /**Check for Pass 2 */
    index = 0;
    while (this.passOnePolylines && this.passOnePolylines[index] /*&& (this.passNumber === 0)*/) {
      path = this.passOnePolylines[index].getPath();
      pathPolyLine = new google.maps.Polyline({
        path: path
      });
      checkWhichPass = 2;
      checkWhichPass = this.checkNewPoint(latLngVar, pathPolyLine, checkWhichPass);
      if (checkWhichPass > 0) {
        break;
      }
      // if (google.maps.geometry.poly.isLocationOnEdge(latLngVar, pathPolyLine, 10e-6)) {
      //   /**Pass 2 */
      //   console.log('pass 2');

      //   this.passNumber = 2;
      //   this.passOnePolylines.push(this.polyline);

      //   this.polyline = new google.maps.Polyline({
      //     geodesic: true,
      //     strokeOpacity: 0.9,
      //     strokeWeight: 1,
      //     map: this.map,
      //     strokeColor: 'yellow'
      //   });
      //   tempPath = this.passOnePolylines[this.passOnePolylines.length - 1].getPath();
      //   len = tempPath.getLength();
      //   path = this.polyline.getPath();
      //   if (len > 0) {
      //     prevLatLng = tempPath.getAt(len - 1);
      //     path.push(prevLatLng);
      //   }
      //   path.push(latLngVar);
      //   this.passTwoPolylines.push(this.polyline);
      //   break;
      // }
      index++;

    }

    /**Check for Pass 1 */
    if (this.passNumber === 0) {
      checkWhichPass = 2;
      checkWhichPass = this.checkNewPoint(latLngVar, this.polyline, checkWhichPass);
      if (checkWhichPass === 0) {
        tempPath = this.polyline.getPath();
        tempPath.push(latLngVar);
      }
      if (google.maps.geometry.poly.isLocationOnEdge(latLngVar, this.polyline, 10e-6)) {
        /**Pass 2 qqq*/
        // console.log('second pass 2');

        // this.passNumber = 2;
        // this.passOnePolylines.push(this.polyline);

        // this.polyline = new google.maps.Polyline({
        //   geodesic: true,
        //   strokeOpacity: 0.9,
        //   strokeWeight: 1,
        //   map: this.map,
        //   strokeColor: 'yellow'
        // });

        // tempPath = this.passOnePolylines[this.passOnePolylines.length - 1].getPath();
        // len = tempPath.getLength();
        // path = this.polyline.getPath();
        // if (len > 0) {
        //   prevLatLng = tempPath.getAt(len - 1);
        //   path.push(prevLatLng);
        // }
        // path.push(latLngVar);
        // this.passTwoPolylines.push(this.polyline);
      // } else {
      //   tempPath = this.polyline.getPath();
      //   tempPath.push(latLngVar);
      }

      // this.passOnePolylines[this.passOnePolylines.length] = this.polyline;
    }

  }

  checkNewPoint(latLngVar, pathPolyLine, checkWhichPass): number {
    let passAPolylines, passBPolylines, strokeColor, tempPath, path, prevLatLng, len;
      switch (checkWhichPass) {
        // case 1:
        //   passAPolylines = this.passOnePolylines;
        //   passBPolylines = this.passTwoPolylines;
        //   strokeColor = '#F50300'; // red color
        //   break;
        case 2:
          passAPolylines = this.passOnePolylines;
          passBPolylines = this.passTwoPolylines;
          strokeColor = '#FEEB02'; // yellow color
          break;
        case 3:
          passAPolylines = this.passTwoPolylines;
          passBPolylines = this.passThreePolylines;
          strokeColor = '#00FD53'; // light green color
          break;
        case 4:
          passAPolylines = this.passThreePolylines;
          passBPolylines = this.passFourPolylines;
          strokeColor = '#1ABD01'; // dark green color
          break;
        case 5:
          passAPolylines = this.passFourPolylines;
          passBPolylines = this.passFivePolylines;
          strokeColor = '#04BDFD'; // light blue color
          break;
        case 6:
          passAPolylines = this.passFivePolylines;
          passBPolylines = this.passSixPolylines;
          strokeColor = '#0334BC'; // dark blue color
          break;
        case 7:
          passAPolylines = this.passSixPolylines;
          passBPolylines = this.passSevenPolylines;
          strokeColor = '#50007C'; // purple color
          break;
      }
        // qqq
      if (google.maps.geometry.poly.isLocationOnEdge(latLngVar, pathPolyLine, 10e-6)) {
        console.log('pass:', checkWhichPass);

        passAPolylines.push(this.polyline);

        this.polyline = new google.maps.Polyline({
          geodesic: true,
          strokeOpacity: 0.9,
          strokeWeight: 1,
          map: this.map,
          strokeColor: strokeColor
        });

        tempPath = passAPolylines[passAPolylines.length - 1].getPath();
        len = tempPath.getLength();
        path = this.polyline.getPath();
        if (len > 0) {
          prevLatLng = tempPath.getAt(len - 1);
          path.push(prevLatLng);
        }
        path.push(latLngVar);
        passBPolylines.push(this.polyline);
      } else {
        checkWhichPass = 0;
      }

      return checkWhichPass;


  }

}

