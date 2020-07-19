import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { MatriceService, Matrice } from './matrice.service';

@Injectable()
export class MatriceResolver implements Resolve<Matrice> {
  constructor(private matriceService: MatriceService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { columns, rows } = route.queryParams;
    const updatedRows = rows > 30 ? 30 : rows;
    const updatedColumns = columns > 30 ? 30 : columns;

    const matrice =  this.matriceService.generateMatrice(updatedColumns, updatedRows);
    this.matriceService.setMatrice(matrice);
    return matrice;
  }
}
