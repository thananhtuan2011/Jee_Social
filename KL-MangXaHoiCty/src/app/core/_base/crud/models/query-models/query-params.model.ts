export class QueryParamsModel {
	// fields
	filter: any;
	sortOrder: string; // asc || desc
	sortField: string;
	pageNumber: number;
	pageSize: number;

	// constructor overrides
	constructor(_filter: any,
		           _sortOrder: string = 'asc',
		           _sortField: string = '',
		           _pageNumber: number = 0,
		           _pageSize: number = 10) {
		this.filter = _filter;
		this.sortOrder = _sortOrder;
		this.sortField = _sortField;
		this.pageNumber = _pageNumber;
		this.pageSize = _pageSize;
	}
}
	
	export class QueryParamsModelNew {
		// fields
		filter: any;
		sortOrder: string; // asc || desc
		sortField: string;
		pageNumber: number;
		pageSize: number;
		more: boolean;
	
		// constructor overrides
		constructor(_filter: any,
			_sortOrder: string = 'asc',
			_sortField: string = '',
			_pageNumber: number = 0,
			_pageSize: number = 10,
			_more: boolean = false) {
			this.filter = _filter;
			this.sortOrder = _sortOrder;
			this.sortField = _sortField;
			this.pageNumber = _pageNumber;
			this.pageSize = _pageSize;
			this.more = _more;
		}
	}


		export class QueryParamsModelNewLazy {
			// fields
			filter: any;
			sortOrder: string; // asc || desc
			sortField: string;
			pageNumber: number;
			pageSize: number;
			more: boolean;
		
			// constructor overrides
			constructor(_filter: any,
				_sortOrder: string = 'asc',
				_sortField: string = '',
				_pageNumber: number,
				_pageSize: number,
				_more: boolean = false) {
				this.filter = _filter;
				this.sortOrder = _sortOrder;
				this.sortField = _sortField;
				this.pageNumber = _pageNumber;
				this.pageSize = _pageSize;
				this.more = _more;
			}
}
