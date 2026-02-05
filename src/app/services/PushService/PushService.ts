import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService';
import { PushRequest } from './PushServiceTypes';

@Injectable({ providedIn: 'root' })
export class PushService extends BaseService {
  public pushMessage(request: PushRequest) {
    return this.http.post(`${this.baseURLWithToken}/message/push`, request);
  }
}
