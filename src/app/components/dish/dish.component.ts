import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/services/api.service';
import { MenuComponent } from '../menu/menu.component';

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

  showDetails: { [key: number]: boolean } = {};
  constructor(
    private menuComponent: MenuComponent
  ) { }

  ngOnInit(): void {
  }

  seeDetails(index: number) {
    this.showDetails[index] = !this.showDetails[index];
  }

  deleteDish(dish: Dish): void {
    this.menuComponent.deleteDish(dish);
  }
}
