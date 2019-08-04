import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-show-categories',
  templateUrl: './show-categories.component.html',
  styleUrls: ['./show-categories.component.css']
})
export class ShowCategoriesComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  categories: Object;
  categoryKeys: string[]

  removeCategory(catName, catNumber) {
    debugger;
    delete this.categories[catNumber];
    this.categoryKeys = this.categoryKeys.filter(key => { return key !== catNumber });

    let myData = localStorage.getItem('data');
    let myParsedData = JSON.parse(myData);
    myParsedData.categories = this.categories;
    myParsedData.locations = myParsedData.locations.filter(item => { return JSON.stringify(item.category_id) !== catNumber });
    let myStringifiedData = JSON.stringify(myParsedData)
    localStorage.setItem('data', myStringifiedData)
  }

  ngOnInit() {
    this.locationService.getFromLocalStorage().subscribe(data => {
      this.categories = data.categories;
      this.categoryKeys = Object.keys(this.categories);
    })
  }

}
