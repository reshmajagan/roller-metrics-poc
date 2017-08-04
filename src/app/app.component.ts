import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  SimpleChanges
} from '@angular/core';

import { GoogleMapApiLoader } from './shared/google-map-api-loader';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnChanges {
  @ViewChild('map') mapElement: any;

  title = 'app';
  poly: any = {};
  map: any = null;

  ngOnInit(): void {

    this.initializeMap();

  }

  resizeMap(center: any): void {
    google.maps.event.trigger(this.map, 'resize');
    this.map.setCenter(center);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.redrawMap && !changes.redrawMap.firstChange) {
      if (this.map) {
        const center = this.map.getCenter();
        setTimeout(this.resizeMap.bind(this, center), 750);
      }
    }

    this.initializeMap();
  }

  public initializeMap() {
    GoogleMapApiLoader.load().then((res: any) => {
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: 41.879, lng: -87.624},
         zoom: 4,
        // mapTypeId: 'satellite'
      });
      this.map = map;
      // this.simplePolylines();
      this.polylinesOnClick();
      google.maps.event.addDomListener(this.map, 'click', (event) => {
        google.maps.event.trigger(this, 'click');
        this.addLatLng(event.latLng);
      });
    });

  }

  public simplePolylines(): void {
     let flightPlanCoordinates = [
      {lat: 37.772, lng: -122.214},
      {lat: 21.291, lng: -157.821},
      {lat: -18.142, lng: 178.431},
      {lat: -27.467, lng: 153.027}
    ];
    this.poly = new google.maps.Polyline({
      path: flightPlanCoordinates,
      map: this.map,
      geodesic: true,
      strokeColor: 'blue',
      strokeOpacity: 0.8,
      strokeWeight: 2

    });
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

