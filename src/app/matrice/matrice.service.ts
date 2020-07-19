import { Injectable } from '@angular/core';

import randomColor from 'randomcolor';
import { BehaviorSubject } from 'rxjs';

export interface Element {
  color: string;
  flash: boolean;
}

export type Matrice = Element[][];

@Injectable()
export class MatriceService {
  private _length: number;
  private matrice$ = new BehaviorSubject([]);
  private indexes: [number, number][] = [];

  get matrice() {
    return this.matrice$.asObservable();
  }

  get length() {
    return this._length;
  }

  generateMatrice(rows: number, columns: number): Matrice {
    this._length = rows * columns;

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          this.indexes.push([i, j]);
        }
    }

    const colors = randomColor({ count: columns });

    return Array.from(
      { length: columns },
      (_, columnKey) => {
        return Array.from(
          { length: rows },
          () => ({
            color: colors[columnKey],
            flash: false,
          }));
      });
  }

  setMatrice(matrice: Matrice) {
    this.matrice$.next(matrice);
  }

  setMatriceWithOneRandomFlash(matrice: Matrice): Matrice {
    if (!this.indexes.length) {
      return matrice;
    }

    const randomIndex = Math.floor(Math.random() * this.indexes.length);

    const [randomColumn, randomRow] = this.indexes[randomIndex];

    this.indexes = this.indexes.filter((_, key) => key !== randomIndex);

    return matrice.map((col, columnKey) => {
      return col.map((row, rowKey) => {
        if (rowKey === randomRow &&
           columnKey === randomColumn) {
          return {...row, flash: true };
        }

        return row;
      });
    });
  }
}
