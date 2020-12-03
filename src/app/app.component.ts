import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  title = 'cocktail';
  cocktailData: any ;
  ingredients: any ;
  category: any ;
  searchByName: any ;
  selectedIngredient: string;
  selectedCategory: string;
  urlApi: string ;


  ngOnInit() {
    this.getData();
    this.getIngredients();
    this.getCategory();
    console.log(this.cocktailData);
  }
  getData() {
        const urlofApi = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
        this.http.get(urlofApi).subscribe(
          (res: any) => {
              this.cocktailData = res.drinks;
            }
        );
      }
 getIngredients() {
  const urlofApi = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  this.http.get(urlofApi).subscribe(
    (res: any) => {
        this.ingredients = res.drinks;
      }
  );
      }
  getCategory() {
        const urlofApi = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        this.http.get(urlofApi).subscribe(
          (res: any) => {
              this.category = res.drinks;
            }
        );
        }
filter(type: any, value: any) {
  if (type == 'ing'){
    this.urlApi = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + value ;
    this.http.get(this.urlApi).subscribe(
      (res: any) => {
          this.cocktailData = res.drinks;
        }
    );
    this.selectedCategory = '';
    this.searchByName = '' ;
  }
  if (type == 'cat') {
    this.urlApi = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + value ;
    this.http.get(this.urlApi).subscribe(
      (res: any) => {
          this.cocktailData = res.drinks;
        }
    );
    this.searchByName = '' ;
    this.selectedIngredient = '' ;
  }
  if (type == 'name' && value) {
    this.urlApi = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + value ;
    this.http.get(this.urlApi).subscribe(
      (res: any) => {
          this.cocktailData = res.drinks;
        }
    );
    this.selectedCategory = '';
    this.selectedIngredient = '' ;
  }
}
reset() {
  this.selectedCategory = '' ;
  this.selectedIngredient = '' ;
  this.searchByName = '';
  this.getData();
}

}
