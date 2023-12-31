import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CatService } from '../services/cat.service';
import { Injectable } from '@angular/core';
import { Cat } from '../types/Cat';

export interface CatStateModel {
  cats: Cat[];
  loading: boolean;
}

export class GetCats {
  static readonly type = '[Cats] Get Cats';
  constructor(public breed: string, public limit: number) {}
}

@Injectable()
@State<CatStateModel>({
  name: 'cats',
  defaults: {
    cats: [],
    loading: true,
  }
})
export class CatState {
  constructor(private catService: CatService) {}

  @Selector()
  static getCats(state: CatStateModel) {
    return { cats: state.cats, loading: state.loading };
  }

  @Action(GetCats)
  async getCats(ctx: StateContext<CatStateModel>, action: GetCats) {
    const { breed, limit } = action;
    ctx.patchState({ loading: true });

    try {
      const { data } = await this.catService.getCats(breed, limit);

      ctx.patchState({ cats: data, loading: false });
    } catch (error) {
      console.error('Failed to get cats', error);
    } finally {
      ctx.patchState({ loading: false });
    }
  }
}
