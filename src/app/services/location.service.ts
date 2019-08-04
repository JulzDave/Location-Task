import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
    if (!localStorage.getItem('data')) {
      localStorage.setItem('data', `{
    "locations":[
      { "name": "Tel Aviv", "address": "Arlozorov St.", "lat": 32.0853, "lon": 34.7818, "category_id": 10 },
      { "name": "Jerusalem", "address": "Balfour St.", "lat": 31.771959, "lon": 35.217018, "category_id": 20 },
      { "name": "New York", "address": "Railroad Ave", "lat": 40.730610, "lon": -73.935242, "category_id": 30 },
      { "name": "Los Angeles", "address": "W 1st St.", "lat": 34.052235, "lon": -118.243683, "category_id": 30 },
      { "name": "Colorado", "address": "80807", "lat": 39.113014, "lon": -105.358887, "category_id": 50 },
      { "name": "Budapest", "address": "Lanchid U.", "lat": 47.497913, "lon": 19.040236, "category_id": 20 },
      { "name": "Connecticut", "address": "Miner Brook", "lat": 41.599998, "lon": -72.699997, "category_id": 10 },
      { "name": "Seattle", "address": "University St.", "lat": 47.608013, "lon": -122.335167, "category_id": 50 },
      { "name": "Oregon", "address": "Ferguson Creek", "lat": 44.000000, "lon": -120.500000, "category_id": 30 }
    ],
    "categories":{
      "10": { "name": "Books" },
      "20": { "name": "Televisions" },
      "30": { "name": "Strollers" },
      "40": { "name": "Computers" },
      "50": { "name": "Bags" },
      "60": { "name": "Lamps" },
      "70": { "name": "Beds" },
      "80": { "name": "cellular" },
      "90": { "name": "Tablets" }
    }}`);
    }
  }

  getFromLocalStorage(): Observable<any> {
    let cat = localStorage.getItem('data')
    return of(JSON.parse(cat))
  }
}
