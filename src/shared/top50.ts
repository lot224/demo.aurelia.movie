import dataset from './dataset';
import favorites from '../api/favorites';
import { sortOrder } from './dataset';
import { bindable } from 'aurelia-framework';

export class top50 {
  @bindable dataset: dataset;

  sortColumn(column): void {
    var order: sortOrder = this.dataset.sortOrder;

    if (this.dataset.sortField === column)
      order = order === sortOrder.ascending ? sortOrder.descending : sortOrder.ascending;
    else
      order = sortOrder.ascending;

    this.dataset.sort(column, order);
  }


  toggleFavorite(item): void {

    


  }

}