import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  SimpleChanges
} from '@angular/core';

import { GoogleMapApiLoader } from './shared/google-map-api-loader';
import { LoadPathService } from './load-path.service';
import { SliderComponent } from './slider/slider.component';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnChanges {
  constructor(
    private loadPathService: LoadPathService
  ) {}

  @ViewChild('map') mapElement: any;
  @ViewChild('slider') slider: SliderComponent;

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
  duration: number;
  timeElapsed: number = 0;
  isVideoPlaying: boolean = false;
  videoIndex: number = 0;
  zoomScaleIndex: Array<any> = [];

  ngOnInit(): void {

    this.zoomScaleIndex = [
      {zoom: 1, polylineWidth: 1},
      {zoom: 2, polylineWidth: 1},
      {zoom: 3, polylineWidth: 1},
      {zoom: 4, polylineWidth: 1},
      {zoom: 5, polylineWidth: 1},
      {zoom: 6, polylineWidth: 1},
      {zoom: 7, polylineWidth: 1},
      {zoom: 8, polylineWidth: 1},
      {zoom: 9, polylineWidth: 1},
      {zoom: 10, polylineWidth: 1},
      {zoom: 11, polylineWidth: 1},
      {zoom: 12, polylineWidth: 1},
      {zoom: 13, polylineWidth: 1},
      {zoom: 14, polylineWidth: 1},
      {zoom: 15, polylineWidth: 1},
      {zoom: 16, polylineWidth: 1.5},
      {zoom: 17, polylineWidth: 3},
      {zoom: 18, polylineWidth: 6},
      {zoom: 19, polylineWidth: 12},
      {zoom: 20, polylineWidth: 24}
    ];

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
                  this.initializeMap();
                },
        // error => { console.log(error); }
      );
    

    this.duration = 30; // set this as video duration

  }

  // resizeMap(center: any): void {
  //   google.maps.event.trigger(this.map, 'resize');
  //   this.map.setCenter(center);
    
  // }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.redrawMap && !changes.redrawMap.firstChange) {
      
    //   if (this.map) {
        
    //     const center = this.map.getCenter();
    //     setTimeout(this.resizeMap.bind(this, center), 750);
    //   }
    // }
  }

  public initializeMap() {
    GoogleMapApiLoader.load().then((res: any) => {
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        // center: {lat: 37.771490727946556, lng: -122.21290111541748},
        center: {lat: Number(this.gpsData[0].latitude), lng: Number(this.gpsData[0].longitude)},
        zoom: 19,
        mapTypeId: 'satellite',
        scaleControl: true
      });
      this.map = map;
      this.polyOptions = {
        geodesic: true,
        strokeOpacity: 1,
        strokeWeight: this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth,
        map: this.map
      };

      this.marker = new google.maps.Marker({
        map: this.map
      });

    });

  }

  public livePolyLines(): void {
    console.log(this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth);
    
    this.polyline = new google.maps.Polyline({
        geodesic: true,
        strokeOpacity: 1,
        strokeWeight: this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth,
        map: this.map,
        strokeColor: 'yellow' // yellow color
      });

    this.loopThroughPoints(this.videoIndex);

  }

  loopThroughPoints(i: number): void {
    if (this.isVideoPlaying) {
      setTimeout(() => {

        this.addPointToPath(this.gpsData[i]);
        if (++i < (this.gpsData.length)) {
          this.loopThroughPoints(i);
        }
        // this.addPointToPath(this.flightPlanCoordinates[i]);
        // if (++i < (this.flightPlanCoordinates.length)) {
        //   this.loopThroughPoints(i);
        // } else {}
      }, (100)); /**Rough time gap between each given coordinates*/
    } else {
      /**For drawing a continuous path */
      this.videoIndex = --i;
    }
  }

  addPointToPath(point: any): void {
    let latLngVar = new google.maps.LatLng(point.latitude, point.longitude);

    let path, tempPath, len, prevLatlng, startPoint, endPoint, midPoint, midLatlng, pathPolyLine, index, prevPolyline, checkWhichPass;
    let projection = this.map.getProjection();
    /**Finding mid-point of polyline */
    tempPath = this.polyline.getPath();
    len = tempPath.getLength();
    prevLatlng = tempPath.getAt(len - 1);
    midLatlng = null;
    if (prevLatlng) {
      /**If polyline path is not null */
      startPoint = projection.fromLatLngToPoint(prevLatlng);
      endPoint = projection.fromLatLngToPoint(latLngVar);
      midPoint = new google.maps.Point(
        (startPoint.x + endPoint.x) / 2,
        (startPoint.y + endPoint.y) / 2
      );
      midLatlng = projection.fromPointToLatLng(midPoint);
    }

    /**Check for Pass 7 */
    index = 0;
    while (this.passSevenPolylines && this.passSevenPolylines[index] /*&& (this.passNumber === 0)*/) {

      path = this.passSevenPolylines[index].getPath();
      pathPolyLine = new google.maps.Polyline({
        path: path
      });
      checkWhichPass = 7;
      checkWhichPass = this.checkNewPoint(midLatlng, latLngVar, pathPolyLine, checkWhichPass);
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
      checkWhichPass = this.checkNewPoint(midLatlng, latLngVar, pathPolyLine, checkWhichPass);
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
      checkWhichPass = this.checkNewPoint(midLatlng, latLngVar, pathPolyLine, checkWhichPass);
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
      checkWhichPass = this.checkNewPoint(midLatlng, latLngVar, pathPolyLine, checkWhichPass);
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
      checkWhichPass = this.checkNewPoint(midLatlng, latLngVar, pathPolyLine, checkWhichPass);
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
      checkWhichPass = this.checkNewPoint(midLatlng, latLngVar, pathPolyLine, checkWhichPass);
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
      checkWhichPass = this.checkNewPoint(midLatlng, latLngVar, pathPolyLine, checkWhichPass);
      if (checkWhichPass > 0) {
        break;
      }
      index++;

    }

    /**Check for Pass 1 */
    if (this.passNumber === 0) {
      checkWhichPass = 2;
      checkWhichPass = this.checkNewPoint(midLatlng, latLngVar, this.polyline, checkWhichPass);
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

  checkNewPoint(midLatlng, latLngVar, pathPolyLine, checkWhichPass): number {
    let passAPolylines, passBPolylines, strokeColor, tempPath, path, prevLatLng, len;
      switch (checkWhichPass) {

        case 2:
          passAPolylines = this.passOnePolylines;
          passBPolylines = this.passTwoPolylines;
          strokeColor = '#00FD53'; // light green color
          break;
        case 3:
          passAPolylines = this.passTwoPolylines;
          passBPolylines = this.passThreePolylines;
          strokeColor = '#04BDFD'; // light blue color
          break;
        case 4:
          passAPolylines = this.passThreePolylines;
          passBPolylines = this.passFourPolylines;
          // strokeColor = '#1ABD01'; // dark green color
          strokeColor = '#0334BC'; // dark blue color
          break;
        case 5:
          passAPolylines = this.passFourPolylines;
          passBPolylines = this.passFivePolylines;
          strokeColor = '#50007C'; // purple color
          break;
        case 6:
          passAPolylines = this.passFivePolylines;
          passBPolylines = this.passSixPolylines;
          strokeColor = 'red'; // red color
          break;
        case 7:
          passAPolylines = this.passSixPolylines;
          passBPolylines = this.passSevenPolylines;
          strokeColor = 'brown'; // brown color
          break;
      }

      /**checking mid-point of polyline */
      if (midLatlng && google.maps.geometry.poly.isLocationOnEdge(midLatlng, pathPolyLine, 10e-7)) {
        /**Checking new LatLng point */
        if (google.maps.geometry.poly.isLocationOnEdge(latLngVar, pathPolyLine, 10e-10)) {
          // console.log('pass:', checkWhichPass);

          passAPolylines.push(this.polyline);

          this.polyline = new google.maps.Polyline({
            geodesic: true,
            strokeOpacity: 1,
            strokeWeight: this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth,
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
      } else {
        checkWhichPass = 0;
      }

      return checkWhichPass;


  }

  seek(time: number): void {
    if (time <= this.duration) {
      this.timeElapsed = time;
    }
    console.log(time);
  }

  /**Method to play or pause video */
  togglePlay(): void {
    this.isVideoPlaying = !this.isVideoPlaying;
    if (this.isVideoPlaying) {
      this.livePolyLines();
    }
    console.log(this.gpsData[this.videoIndex]);
    
  }

}
