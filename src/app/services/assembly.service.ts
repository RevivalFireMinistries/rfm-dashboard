import { Injectable } from '@angular/core';
import {Assembly} from '../domain/assembly';

@Injectable()
export class AssemblyService {


  constructor() { }

  getAssemblyList() {

    type assemblies = Array<Assembly>;

  const assemblyList: assemblies = [
      new Assembly(1, 'Stellenbosch'),
      new Assembly(2, 'Strand'),
      new Assembly(3, 'Delft')
    ];

    return assemblyList;
  }
}
