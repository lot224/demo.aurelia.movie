import { localStorage, sessionStorage } from '../../src/shared/storage';
import { Container } from 'aurelia-dependency-injection';


describe('localStorage', () => {
  let container: Container;
  let storage: localStorage;

  beforeEach(() => {
    container = new Container();
    storage = container.get(localStorage);
    storage.clear();
  });

  it('should return an empty collection', () => {
    expect(storage.getAll()).toEqual({});
  });

  it('should store an object into the collection', () => {
    storage.set('name', { fName: 'Bill', lName: 'Smith' });
    expect(storage.get('name')).toEqual({ fName: 'Bill', lName: 'Smith' });
  });

  it('should allow overwriting of an object.', () => {
    storage.set('name', { fName: 'Bill', lName: 'Smith' });
    expect(storage.get('name')).toEqual({ fName: 'Bill', lName: 'Smith' });

    storage.set('name', { fName: 'William', lName: 'Smith' });
    expect(storage.get('name')).toEqual({ fName: 'William', lName: 'Smith' });
  });

  it('should contain multiple objects', () => {

    storage.set('name', { fName: 'Bill', lName: 'Smith' });
    storage.set('items', ['apple', 'bananna', 'pear']);
    storage.set('colors', [{ name: 'red', hex: '#FF0000' }, { name: 'green', hex: '#00FF00' }, { name: 'blue', hex: '#0000FF' }]);

    var items = storage.getAll();

    expect(storage.length).toBe(3);

    expect(storage.get('name')).toEqual({ fName: 'Bill', lName: 'Smith' });
    expect(storage.get('items')).toEqual(['apple', 'bananna', 'pear']);
    expect(storage.get('colors')).toEqual([{ name: 'red', hex: '#FF0000' }, { name: 'green', hex: '#00FF00' }, { name: 'blue', hex: '#0000FF' }]);

    expect(items['name']).toEqual({ fName: 'Bill', lName: 'Smith' });
    expect(items['items']).toEqual(['apple', 'bananna', 'pear']);
    expect(items['colors']).toEqual([{ name: 'red', hex: '#FF0000' }, { name: 'green', hex: '#00FF00' }, { name: 'blue', hex: '#0000FF' }]);

    expect(items).toEqual({ 'name': { fName: 'Bill', lName: 'Smith' }, 'items': ['apple', 'bananna', 'pear'], 'colors': [{ name: 'red', hex: '#FF0000' }, { name: 'green', hex: '#00FF00' }, { name: 'blue', hex: '#0000FF' }] });

  });
})

