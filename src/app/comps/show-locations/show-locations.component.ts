import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-show-locations',
  templateUrl: './show-locations.component.html',
  styleUrls: ['./show-locations.component.css']
})
export class ShowLocationsComponent implements OnInit {

  constructor(private locationService: LocationService, private domSanitizer: DomSanitizer) { }

  locations: any;
  categories: any;
  categoryKeys: string[];
  addLocationForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    lat: new FormControl(null, [Validators.required]),
    lon: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required])
  });
  locationToEdit: Object;
  addOrEdit: string = 'view';
  lat: number;
  lon: number;

  deleteLocation(location, category) {
    //delete from UI:
    let chosenLocation = this.locations.filter(item => { return item.name === location.children[1].innerText && item.address === location.children[2].innerText && item.lat == location.children[3].innerText && item.lon == location.children[4].innerText && item.category_id === category })
    this.locations = this.locations.filter(item => { return item !== chosenLocation[0] })
    //delete from localStorage:
    let myData = localStorage.getItem('data');
    let myParsedData = JSON.parse(myData);
    myParsedData.locations = myParsedData.locations.filter(item => { return JSON.stringify(item) !== JSON.stringify(chosenLocation[0]) })
    let myStringifiedData = JSON.stringify(myParsedData)
    localStorage.setItem('data', myStringifiedData)
  }

  addLocation() {
    if (this.addLocationForm.valid) {
      let newLocation = {
        name: this.addLocationForm.controls.name.value,
        address: this.addLocationForm.controls.address.value,
        lat: parseInt(this.addLocationForm.controls.lat.value),
        lon: parseInt(this.addLocationForm.controls.lon.value),
        category_id: parseInt(this.addLocationForm.controls.category_id.value)
      };
      this.locations.push(newLocation)

      let myData = localStorage.getItem('data');
      let myParsedData = JSON.parse(myData);
      myParsedData.locations.push(newLocation);
      let myStringifiedData = JSON.stringify(myParsedData);
      localStorage.setItem('data', myStringifiedData);
      this.addLocationForm.reset();
    }
    else alert("Form invalid!")
  }

  chooseWhoToEdit(location) {
    this.addLocationForm.controls.name.setValue(location.name);
    this.addLocationForm.controls.address.setValue(location.address);
    this.addLocationForm.controls.lat.setValue(location.lat);
    this.addLocationForm.controls.lon.setValue(location.lon);
    this.addLocationForm.controls.category_id.setValue(location.category_id);
    this.locationToEdit = location
  }

  editLocation() {
    this.locations = this.locations.map(location => { return location === this.locationToEdit ? location = this.addLocationForm.value : location = location });
    debugger;
    let myData = localStorage.getItem('data');
    let myParsedData = JSON.parse(myData);
    myParsedData.locations = this.locations;
    let myStringifiedData = JSON.stringify(myParsedData)
    localStorage.setItem('data', myStringifiedData);
    this.addLocationForm.reset();
  }

  addMode() {
    this.addLocationForm.reset();
    this.addLocationForm.controls.category_id.setValue(this.categoryKeys[0]);
    this.addOrEdit = "add"
  };
  editMode() {
    this.addLocationForm.reset();
    this.addLocationForm.controls.category_id.setValue(this.categoryKeys[0]);
    this.addOrEdit = "edit"
  };
  removalMode() {
    this.addOrEdit = "remove"
  };
  viewMode() {
    this.addOrEdit = 'view'
  };

  viewMap(location) {
    // window.location.href = `https://www.google.com/maps/@${location.lat},${location.lon},15z`
    if (location) {
      this.lat = location.lat;
      this.lon = location.lon;
    }
    return this.domSanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q=' + this.lat + ',' + this.lon + '&hl=es;z=14&amp&output=embed')
  }

  ngOnInit() {
    this.locationService.getFromLocalStorage().subscribe(data => {
      this.locations = data.locations;
      this.categories = data.categories;
      
      this.categoryKeys = Object.keys(this.categories);
      this.addLocationForm.controls.category_id.setValue(this.categoryKeys[0]);
      this.lat = this.locations[0].lat;
      this.lon = this.locations[0].lon;
    })
  }
}
