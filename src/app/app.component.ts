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
  marker: any;
  ngOnInit(): void {

    this.flightPlanCoordinates = [
      {index: 1, latitude: 37.77184903726687, longitude: -122.21363067626953},
      {index: 2, latitude: 37.771664582389846, longitude:  -122.21332222223282},
      {index: 3, latitude: 37.77154161221617, longitude: -122.21304327249527},
      {index: 4, latitude: 37.77149284812515, longitude: -122.21293866634369},
      {index: 5, latitude: 37.771490727946556, longitude: -122.21290111541748},
      {index: 6, latitude: 37.7715712946906, longitude: -122.21283942461014},
      {index: 7, latitude: 37.77168790429624, longitude: -122.21275895833969},
      {index: 8, latitude: 37.77181935490393, longitude:  -122.21265971660614},
      {index: 9, latitude: 37.77181299439602, longitude: -122.21264094114304},
      {index: 10, latitude: 37.77160733767927, longitude: -122.21280455589294},
      {index: 11, latitude: 37.771475886694645, longitude:  -122.21289843320847},
      {index: 12, latitude: 37.77152041044142, longitude: -122.2130298614502},
      {index: 13, latitude: 37.77177483133718, longitude:  -122.21355020999908},
      {index: 14, latitude: 37.77175786997137, longitude:  -122.21356630325317},
      {index: 15, latitude: 37.77165398152084 , longitude: -122.21332222223282},
      {index: 16, latitude: 37.771475886694645, longitude: -122.21292525529861},
      {index: 17, latitude: 37.77152889115204, longitude:  -122.2128501534462},
      {index: 18, latitude: 37.77181299439602, longitude:  -122.2126516699791},
      {index: 19, latitude: 37.771810874226624 , longitude: -122.21266239881516},
      {index: 20, latitude: 37.77148436741038, longitude: -122.2128877043724},
      {index: 21, latitude: 37.77147164633643 , longitude: -122.21290916204453},
      {index: 22, latitude: 37.77159885697761, longitude:  -122.21316397190094},
      {index: 23, latitude: 37.771647620998735 , longitude: -122.2132819890976},
      {index: 24, latitude: 37.77178119184835 , longitude: -122.21353143453598},
      {index: 25, latitude: 37.77176847082546 , longitude: -122.21354216337204},
      {index: 26, latitude: 37.77156281398484 , longitude: -122.21311032772064},
      {index: 27, latitude: 37.77147376651555, longitude:  -122.21292525529861},
      {index: 28, latitude: 37.77150980955175, longitude: -122.21285820007324},
      {index: 29, latitude: 37.77179603303899, longitude: -122.21266239881516},

    ];

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
        center: {lat: 37.77184903726687, lng: -122.21363067626953},
        zoom: 20,
        mapTypeId: 'satellite'
      });
      this.map = map;
      this.polyOptions = {
        geodesic: true,
        strokeOpacity: 1,
        strokeWeight: 3,
        map: this.map
      };

      this.marker = new google.maps.Marker({
        map: this.map
      });

    });

  }

  public livePolyLines(): void {
    this.polyline = new google.maps.Polyline({
        geodesic: true,
        strokeOpacity: 1,
        strokeWeight: 3,
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
    }, (500));
  }

  addPointToPath(point: any): void {
    let latLngVar = new google.maps.LatLng(point.latitude, point.longitude);

    let path, tempPath, len, prevLatLng, pathPolyLine, index, prevPolyline, checkWhichPass;

    /**Check for Pass 7 */
    index = 0;
    while (this.passSevenPolylines && this.passSevenPolylines[index] /*&& (this.passNumber === 0)*/) {

      path = this.passSevenPolylines[index].getPath();
      pathPolyLine = new google.maps.Polyline({
        path: path
      });
      checkWhichPass = 7;
      checkWhichPass = this.checkNewPoint(latLngVar, pathPolyLine, checkWhichPass);
      if (checkWhichPass > 0) {
        break;
      }
      index++;
    }

    index = 0;
    while (this.passSixPolylines && this.passSixPolylines[index] /*&& (this.passNumber === 0)*/) {

      path = this.passSixPolylines[index].getPath();
      pathPolyLine = new google.maps.Polyline({
        path: path
      });
      checkWhichPass = 7;
      checkWhichPass = this.checkNewPoint(latLngVar, pathPolyLine, checkWhichPass);
      if (checkWhichPass > 0) {
        break;
      }
      index++;

    }
    /**Check for Pass 6 */
    index = 0;
    while (this.passFivePolylines && this.passFivePolylines[index] /*&& (this.passNumber === 0)*/) {

      path = this.passFivePolylines[index].getPath();
      pathPolyLine = new google.maps.Polyline({
        path: path
      });
      checkWhichPass = 6;
      checkWhichPass = this.checkNewPoint(latLngVar, pathPolyLine, checkWhichPass);
      if (checkWhichPass > 0) {
        break;
      }
      index++;

    }
    /**Check for Pass 5 */
    index = 0;
    while (this.passFourPolylines && this.passFourPolylines[index] /*&& (this.passNumber === 0)*/) {

      path = this.passFourPolylines[index].getPath();
      pathPolyLine = new google.maps.Polyline({
        path: path
      });
      checkWhichPass = 5;
      checkWhichPass = this.checkNewPoint(latLngVar, pathPolyLine, checkWhichPass);
      if (checkWhichPass > 0) {
        break;
      }
      index++;

    }
    /**Check for Pass 4 */
    index = 0;
    while (this.passThreePolylines && this.passThreePolylines[index] /*&& (this.passNumber === 0)*/) {

      path = this.passThreePolylines[index].getPath();
      pathPolyLine = new google.maps.Polyline({
        path: path
      });
      checkWhichPass = 4;
      checkWhichPass = this.checkNewPoint(latLngVar, pathPolyLine, checkWhichPass);
      if (checkWhichPass > 0) {
        break;
      }
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
    }

    this.marker.setMap(null);
    this.marker = new google.maps.Marker({
      position: latLngVar,
      map: this.map
    });

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

      if (google.maps.geometry.poly.isLocationOnEdge(latLngVar, pathPolyLine, 10e-7)) {
        console.log('pass:', checkWhichPass);

        passAPolylines.push(this.polyline);

        this.polyline = new google.maps.Polyline({
          geodesic: true,
          strokeOpacity: 1,
          strokeWeight: 3,
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

