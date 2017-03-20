import dataset from './dataset';
import { bindable } from 'aurelia-framework';

export class DataPager {
  @bindable dataset: dataset;

  /**
    * @name prevPage
    * @kind method
    * @description sets the current page to the previous page
    */
  prevPage(): void {
    if (this.dataset) {
      if (this.dataset.page !== 1)
        this.setPage(this.dataset.page - 1);
    }
  }

  /**
   * @name nextPage
   * @kind method
   * @description sets the current page to the next page
   */
  nextPage(): void {
    console.log(this.dataset);
    if (this.dataset) {
      if (this.dataset.page !== this.dataset.pageCount)
        this.setPage(this.dataset.page + 1);
    }
  }

  /**
   * @name setPage
   * @kind method
   * @description sets the current page to the specified page
   */
  setPage(pg): void {
    if (this.dataset)
      this.dataset.page = pg;
  }

  /**
   * @name pages
   * @kind function
   * @returns {int}
   * @description returns the total number of pages in the dataset
   */
  get pages(): number {
    return this.dataset ? this.dataset.pageCount : 0;
  }
}