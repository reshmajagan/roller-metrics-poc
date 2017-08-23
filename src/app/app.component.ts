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

  allPasses: Array<any> = [];

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
  zoomLevel: number;

  ngOnInit(): void {

    /**Considering width of Asphalt roller as 2 meters*/
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
      {zoom: 16, polylineWidth: 1},
      {zoom: 17, polylineWidth: 1},
      {zoom: 18, polylineWidth: 3},
      {zoom: 19, polylineWidth: 6},
      {zoom: 20, polylineWidth: 12},
      {zoom: 21, polylineWidth: 24},
      {zoom: 22, polylineWidth: 24},
      {zoom: 23, polylineWidth: 24},
      {zoom: 24, polylineWidth: 24}
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
      {index: 10, latitude: 37.77160733767927, longitude: -122.21280455589294},
      {index: 9, latitude: 37.77181299439602, longitude: -122.21264094114304},
      {index: 8, latitude: 37.77181935490393, longitude:  -122.21265971660614},
      {index: 7, latitude: 37.77168790429624, longitude: -122.21275895833969},
      {index: 6, latitude: 37.7715712946906, longitude: -122.21283942461014},
      {index: 5, latitude: 37.771490727946556, longitude: -122.21290111541748},
      {index: 4, latitude: 37.77149284812515, longitude: -122.21293866634369},
      {index: 3, latitude: 37.77154161221617, longitude: -122.21304327249527},
      {index: 2, latitude: 37.771664582389846, longitude:  -122.21332222223282},
      {index: 1, latitude: 37.77184903726687, longitude: -122.21363067626953},

      {index: 1, latitude: 37.77184903726687, longitude: -122.21463067626953},
      {index: 2, latitude: 37.771664582389846, longitude:  -122.21432222223282},
      {index: 3, latitude: 37.77154161221617, longitude: -122.21404327249527},
      {index: 4, latitude: 37.77149284812515, longitude: -122.21393866634369},
      {index: 5, latitude: 37.771490727946556, longitude: -122.21390111541748},
      {index: 6, latitude: 37.7715712946906, longitude: -122.21383942461014},
      {index: 7, latitude: 37.77168790429624, longitude: -122.21375895833969},
      {index: 8, latitude: 37.77181935490393, longitude:  -122.21365971660614},
      {index: 9, latitude: 37.77181299439602, longitude: -122.21364094114304},
      {index: 10, latitude: 37.77160733767927, longitude: -122.21380455589294},
      {index: 10, latitude: 37.77160733767927, longitude: -122.21380455589294},
      {index: 9, latitude: 37.77181299439602, longitude: -122.21364094114304},
      {index: 8, latitude: 37.77181935490393, longitude:  -122.21365971660614},
      {index: 7, latitude: 37.77168790429624, longitude: -122.21375895833969},
      {index: 6, latitude: 37.7715712946906, longitude: -122.21383942461014},
      {index: 5, latitude: 37.771490727946556, longitude: -122.21390111541748},
      {index: 4, latitude: 37.77149284812515, longitude: -122.21393866634369},
      {index: 3, latitude: 37.77154161221617, longitude: -122.21404327249527},
      {index: 2, latitude: 37.771664582389846, longitude:  -122.21432222223282},
      {index: 1, latitude: 37.77184903726687, longitude: -122.21463067626953},

    ];

    this.allPasses = [
      this.passOnePolylines,
      this.passTwoPolylines,
      this.passThreePolylines,
      this.passFourPolylines,
      this.passFivePolylines,
      this.passSixPolylines,
      this.passSevenPolylines
    ];

    this.initializeMap();

    this.loadPathService.loadPath()
      .subscribe(
        data => {
          this.gpsData = data.gps_data;
          this.map.setCenter(new google.maps.LatLng(Number(this.gpsData[0].latitude), Number(this.gpsData[0].longitude)));
        },
        // error => { console.log(error); }
      );

    this.duration = 30; // set this as video duration
  }

  // resizeMap(center: any): void {
  //   google.maps.event.trigger(this.map, 'resize');
  //   this.map.setCenter(center);
  // }
  
  ngOnChanges(): void {
    // if (changes.redrawMap && !changes.redrawMap.firstChange) {
    //   if (this.map) {
    //     const center = this.map.getCenter();
    //     setTimeout(this.resizeMap.bind(this, center), 750);
    //   }
    // }
  }

  public initializeMap() {
    this.zoomLevel = 19; // Initial zoom level

    GoogleMapApiLoader.load().then((res: any) => {
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        // center: {lat: 37.771490727946556, lng: -122.21290111541748},
        zoom: this.zoomLevel,
        mapTypeId: 'satellite',
        scaleControl: true
      });
      this.map = map;
      this.polyOptions = {
        geodesic: true,
        strokeOpacity: 1,
        strokeWeight: this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth,
        map: this.map,
        zIndex: 1
      };

      this.polyline = new google.maps.Polyline({
        geodesic: true,
        strokeOpacity: 1,
        strokeWeight: this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth,
        map: this.map,
        strokeColor: 'yellow', // yellow color
        zIndex: 1
      });
      this.marker = new google.maps.Marker({
        map: this.map
      });

      google.maps.event.addListener(this.map, 'zoom_changed', () => {
        let prevZoom = this.zoomLevel;
        this.zoomLevel = this.map.getZoom();
        if ((this.zoomLevel < 16 && prevZoom < 16) || (this.zoomLevel === prevZoom)) {
          /**Redrawing of polylines not needed */
        } else {
          /**Redraw all current polylines */
          this.removePolylines();
          this.redrawPolylines();
        }
      });
    });
  }

  /**Method to loop through all LatLng points */
  loopThroughPoints(index: number): void {
    this.videoIndex = index;
    if (this.isVideoPlaying) {
      setTimeout(() => {

        this.addPointToPath(this.gpsData[index]);
        if (++index < (this.gpsData.length)) {
          this.loopThroughPoints(index);
        }
        // this.addPointToPath(this.flightPlanCoordinates[index]);
        // if (++index < (this.flightPlanCoordinates.length)) {
        //   this.loopThroughPoints(index);
        // } else {}
      }, (100)); /**100 ms is the rough time gap between each given coordinates*/
    } else {
      /**For drawing a continuous path */
    }
  }

  /**Method to add LatLng point to path */
  addPointToPath(point: any): void {
    let latLngVar = new google.maps.LatLng(point.latitude, point.longitude);

    let path, tempPath, len, prevLatlng, startPoint, endPoint, midPoint, midLatlng;
    let projection = this.map.getProjection();
    let passXPolylines, pathPolyLine, index, prevPolyline, checkWhichPass;
    /**Finding mid-point of polyline */
    tempPath = this.polyline.getPath();
    len = tempPath.getLength();
    prevLatlng = tempPath.getAt(len - 1);
    midLatlng = null;
    if (prevLatlng) {
      /**If polyline path is not null calculate mid-point*/
      startPoint = projection.fromLatLngToPoint(prevLatlng);
      endPoint = projection.fromLatLngToPoint(latLngVar);
      midPoint = new google.maps.Point(
        (startPoint.x + endPoint.x) / 2,
        (startPoint.y + endPoint.y) / 2
      );
      midLatlng = projection.fromPointToLatLng(midPoint);
    }

    /**Loop to check each pass, from Pass 7 to Pass 1 */
    for (let i = 7; i > 0; i--) {
      index = 0;
      passXPolylines = this.allPasses[i - 1];
      while (passXPolylines && passXPolylines[index]) {

        path = passXPolylines[index].getPath();
        pathPolyLine = new google.maps.Polyline({
          path: path
        });
        if (i === 7) {
          /**For last pass */
          checkWhichPass = i;
        } else {
          /**For all other passes */
          checkWhichPass = i + 1;
        }

        this.passNumber = this.checkNewPoint(midLatlng, latLngVar, pathPolyLine, checkWhichPass);
        if (this.passNumber > 0) {
          break;
        }
        index++;
      }
    }

    /**Check for Pass 1 */
    if (this.passNumber === 0) {
      let prevLatLng;
      this.passOnePolylines.push(this.polyline);
      this.polyline = new google.maps.Polyline({
        geodesic: true,
        strokeOpacity: 1,
        strokeWeight: this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth,
        map: this.map,
        strokeColor: 'yellow',
        zIndex: 1 // set zIndex as pass number for each path
      });
      tempPath = this.passOnePolylines[this.passOnePolylines.length - 1].getPath();
      len = tempPath.getLength();
      path = this.polyline.getPath();
      if (len > 0) {
        prevLatLng = tempPath.getAt(len - 1);
        path.push(prevLatLng);
      }
      path.push(latLngVar);
      this.passOnePolylines.push(this.polyline);
    }

    if (this.videoIndex % 2 === 0) { // Make marker null based on time gap with actual data
      this.marker.setMap(null);
      this.marker = new google.maps.Marker({
        position: latLngVar,
        map: this.map
      });
    }
  }

  /**Method to find pass number of path being drawn */
  checkNewPoint(midLatlng, latLngVar, pathPolyLine, checkWhichPass): number {
    let passAPolylines, passBPolylines, newPolyline, strokeColor, tempPath, path, prevLatLng, len;
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
          passAPolylines.push(this.polyline);

          this.polyline = new google.maps.Polyline({
            geodesic: true,
            strokeOpacity: 1,
            strokeWeight: this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth,
            map: this.map,
            strokeColor: strokeColor,
            zIndex: checkWhichPass // set zIndex as pass number for each path
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
  }

  /**Method to play or pause video */
  togglePlay(): void {
    this.isVideoPlaying = !this.isVideoPlaying;
    if (this.isVideoPlaying) {
      this.loopThroughPoints(this.videoIndex);
    } else {}
  }

  /**Method to remove all polyline passes */
  removePolylines(): void {
    this.allPasses.forEach(eachPass => {
      eachPass.forEach(eachPolyline => {
        eachPolyline.setVisible(false);
      });
    });

    /**Setting current polyline as null */
    this.polyline.setVisible(false);
  }

  /**Method to redraw polylines having width in accordance with zoomlevel */
  redrawPolylines(): void {
    this.allPasses.forEach(eachPass => {
      eachPass.forEach(eachPolyline => {
        eachPolyline.strokeWeight = this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth;
        eachPolyline.setVisible(true);
      });
    });
    /**Redrawing current polyline */
    this.polyline.strokeWeight = this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth;
    this.polyline.setVisible(true);
  }


}
