import { Injectable } from '@angular/core';
import {Assembly} from '../domain/assembly';

@Injectable()
export class AssemblyService {


  constructor() { }

  getAssemblyList() {

    type assemblies = Array<Assembly>;

  const assemblyList: assemblies = [
    new Assembly(0, 'Choose an Assembly'),
      new Assembly(1, 'Stellenbosch'),
      new Assembly(2, 'Strand'),
      new Assembly(4, 'Delft'),
      new Assembly(5, 'Harare'),
      new Assembly(6, 'Test'),
      new Assembly(7, 'Pretoria'),
      new Assembly(8, 'Kraaifontein'),
      new Assembly(9, 'Eersterivier'),
      new Assembly(10, 'Danoon'),
      new Assembly(11, 'Nomzamo')
    ];

    return assemblyList;
  }

  getAssemblyById(assemblyId: string): Assembly {
    const id = Number(assemblyId);
    for ( let i = 0; i < this.getAssemblyList().length; i++) {
      if ( this.getAssemblyList()[i].id === id) {
        return this.getAssemblyList()[i];
      }
    }
    return null;
  }
}
