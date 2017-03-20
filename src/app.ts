import { inject } from 'aurelia-framework';
import dataset from './shared/dataset';
import { sortOrder } from './shared/dataset';
import iTunes from './api/iTunes';

@inject(iTunes)
export class App {
  message = 'Hello World!';

  ds: dataset;

  constructor(iTunes: iTunes) {
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

}
