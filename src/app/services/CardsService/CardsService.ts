import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService';
import { GetCardSearchParams, GetClientsResponse } from './CardsServiceTypes';

@Injectable({ providedIn: 'root' })
export class CardsService extends BaseService {
  public getCards(params?: GetCardSearchParams) {
    return this.http.get<GetClientsResponse>(
      `${this.BASE_URL}/${this.token}/passes?${params?.template ? `search=template=${params?.template}` : ''}`,
      { params },
    );
  }
}
