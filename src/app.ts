import { inject } from 'aurelia-framework';
import dataset from './shared/dataset';
import { sortOrder } from './shared/dataset';
import { localStorage } from './shared/storage'
import iTunes from './api/iTunes';

@inject(iTunes, localStorage)  
export class App {
  message = 'Hello World!';

  storage: localStorage;  
  ds: dataset;

  constructor(iTunes: iTunes, storage: localStorage) {
    
    this.ds = new dataset({
      pageSize: 5,
      sorters: {
        image: function (row) {
          var item = row['im:image']
          return item ? item[0].label : '';
        },
        title: function (row) {
          return row['im:name'].label
        },
        director: function (row) {
          return row['im:artist'].label;
        },
        price: function (row) {
          var item = row['im:price']
          return item ? item.label : 'n/a';
        },
        rent: function (row) {
          var item = row['im:rentalPrice']
          return item ? item.label : 'n/a';
        },
        release: function (row) {
          var item = row['im:releaseDate']
          return item ? item.attributes.label : 'n/a';
        }
      }
    });

    this.ds.load(iTunes.movies);
  }

  state: number = 0;

  setState(value): void {
    this.state = value;
  }

  favoriteCount(): number {
    var items: any = this.storage.get('items');

    return items ? items.length : 0;    

}

}
