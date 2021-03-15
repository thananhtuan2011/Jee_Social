import { QueryParamsModelNew } from './../../../../../core/_base/crud/models/query-models/query-params.model';
import { BaiDangService } from './../../../../pages/home/Bai-Dang/_Services/bai-dang.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
// Angular
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'kt-search-dropdown',
	templateUrl: './search-dropdown.component.html',
})
export class SearchDropdownComponent implements OnInit {
	// Public properties

	// Set icon class name
	@Input() icon = 'flaticon2-search-1';

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	@Input() type: 'brand' | 'success' | 'warning' = 'success';

	@ViewChild('searchInput', {static: true}) searchInput: ElementRef;

	data: any[];
	result: any[];
	tam:any[];
	loading: boolean;
	id_user:number;

	item:any[]=[];
	list_baidang:any[]=[];

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	constructor(private cdr: ChangeDetectorRef,
		    private tokenStore:TokenStorage,
		private _services:BaiDangService,
			private changeDetectorRefs: ChangeDetectorRef,
		) {

	}

	/**
	 * On init
	 */

	LoadDSBaiDang()
	{	const queryParams1 = new QueryParamsModelNew(
			{}
	);

	
		this._services.getlistBaiDang(queryParams1).subscribe(res=>{

			this.list_baidang=res.data;
		
			this.changeDetectorRefs.detectChanges();
		})
	}


	LoadData_current_user() {
		// debugger
		this.tokenStore.getUserData().subscribe(res =>{
		  this.item= res;
		  this.id_user=res.ID_user;
		});
	  }
	  
	ngOnInit(): void {


		this.LoadData_current_user();
		this.LoadDSBaiDang();
		// simulate result from API
		// type 0|1 as separator or item
	// 	this.result = [
	// 		{
	// 			text: 'Documents',
	// 			type: 0
	// 		}, {
	// 			icon: '<i class="flaticon-interface-3 kt-font-warning">',
	// 			text: 'Annual finance report',
	// 			type: 1
	// 		}, {
	// 			icon: '<i class="flaticon-share kt-font-success"></i>',
	// 			text: 'Company meeting schedule',
	// 			type: 1
	// 		}, {
	// 			icon: '<i class="flaticon-paper-plane kt-font-info"></i>',
	// 			text: 'Project quotations',
	// 			type: 1
	// 		}, {
	// 			text: 'Customers',
	// 			type: 0
	// 		}, {
	// 			img: '<img src="assets/media/users/user1.jpg" alt="">',
	// 			text: 'Amanda Anderson',
	// 			type: 1
	// 		}, {
	// 			img: '<img src="assets/media/users/user2.jpg" alt="">',
	// 			text: 'Kennedy Lloyd',
	// 			type: 1
	// 		}, {
	// 			img: '<img src="assets/media/users/user3.jpg" alt="">',
	// 			text: 'Megan Weldon',
	// 			type: 1
	// 		}, {
	// 			img: '<img src="assets/media/users/user4.jpg" alt="">',
	// 			text: 'Marc-André ter Stegen',
	// 			type: 1
	// 		}, {
	// 			text: 'Files',
	// 			type: 0
	// 		}, {
	// 			icon: '<i class="flaticon-lifebuoy kt-font-warning"></i>',
	// 			text: 'Revenue report',
	// 			type: 1
	// 		}, {
	// 			icon: '<i class="flaticon-coins kt-font-primary"></i>',
	// 			text: 'Anual finance report',
	// 			type: 1
	// 		}, {
	// 			icon: '<i class="flaticon-calendar kt-font-danger"></i>',
	// 			text: 'Tax calculations',
	// 			type: 1
	// 		}
	// 	];
	 }

	/**
	 * Search
	 * @param e: Event
	 */
	private _normalizeValue(value: string): string {
		return value.toLowerCase().replace(/\s/g, '');
	}

	private _filterStates(value: string): any[] {
		// debugger
		//	const filterValue = value.toLowerCase();
		const filterValue = this._normalizeValue(value);
		return this.list_baidang.filter(state => this._normalizeValue(state.title).includes(filterValue));
	}

	search(e) {
		this.data = null;
		if (e.target.value.length > 0) {
			this.loading = true;
			// simulate getting search result
			// this.tam = this.result.filter(s => s.text===e.target.value);
			this.tam=this._filterStates(e.target.value);

			setTimeout(() => {
				this.data = this.tam;
				this.loading = false;
				this.cdr.markForCheck();
			}, 100);
		}
	}

	/**
	 * Clear search
	 *
	 * @param e: Event
	 */
	clear(e) {
		this.data = null;
		this.searchInput.nativeElement.value = '';
	}

	openChange() {
		setTimeout(() => this.searchInput.nativeElement.focus());
	}
}
