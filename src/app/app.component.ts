import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  SimpleChanges,
  ElementRef
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


export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private loadPathService: LoadPathService
  ) {}

  @ViewChild('map') mapElement: any;
  @ViewChild('slider') slider: SliderComponent;
  @ViewChild('playButton') playButton: ElementRef;

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
  mapDragged: boolean = false;

  ngOnInit(): void {

    /**Considering width of Asphalt roller as 2 meters,
     * width of line is calculated from meters/pixel values for various zoom levels*/
    this.zoomScaleIndex = [
<<<<<<< HEAD
      {zoom: 1, polylineWidth: 0.001},
      {zoom: 2, polylineWidth: 0.001},
      {zoom: 3, polylineWidth: 0.001},
      {zoom: 4, polylineWidth: 0.001},
      {zoom: 5, polylineWidth: 0.001},
      {zoom: 6, polylineWidth: 0.001},
      {zoom: 7, polylineWidth: 0.001},
      {zoom: 8, polylineWidth: 0.003},
      {zoom: 9, polylineWidth: 0.006},
      {zoom: 10, polylineWidth: 0.013},
      {zoom: 11, polylineWidth: 0.026},
      {zoom: 12, polylineWidth: 0.052},
      {zoom: 13, polylineWidth: 0.104},
      {zoom: 14, polylineWidth: 0.209},
      {zoom: 15, polylineWidth: 0.419},
      {zoom: 16, polylineWidth: 0.838},
      {zoom: 17, polylineWidth: 1.676},
      {zoom: 18, polylineWidth: 3.356},
      {zoom: 19, polylineWidth: 6.711},
      {zoom: 20, polylineWidth: 13.423},
      {zoom: 21, polylineWidth: 26.846},
      {zoom: 22, polylineWidth: 53.691},
      {zoom: 23, polylineWidth: 107.382},
      {zoom: 24, polylineWidth: 214.765}
=======
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
>>>>>>> d170028f34af519c962a850ca5055baf72501773
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
          /**Set duration of video*/
          this.duration = this.gpsData[this.gpsData.length - 1].rtc_time - this.gpsData[0].rtc_time; // set this as video duration
          this.playButton.nativeElement.disabled = false;

        },
        error => { console.log(error); }
      );
  }

  ngAfterViewInit(): void {
    this.playButton.nativeElement.disabled = true;
  }

  public initializeMap() {
    this.zoomLevel = 19; // Initial zoom level

    GoogleMapApiLoader.load().then((res: any) => {
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: this.zoomLevel,
        mapTypeId: 'satellite',
        scaleControl: true
      });
      this.map = map;
      this.polyOptions = { // Also consider PolylineOptions object
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
          this.hidePolylines();
          this.redrawPolylines();
        }
      });

      /**Recenter map 2 seconds after dragging ends*/
      google.maps.event.addListener(this.map, 'dragstart', () => {
        this.mapDragged = true;
      });
      google.maps.event.addListener(this.map, 'dragend', () => {
        setTimeout(() => {
          this.mapDragged = false;
        }, 2000);
      });
    });
  }

  /**Method to loop through all LatLng points */
  loopThroughPoints(index: number): void {
    this.videoIndex = index;
    let latLngVar = new google.maps.LatLng(this.gpsData[index].latitude, this.gpsData[index].longitude);
    if (this.isVideoPlaying) {
      setTimeout(() => {

        this.addPointToPath(latLngVar);
        if (++index < (this.gpsData.length)) {
          this.loopThroughPoints(index);
        } else {
          /**Stop playing video*/
          this.isVideoPlaying = false;
          this.videoIndex = -1;
        }
      }, (100)); /**100 ms is the rough time gap between each given coordinates*/

        this.marker.setPosition(latLngVar);

        if (!this.mapDragged) {
          /**set current point as map center if map is not dragged*/
          this.map.setCenter(latLngVar);
        }
    } else {
      /**For drawing a continuous path */
    }
  }

  /**Method to add LatLng point to path */
  addPointToPath(latLngVar: any): void {

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

  /**Method to play or pause video */
  togglePlay(): void {
    this.isVideoPlaying = !this.isVideoPlaying;
    if (this.isVideoPlaying) {
      if (this.videoIndex === -1) {
        /**To restart drawing roller path */
        window.location.reload();
      }
      this.loopThroughPoints(this.videoIndex);
    } else {}
  }

  /**Method to hide all polyline passes */
  hidePolylines(): void {
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
