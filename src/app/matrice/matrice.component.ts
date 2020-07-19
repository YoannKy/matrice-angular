import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, interval, iif, of } from 'rxjs';
import { pluck, tap, filter, flatMap, withLatestFrom, take } from 'rxjs/operators';

import { MatriceService, Matrice } from './matrice.service';

@Component({
  selector: 'app-matrice',
  templateUrl: './matrice.component.html',
  styleUrls: ['./matrice.component.sass'],
})
export class MatriceComponent implements OnInit {
  matrice$: Observable<Matrice>;

  constructor(
    private route: ActivatedRoute,
    private matriceService: MatriceService) {}

  ngOnInit() {
    this.matrice$ = this.matriceService.matrice.pipe(
      flatMap((matrice) =>
        iif(
          () => !!matrice.length,
          of(matrice),
          this.route.data.pipe(pluck('matrice')),
        ),
      ),
    );

    interval(3000).pipe(
      withLatestFrom(this.matriceService.matrice),
      filter(([_, matrice]) => !!matrice),
      take(this.matriceService.length),
      tap(([_, matrice]: [number, Matrice]) => {
        this.matriceService.setMatrice(this.matriceService.setMatriceWithOneRandomFlash(matrice));
      }),
    ).subscribe();

  }
}
