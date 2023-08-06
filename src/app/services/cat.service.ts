import { Injectable } from '@angular/core';
import { client } from '../utils/client';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  apiKey = 'live_t5w81Zu0VWKNY6YJSy6lSo7wO5Pqfl35DIKNDKInAI4tPXNDXLaI8gSrIeYuZ5qv'

  constructor() { }

  async getBreeds() {
    return await client.get(`/breeds?api_key=${this.apiKey}`)
  }

  async getCats(breed: string, limit: number) {
    const breedURL = (breed !== 'all') ? `&breed_ids=${breed}` : '';
    return await client.get(`/images/search?limit=${limit}&api_key=${this.apiKey}${breedURL}`)
  }
}
