import { GOOGLE_API_KEY } from './constants';
const url = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY + '&callback=__onGoogleMapsLoaded';

export class GoogleMapApiLoader {
  public static promise: any;
  public static load(): any {

    // First time 'load' is called?
    if (!GoogleMapApiLoader.promise) {

      // Make promise to load
      GoogleMapApiLoader.promise = new Promise((resolve) => {

        // Set callback for when google maps is loaded.
        window['__onGoogleMapsLoaded'] = (ev: any) => {
          resolve(window['google']['maps']);
        };

        // Add script tag to load google maps, which then triggers the callback,
        // which resolves the promise with windows.google.maps.
        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
      });
    }

    // Always return promise. When 'load' is called many times, the promise is already resolved.
    return GoogleMapApiLoader.promise;

  }
}