
import { inject } from 'aurelia-framework';
import dataset from './shared/dataset';
import iTunes from './api/iTunes';

@inject(iTunes)
export class App {
  message = 'Hello World!';

  ds: dataset;
  
  constructor(iTunes: iTunes) {
    this.ds = new dataset({pageSize:15, sortField:''});
    this.ds.load(iTunes.movies);

    console.log(this.ds);
  }



  
  state: number = 0;

  setState(value) {
    this.state = value;

    
  }

}
