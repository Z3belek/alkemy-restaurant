import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService, Dish } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  dishMenu: Dish[];
  dashDetails: Dish;
  updateMenuSubject = new Subject<Dish[]>();
  updateMenuObservable = this.updateMenuSubject.asObservable();
  veganMenu: number;

  added: boolean;
  titleReturn: string;
  iconReturn: string;
  msjReturn: string;
  constructor(
    private apiService: ApiService
  ) {
    this.dashDetails = { id: 1, title: '', image: '', vegan: false, pricePerServing: 0, readyInMinutes: 0, healthScore: 0 };
    this.dishMenu = this.getDishes();
    this.veganMenu = 0;
    this.added = true;
    this.iconReturn = 'success';
    this.titleReturn = 'Nice!';
    this.msjReturn = 'Dish added to menu correctly';
  }

  getDishes(): Dish[] {
    this.dishMenu = this.getStorage();
    return this.dishMenu;
  }

  getStorage(): Dish[] {
    if (localStorage.getItem("dishMenu") !== null) {
      return JSON.parse(localStorage.getItem("dishMenu")!, (key: string, value: string | number | boolean) => {
        if (key == 'id' || key == 'pricePerServing' || key == 'readyInMinutes' || key == 'healthScore') {
          return value as number;
        } else if (key == 'title' || key == 'image') {
          return value as string;
        } else if (key == 'vegan') {
          return value as boolean;
        } else {
          return value as string;
        }
      });
    } else {
      return [];
    }
  }

  menuCheck(id: number) {
    this.dishMenu = this.getDishes();
    if (this.dishMenu.length < 2) {
      this.addDish(this.dashDetails);
    } else if (this.dishMenu.length == 4) {
      this.added = false;
      this.msjReturn = "It is not possible add it to the menu. You already order 4 dishes";
    } else if (this.dishMenu.length >= 2 && this.dishMenu.length < 4) {
      this.menuUpdateCheck(id);
    }
    Swal.fire({
      icon: (this.iconReturn) as unknown as undefined,
      title: (this.titleReturn),
      text: (this.msjReturn),
    })
  }

  addDish(dish: Dish): Dish[] {
    this.dishMenu.push(dish);
    this.updateMenu(this.dishMenu);
    return this.dishMenu;
  }

  updateMenu(dishMenu: Dish[]) {
    this.updateMenuSubject.next(dishMenu);
    localStorage.setItem("dishMenu", JSON.stringify(dishMenu));
  }

  menuUpdateCheck(id: number) {
    this.veganMenu = 0;
    if (this.dishMenu.length == 2) {
      this.dishMenu.forEach((dish) => {
        if (dish.vegan) {
          this.veganMenu++;
        }
      })
      if (this.veganMenu == 2) {
        if (this.dashDetails.vegan) {
          this.added = false;
          this.iconReturn = 'error';
          this.titleReturn = 'Oops...';
          this.msjReturn = "It is not possible add it to the menu. You already order 2 vegan dishes";
        } else {
          this.addDish(this.dashDetails);
        }
      } else if (this.veganMenu == 1) {
        this.addDish(this.dashDetails);
      } else if (this.veganMenu == 0) {
        if (!this.dashDetails.vegan) {
          this.added = false;
          this.iconReturn = 'error';
          this.titleReturn = 'Oops...';
          this.msjReturn = "It is not possible add it to the menu. You already order 2 non-vegan dishes";
        } else {
          this.addDish(this.dashDetails);
        }
      }
    } else if (this.dishMenu.length == 3) {
      this.dishMenu.forEach((dish) => {
        if (dish.vegan) {
          this.veganMenu++;
        }
      })
      if (this.veganMenu == 2) {
        if (this.dashDetails.vegan) {
          this.added = false;
          this.iconReturn = 'error';
          this.titleReturn = 'Oops...';
          this.msjReturn = "It is not possible add it to the menu. You already order 2 vegan dishes";
        } else {
          this.addDish(this.dashDetails);
        }
      } else if (this.veganMenu == 1) {
        if (!this.dashDetails.vegan) {
          this.added = false;
          this.iconReturn = 'error';
          this.titleReturn = 'Oops...';
          this.msjReturn = "It is not possible add it to the menu. You already order 2 non-vegan dishes";
        } else {
          this.addDish(this.dashDetails);
        }
      }
    }
  }

  totalTime(): number {
    let time = 0;
    this.dishMenu.forEach((dish) => {
      time += dish.readyInMinutes;
    })
    return time;
  }

  totalHealth(): number {
    let healt = 0;
    this.dishMenu.forEach((dish) => {
      healt += dish.healthScore;
    })
    return healt;
  }

  totalPrice(): number {
    let price = 0;
    this.dishMenu.forEach((dish) => {
      price += dish.pricePerServing;
    })
    return price;
  }
}
