import { Component } from '@angular/core';
import { CatService } from './services/cat.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cats: any = [];
  breeds: any = [];
  catsFilterForm = new FormGroup({
    breed: new FormControl('all'),
    limit: new FormControl(10),
  });
  limits = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  isLoading = false;

  constructor(
    private catService: CatService,
  ) {}

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
      throw new Error('Fail getting breeds');
    }
  }

  async getCats(breed: string, limit: number) {
    try {
      this.isLoading = true;

      const { data } = await this.catService.getCats(breed, limit);

      this.cats = data;
    } catch {
      throw new Error('Fail getting cats');
    } finally {
      this.isLoading = false;
    }

  }

  ngOnInit() {
    this.getCats(this.breed.value, this.limit.value);
    this.getBreeds();
  }

  catsFilter() {
    this.getCats(this.breed.value, this.limit.value);
  }
}
