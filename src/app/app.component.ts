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
  passColors: Array<any> = [];
  midLatlng: any;
  newLatLng: any;
  lastLatLng: any;
  secondLastLatLng: any;
  pathPolyLine: any;
  lastPolyline: any;
  checkWhichPass: number;
  lastLineLatLngOne: any = null;
  lastLineLatLngTwo: any = null;

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

    /**Considering width of Asphalt roller as 2 meters,
     * width of line is calculated from meters/pixel values for various zoom levels*/
    this.zoomScaleIndex = [
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
    ];

    this.passColors = [
      {pass: 1, color: 'red'},
      {pass: 2, color: 'yellow'},
      {pass: 3, color: 'lime'},
      {pass: 4, color: 'green'},
      {pass: 5, color: 'deepskyblue'},
      {pass: 6, color: 'blue'},
      {pass: 7, color: 'purple'}
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
          // this.map.setCenter(new google.maps.LatLng(Number(this.gpsData[0].latitude), Number(this.gpsData[0].longitude)));
          this.map.setCenter(new google.maps.LatLng(Number(this.flightPlanCoordinates[0].latitude),
          Number(this.flightPlanCoordinates[0].longitude)));
          /**Set duration of video*/
          // this.duration = this.gpsData[this.gpsData.length - 1].rtc_time - this.gpsData[0].rtc_time; // set this as video duration
          this.duration = (this.flightPlanCoordinates[this.flightPlanCoordinates.length - 1].rtc_time -
          this.flightPlanCoordinates[0].rtc_time);
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
        strokeColor: 'red',
        zIndex: 1
      });
      this.marker = new google.maps.Marker({
        map: this.map
      });

      google.maps.event.addListener(this.map, 'zoom_changed', () => {
        let prevZoom = this.zoomLevel;
        this.zoomLevel = this.map.getZoom();
        if ((this.zoomLevel < 10 && prevZoom < 10) || (this.zoomLevel === prevZoom)) {
          /**Redrawing of polylines not needed */
        } else {
          /**Redraw all current polylines */
          this.hidePolylines();
          this.redrawPolylines();
        }
        console.log('zoom: ', this.zoomLevel);
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
    // this.newLatLng = new google.maps.LatLng(this.gpsData[index].latitude, this.gpsData[index].longitude);
    this.newLatLng = new google.maps.LatLng(this.flightPlanCoordinates[index].latitude, this.flightPlanCoordinates[index].longitude);
    if (this.isVideoPlaying) {
      setTimeout(() => {

        this.addPointToPath();
        // if (++index < (this.gpsData.length)) {
          // this.loopThroughPoints(index);
          this.marker.setPosition(this.newLatLng);

        if (++index < (this.flightPlanCoordinates.length)) {
          this.loopThroughPoints(index);
        } else {
          /**Stop playing video*/
          this.isVideoPlaying = false;
          this.videoIndex = -1;
        }
      }, (100)); /**100 ms is the rough time gap between each given coordinates*/


        if (!this.mapDragged) {
          /**set current point as map center if map is not dragged*/
          // this.map.setCenter(this.newLatLng);
        }
    } else {
      /**For drawing a continuous path */
    }
  }

  /**Method to add LatLng point to path */
  addPointToPath(): void {

    let path, tempPath, tempPathA, tempLastLine, len, startPoint, endPoint, midPoint;
    let projection = this.map.getProjection();
    let passXPolylines, index, prevPolyline;
    if (this.lastLineLatLngOne && this.lastLineLatLngTwo) {
      /**Ignore points within tolerance distance of last line */
      tempLastLine = new google.maps.Polyline();
      tempPathA = tempLastLine.getPath();
      tempPathA.push(this.lastLineLatLngOne);
      tempPathA.push(this.lastLineLatLngTwo);
      if (google.maps.geometry.poly.isLocationOnEdge(this.newLatLng, tempLastLine, 1.5e-6)) {
        /**Ignore this latLng point when it is within tolerance distance of 6 inches from last polyline */
        /** 1.5e-6 range equals to 6 inches range(approx.)*/
        return;
      }
    }
    /**Finding mid-point of polyline */
    tempPath = this.polyline.getPath();
    len = tempPath.getLength();
    this.lastLatLng = tempPath.getAt(len - 1);
    this.midLatlng =  this.secondLastLatLng = null;
    if (tempPath.length > 1) {
      this.secondLastLatLng = tempPath.getAt(len - 2);
    }
    if ( this.lastLatLng) {
      /**If polyline path is not null calculate mid-point*/
      startPoint = projection.fromLatLngToPoint( this.lastLatLng);
      endPoint = projection.fromLatLngToPoint(this.newLatLng);
      midPoint = new google.maps.Point(
        (startPoint.x + endPoint.x) / 2,
        (startPoint.y + endPoint.y) / 2
      );
      this.midLatlng = projection.fromPointToLatLng(midPoint);

      if (this.secondLastLatLng) {
        this.lastPolyline = new google.maps.Polyline();
        let tempo = this.lastPolyline.getPath();
        tempo.push( this.secondLastLatLng);
        tempo.push( this.lastLatLng);
      }
    }


    /**Loop to check each pass, from Pass 7 to Pass 1 */
    for (let i = 7; i > 0; i--) {
      index = 0;
      passXPolylines = this.allPasses[i - 1];
      while (passXPolylines && passXPolylines[index]) {

        path = passXPolylines[index].getPath();
        this.pathPolyLine = new google.maps.Polyline({
          path: path
        });
        if (i === 7) {
          /**For last pass */
          this.checkWhichPass = i;
        } else {
          /**For all other passes */
          this.checkWhichPass = i + 1;
        }

        this.passNumber = this.checkPointToWhichPass();
        if (this.passNumber > 0) {
          break;
        } else if (this.passNumber === -1) {
          // Ignore current point and going to check next point
          return;
        }
        index++;
      }
    }

    /**Check for Pass 1 */
    if (this.passNumber === 0) {
      this.passOnePolylines.push(this.polyline);
      this.polyline = new google.maps.Polyline({
        geodesic: true,
        strokeOpacity: 1,
        strokeWeight: this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth,
        map: this.map,
        strokeColor: 'red',
        zIndex: 1 // set zIndex as pass number for each path
      });
      tempPath = this.passOnePolylines[this.passOnePolylines.length - 1].getPath();
      len = tempPath.getLength();
      path = this.polyline.getPath();
      if (len > 0) {
        this.lastLatLng = tempPath.getAt(len - 1);
        path.push(this.lastLatLng);
      }
      path.push(this.newLatLng);
      this.passOnePolylines.push(this.polyline);
    }

    /**Setting last line points */
    if (!this.lastLineLatLngOne && !this.lastLineLatLngTwo) {
      this.lastLineLatLngOne = this.newLatLng;
    } else if (!this.lastLineLatLngTwo) {
      this.lastLineLatLngTwo = this.newLatLng;
    } else {
      /**When both points are not null */
      this.lastLineLatLngOne = this.lastLineLatLngTwo;
      this.lastLineLatLngTwo = this.newLatLng;
    }

  }

  /**Method to find pass number of path being drawn */
  checkPointToWhichPass(): number {
    let passAPolylines, passBPolylines, newPolyline, strokeColor, tempPath, path, len;
    let oldSlope, newSlope;
      switch (this.checkWhichPass) {
        case 2:
          passAPolylines = this.passOnePolylines;
          passBPolylines = this.passTwoPolylines;
          break;
        case 3:
          passAPolylines = this.passTwoPolylines;
          passBPolylines = this.passThreePolylines;
          break;
        case 4:
          passAPolylines = this.passThreePolylines;
          passBPolylines = this.passFourPolylines;
          break;
        case 5:
          passAPolylines = this.passFourPolylines;
          passBPolylines = this.passFivePolylines;
          break;
        case 6:
          passAPolylines = this.passFivePolylines;
          passBPolylines = this.passSixPolylines;
          break;
        case 7:
          passAPolylines = this.passSixPolylines;
          passBPolylines = this.passSevenPolylines;
          break;
      }

      /**checking mid-point of polyline */
      if (this.midLatlng && google.maps.geometry.poly.isLocationOnEdge(this.midLatlng, this.pathPolyLine, 1.5e-6)) {
        /**Checking new LatLng point */
        if (google.maps.geometry.poly.isLocationOnEdge(this.newLatLng, this.pathPolyLine, 1.5e-6)) {
          /** 1.5e-6 range equals to 6 inches range(approx.)*/
          passAPolylines.push(this.polyline);
          this.polyline = new google.maps.Polyline({
            geodesic: true,
            strokeOpacity: 1,
            strokeColor: this.passColors[this.checkWhichPass - 1].color,
            strokeWeight: this.zoomScaleIndex[this.map.getZoom() - 1].polylineWidth,
            map: this.map,
            zIndex: this.checkWhichPass // set zIndex as pass number for each path
          });

          tempPath = passAPolylines[passAPolylines.length - 1].getPath();
          len = tempPath.getLength();
          path = this.polyline.getPath();
          if (len > 0) {
            this.lastLatLng = tempPath.getAt(len - 1);
            path.push(this.lastLatLng);
          }
          path.push(this.newLatLng);
          passBPolylines.push(this.polyline);
        } else {
          this.checkWhichPass = 0;
        }
      } else {
        this.checkWhichPass = 0;
      }

      return this.checkWhichPass;
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

    /**Setting current polyline as hidden */
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
