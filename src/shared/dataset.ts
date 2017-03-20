

export enum sortOrder {
  ascending = 0,
  descending = 1
}

export interface datasetOptions {
  pageSize?: number;
  sorters?: object;
  sortField?: string;
  sortOrder?: sortOrder;
}

export default class dataset {
  private _data: object[] = [];
  private _page: number = 1;
  private _pageSize: number = 5;
  private _sorters: object = {};
  private _sortField: string = '';
  private _sortOrder: sortOrder = sortOrder.ascending;
  private _view: object[] = [];

  constructor(options: datasetOptions) {



    if (options) {

      console.log(options, options.pageSize, options.pageSize || this._pageSize);

      this.pageSize = options.pageSize || this._pageSize;
      this._sorters = options.sorters || this._sorters;
      this.sortField = options.sortField || this._sortField;
      this.sortOrder = options.sortOrder || this._sortOrder;
    };
  }

  // Properties
  public get page(): number {
    return this._page;
  }
  public set page(value: number) {
    if (this._page === value) return;

    if (value > 1 || value <= this.pageCount) {
      this._page = value;
      this.render();
    }
  }

  public get pageSize(): number {
    return this._pageSize;
  }
  public set pageSize(value: number) {
    if (value === this._pageSize) return;

    if (value > 1) {
      this._pageSize = value;

      if (this.page === 1)
        this.render();
      else
        this.page = 1;
    }
  }

  get sorters(): object {
    if (!this._sorters)
      this._sorters = {};
    return this._sorters;
  }

  get sortField(): string {
    return this._sortField;
  }
  set sortField(value: string) {
    this._sortField = value;
  }

  get sortOrder(): sortOrder {
    return this._sortOrder;
  }
  set sortOrder(value: sortOrder) {
    value = value === sortOrder.descending ? sortOrder.descending : sortOrder.ascending;
    this._sortOrder = value;
  }

  get view(): Object[] {
    if (!this._view)
      this._view = [];
    return this._view;
  }

  // Helper Properties  
  get records(): number {
    return this._data.length;
  }
  get pageCount(): number {
    return Math.ceil(this.records / this.pageSize);
  }

  // Functions
  load(data): void {
    this.reset();
    this._data = data;
    this.render();
  }

  render(): void {
    var nResult: Object[] = [];
    var page: number = this.page - 1; // Zero Base;
    var start: number = page * this.pageSize;

    if (start < this.records) {
      for (var i: number = 0; i < this.pageSize; i++) {
        var item: any = this._data[i + start];

        if (item) {
          item.$$index = i + start;
          item.$$viewIndex = 1;
          nResult.push(item);
        } else {
          break;
        }
      }
    }

    this._view = nResult;
  }

  reset(): void {
    this._data = [];
    this._page = 1;
    this._view = [];
  }

  sort(field: string, order: sortOrder): void {
    if (!field) return;
    var ds: dataset = this;

    this.sortField = field; // Check to see if this field exists?
    this.sortOrder = order === sortOrder.descending ? sortOrder.descending : sortOrder.ascending;

    var asc = function (a: any, b: any): number {
      var x: any, y: any, xx: any, yy: any;

      if (ds.sorters[ds.sortField]) {
        xx = ds.sorters[ds.sortField](a);
        yy = ds.sorters[ds.sortField](b);

        x = xx ? xx.toLowerCase ? xx.toLowerCase() : xx : "";
        y = yy ? yy.toLowerCase ? yy.toLowerCase() : yy : "";
      } else {
        x = a[ds.sortField] ? a[ds.sortField].toLowerCase ? a[ds.sortField].toLowerCase() : a[ds.sortField] : "";
        y = b[ds.sortField] ? b[ds.sortField].toLowerCase ? b[ds.sortField].toLowerCase() : b[ds.sortField] : "";
      }

      return x < y ? -1 : x > y ? 1 : 0;
    }

    var desc = function (a: any, b: any): number {
      return asc(b, a);
    }

    if (order == sortOrder.descending)
      this._data.sort(desc);
    else
      this._data.sort(asc);

    if (this.page === 1)
      this.render();
    else
      this.page = 1;
  }
}