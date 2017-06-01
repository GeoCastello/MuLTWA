import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class RoutingService {
      // Observable string sources
  private caseData = new Subject<any>(); 
    // Observable string streams
  caseData$ = this.caseData.asObservable();
    publishData(data: any) {
    this.caseData.next(data);
  }

}
