import { BaiDangService } from '../../../views/pages/home/Bai-Dang/_Services/bai-dang.service';
// RxJS
import { of, BehaviorSubject } from 'rxjs';
import { catchError, finalize, tap, debounceTime, delay, distinctUntilChanged } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../../core/reducers';
// Selectirs
import { selectQueryResult, selectRolesPageLoading, selectRolesShowInitWaitingMessage } from '../_selectors/role.selectors';

export class BaiDangDataSource extends BaseDataSource {
	entitySubject = new BehaviorSubject<any[]>([]);
    loadingSubject = new BehaviorSubject<boolean>(false);
    constructor(
        private _services: BaiDangService,
        
        ) {
		super();

	
    }
    loadListBaiDang() {
	// 	// this._services.lastFilter$.next(queryParams);
	// 	this.loadingSubject.next(true);

	// 	this._services.getlistBaiDang()
	// 		.pipe(
	// 			tap((resultFromServer:any) => {
    //                 // console.log('resultFromServer',resultFromServer);
	// 				this.entitySubject.next(resultFromServer.data);
					
	// 			}),
	// 			// catchError(err => of(new QueryResultsModel([], err))),
		
	// 	).subscribe(res => {
    //         this._services.data = res.data;
    //         console.log('this._services.data',this._services.data);
	// 		});
	 }
}
