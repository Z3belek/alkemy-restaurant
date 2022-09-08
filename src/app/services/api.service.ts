import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiKey = '6d303f20b28b4e04aa6045c019c1aecc';
  urlBase = 'https://api.spoonacular.com/recipes/';

  constructor(
    private http: HttpClient
  ) { }

  getDishes(search: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}complexSearch?apiKey=${this.apiKey}&addRecipeInformation=true&query=${search}`)
      .pipe(
        map(data => data.results)
      )
  }

  getDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}${id}/information?includeNutritition=false&apiKey=${this.apiKey}`)
  }
}

export interface Dish {
  id: number;
  title: string;
  image: string;
  vegan: boolean;
  pricePerServing: number;
  readyInMinutes: number;
  healthScore: number;
}