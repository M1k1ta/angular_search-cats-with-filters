import { Component } from '@angular/core';
import { CatService } from './services/cat.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { CatState, GetCats } from './state/cat.state';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Cat } from './types/Cat';
import { Breed } from './types/Breed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  breeds: Breed[] = [];
  limits = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  catsFilterForm = new FormGroup({
    breed: new FormControl('all', {
      nonNullable: true,
    }),
    limit: new FormControl(10, {
      nonNullable: true,
    }),
  });

  @Select(CatState.getCats) cats$!: Observable<{ cats: Cat[], loading: boolean }>;

  constructor(
    private catService: CatService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.catsFilterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => this.catsFilter());
  }

  get breed() {
    return this.catsFilterForm.get('breed') as FormControl;
  }

  get limit() {
    return this.catsFilterForm.get('limit') as FormControl;
  }

  async getBreeds() {
    try {
      const { data } = await this.catService.getBreeds();

      this.breeds = data;
    } catch {
      console.error('Fail getting breeds');
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const breed = params['breed'] || 'all';
      const limit = +params['limit'] || 10;

      this.catsFilterForm.setValue({ breed, limit });
    });

    this.getBreeds();
  }

  catsFilter() {
    const { breed = 'all', limit = 10 } = this.catsFilterForm.value;

    this.router.navigate([], {
      queryParams: { breed, limit },
      queryParamsHandling: 'merge',
    });

    this.store.dispatch(new GetCats(breed, limit));
  }
}
