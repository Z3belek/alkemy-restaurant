import { Component, OnInit } from '@angular/core';
import { Subject, debounce, filter, interval } from 'rxjs';
import { ApiService, Dish } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MenuService } from 'src/app/services/menu.service';
@Component({
  selector: 'app-add-dishes',
  templateUrl: './add-dishes.component.html',
  styleUrls: ['./add-dishes.component.scss']
})
export class AddDishesComponent implements OnInit {

  search = new Subject<any>();
  value: string = '';
  searchResult: Array<any> = [];
  searching: boolean = false;
  showDetails: { [key: number]: boolean } = {};

  dashDetails!: Dish;

  constructor(
    private apiService: ApiService,
    private menuService: MenuService
  ) {
    this.search.pipe(
      map((event: any) => event.target.value),
      filter(text => text.length > 2),
      debounce(() => interval(500)),
    ).subscribe({
      next: (text) => {
        this.getDishes(text);
      }
    })
    this.search.pipe(
      map((event: any) => event.target.value),
      filter(text => text.length == 0),
    ).subscribe({
      next: () => {
        this.searchResult = [];
        this.searching = false;
      }
    })
    this.dashDetails = this.menuService.dashDetails;
  }

  ngOnInit(): void {
  }

  getDishes(text: string): void {
    this.apiService.getDishes(text).subscribe({
      next: (data: any) => {
        this.searchResult = data;
        this.searching = true;
      }
    })
  }

  seeDetails(index: number) {
    this.showDetails[index] = !this.showDetails[index];
  }

  addToMenu(id: any) {
    this.apiService.getDetails(id).subscribe({
      next: (data: any) => {
        this.dashDetails.id = data.id;
        this.dashDetails.title = data.title;
        this.dashDetails.image = data.image;
        this.dashDetails.vegan = data.vegan;
        this.dashDetails.pricePerServing = data.pricePerServing;
        this.dashDetails.readyInMinutes = data.readyInMinutes;
        this.dashDetails.healthScore = data.healthScore;
        this.menuService.menuCheck(id);
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }
}
