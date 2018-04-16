import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

export enum storageType {
  session = 0,
  local = 1
}

/**
 * @name storageManager
 * @memberof sessionStorageService
 * @memberof localStorageService
 * @type class
 * @description manages the browser storage collection for the window.sessionStorage and window.localStorage objects.
 */
@inject(EventAggregator)
class storageManager {
  dictionary: object[] = []; // used to mimic sessionStorage if window.local/session does not exist.
  storage: any = null;
  pubsub: EventAggregator;
  type: storageType;

  public constructor(EventAggregator, type: storageType) {
    this.pubsub = EventAggregator;

    switch (type) {
      case storageType.local: {
        this.storage = window.localStorage;
        break;
      }
      case storageType.session: {
        this.storage = window.sessionStorage;
        break;
      }
    }
  }

  /**
   * @name storage.get
   * @kind function
   * @param {string} key the name of the object to return.
   * @returns {object}
   * @description Returns an object based on the key passed in, if key is null or undefined return all
   */
  get(key: string): any {
    if (!key) return this.getAll();

    var value = this.storage ? this.storage.getItem(key) : this.dictionary[key];

    if (value === null)
      return undefined;
    try { return JSON.parse(value); }
    catch (e) { return value || undefined; }
  }

  /**
   * @name storage.getAll
   * @kind function
   * @returns {object<string,object>}
   * @description Returns a collection object containing the keys and values of those keys.
   */
  getAll(): object {
    var nResult: object = {};
    var keys = Object.keys(this.storage || this.dictionary);

    for (var i: number = 0; i < keys.length; i++) {
      nResult[keys[i]] = this.get(keys[i]);
    }

    return nResult;
  }
  /**
   * @name storage.length
   * @kind function
   * @param {number} the size of the collection.
   * @description Stores an object into local or session storage with the given name
   */
  public get length(): number {

    if (this.storage)
      return Object.keys(this.storage).length;
    else
      this.dictionary.length - 1;

  }
  /**
   * @name storage.set
   * @kind function
   * @param {string} key the name of the object to be stored.
   * @param {object} value the object to be stored.
   * @description Stores an object into local or session storage with the given name
   */
  set(key: string, value: object): void {
    var obj = JSON.stringify(value);

    if (this.storage)
      this.storage.setItem(key, obj);
    else
      this.dictionary[key] = obj;

    this.pubsub.publish('io.' + storageType[this.type] + '.storage.set', {}[key] = value);
  };

  /**
   * @name storage.remove
   * @kind function
   * @param {string} key the name of the object to be removed.
   * @description Removes an object from local or session storage that matches the key param
   */
  remove(key: string): void {
    if (this.storage)
      this.storage.removeItem(key);
    else
      delete this.dictionary[key];

    this.pubsub.publish('io.' + storageType[this.type] + '.storage.remove', key);
  };

  /**
 * @name storage.clear
 * @kind function
 * @description Removes all items from local or session storage
 */
  clear(): void {
    if (this.storage)
      this.storage.clear();
    else this.dictionary = [];

    this.pubsub.publish('io.' + storageType[this.type] + '.storage.clear');
  };

}

@inject(EventAggregator)
export class sessionStorage extends storageManager {
  constructor(EventAggregator) {
    super(EventAggregator, storageType.session);
  }
}

@inject(EventAggregator)
export class localStorage extends storageManager {
  constructor(EventAggregator) {
    super(EventAggregator, storageType.local);
  }
}