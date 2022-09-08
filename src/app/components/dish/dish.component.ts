import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchComponent } from 'src/app/pages/search/search.component';
import { Dish } from 'src/app/services/api.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  @Input() title: string = ""
  @Input() readyInMinutes: number = 0
  @Input() image: string = ""
  @Input() healthScore: number = 0
  @Input() pricePerServing: number = 0
  @Input() vegan: boolean = false;
  @Input() i: number = 0;
  @Input() type: string = "";
  @Input() dish: any;
  @Input() id: number = 0;
  @Output() deleteDish: EventEmitter<any> = new EventEmitter<any>();
  @Output() addDish: EventEmitter<any> = new EventEmitter<any>();
  
  showDetails: { [key: number]: boolean } = {};
  constructor(
  ) { }

  ngOnInit(): void {
  }

  seeDetails(index: number) {
    this.showDetails[index] = !this.showDetails[index];
  }

  deleteDishFromMenu(dish: any) {
    this.deleteDish.emit(dish);
  }

  addDishToMenu(dish: any) {
    this.addDish.emit(dish);
  }
}
