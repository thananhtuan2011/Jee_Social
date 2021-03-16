import { AuthJwtService } from './../../../auth/_services/auth-jwt.service';
import { TokenStorage } from './../../../auth/_services/token-storage.service';
// Angular
import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
// CRUD
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { HttpExtenstionsModel } from '../../crud/models/http-extentsions-model';

@Injectable()
export class HttpUtilsService {
	/**
	 * Prepare query http params
	 * @param queryParams: QueryParamsModel
	 */
	constructor(private tokenStorage: TokenStorage,
		private jwt_service:AuthJwtService
		
		) {
	}
	getFindHTTPParams(queryParams): HttpParams {
		let params = new HttpParams()
			//.set('filter',  queryParams.filter )
			.set('sortOrder', queryParams.sortOrder)
			.set('sortField', queryParams.sortField)
			.set('page', (queryParams.pageNumber + 1).toString())
			.set('record', queryParams.pageSize.toString());
		let keys = [], values = [];
		if (queryParams.more) {
			params = params.append('more', 'true');
		}
		Object.keys(queryParams.filter).forEach(function (key) {
			if (typeof queryParams.filter[key] !== 'string' || queryParams.filter[key] !== '') {
				keys.push(key);
				values.push(queryParams.filter[key]);
			}
		});
		if (keys.length > 0) {
			params = params.append('filter.keys', keys.join('|'))
				.append('filter.vals', values.join('|'));
		}
		return params;
	}

	parseFilter(data){
		var filter={
			keys:'',
			vals:''
		}
		let keys = [], values = [];
		Object.keys(data).forEach(function (key) {
			if (typeof data[key] !== 'string' || data[key] !== '') {
				keys.push(key);
				values.push(data[key]);
			}
		});
		if (keys.length > 0) {
			filter.keys= keys.join('|');
			filter.vals= values.join('|');
		}
		return filter;
	}

	/**
	 * get standard content-type
	 */
	getHTTPHeaders(): HttpHeaders {
		
	var _token = '';

	_token=this.jwt_service.getToken();
		// this.tokenStorage.getAccessToken().subscribe(t => {
		// 		_token = t;
		// 	 });
		let result = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization':'Bearer '+ _token,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type'
		});
		return result;
	}

	getHTTPHeaders_Refresh(): HttpHeaders {
		
		debugger
		var _token = '';
	
		_token=this.jwt_service.get_refresh_token();
			// this.tokenStorage.getAccessToken().subscribe(t => {
			// 		_token = t;
			// 	 });
			console.log('get_refresh_token',_token);
			let result = new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization':_token,
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type'
			});
			return result;
		}
	// getHTTPHeaders(): HttpHeaders {
	// 	var _token = '';
	// 	this.tokenStorage.getAccessToken().subscribe(t => { _token = t; });
	// 	let result = new HttpHeaders({
	// 		'Token': _token != null ? _token : ''
	// 	});
	// 	result.append('Content-Type', 'application/json');
	// 	return result;
	// }

	baseFilter(_entities: any[], _queryParams: QueryParamsModel, _filtrationFields: string[] = []): QueryResultsModel {
		const httpExtention = new HttpExtenstionsModel();
		return httpExtention.baseFilter(_entities, _queryParams, _filtrationFields);
	}

	sortArray(_incomingArray: any[], _sortField: string = '', _sortOrder: string = 'asc'): any[] {
		const httpExtention = new HttpExtenstionsModel();
		return httpExtention.sortArray(_incomingArray, _sortField, _sortOrder);
	}

	searchInArray(_incomingArray: any[], _queryObj: any, _filtrationFields: string[] = []): any[] {
		const httpExtention = new HttpExtenstionsModel();
		return httpExtention.searchInArray(_incomingArray, _queryObj, _filtrationFields);
	}
}
