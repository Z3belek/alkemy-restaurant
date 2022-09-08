import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/services/api.service';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishMenu: Dish[];
  totalPrice!: string;
  totalTime!: string;
  totalHealth!: string;
  showDetails: { [key: number]: boolean } = {};
  constructor(
    private menuService: MenuService
  ) {
    this.dishMenu = this.menuService.getDishes();
  }

  ngOnInit(): void {
    this.mathsAll();
    this.menuService.updateMenuObservable.subscribe(dishes => {
      this.dishMenu = dishes;
      this.mathsAll();
    })
  }

  mathsAll(): void {
    this.totalPrice = this.menuService.totalPrice().toFixed(2);
    this.totalTime = this.matTime().toFixed(2);
    this.totalHealth = this.matHealth().toFixed(2);
  }

  matTime(): number {
    let totalTime = this.menuService.totalTime();
    return totalTime / this.dishMenu.length;
  }

  matHealth(): number {
    let totalHealth = this.menuService.totalHealth();
    return totalHealth / this.dishMenu.length;
  }

  seeDetails(index: number) {
    this.showDetails[index] = !this.showDetails[index];
  }

  deleteDish(dish: Dish): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You delete this dish from your menu!',
      icon: 'warning',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if(result.isConfirmed) {
        this.menuService.deleteDish(dish.id);
        Swal.fire('Deleted!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
