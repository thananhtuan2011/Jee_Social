import { BaiDangDataSource } from './../../../../core/auth/_data-sources/baidang.datasource';

import { QueryParamsModelNew } from './../../../../core/_base/crud/models/query-models/query-params.model';
import { TokenStorage } from './../../../../core/auth/_services/token-storage.service';
import { SharedService } from './../../../../core/auth/_services/sharedata.service';
import { LayoutUtilsService, MessageType } from './../../../../core/_base/crud/utils/layout-utils.service';

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';
import { QuanLyBaiDangDataSource } from '../DataSources/BaiDangquanly.datasource';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'kt-quanly-baidang',
  templateUrl: './quanly-baidang.component.html',
  styleUrls: ['./quanly-baidang.component.scss']
})
export class QuanlyBaidangComponent implements OnInit {

  dataSource: QuanLyBaiDangDataSource;
  displayedColumns: string[] = ['username','ngaytao','title','loai','noidung','actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// Selection
	// selection = new SelectionModel<DepartmentModel>(true, []);
	// productsResult: DepartmentModel[] = [];
	id_menu: number = 60702;
	//=================PageSize Table=====================
	pageSize: number;
	flag: boolean = true;
  keyword: string = '';
  listUser:any[]=[];
  tam:string;
  id_phong:number;
  constructor(

    private service:DashboardService,
    private changeDetectorRefs: ChangeDetectorRef,
    private  sharedService: SharedService,
    private layoutUtilsService: LayoutUtilsService,
	private tokenStorage:TokenStorage,
	private translate: TranslateService,
  ) { }

  getData(){
    
    this.sharedService.id_phongban.subscribe(sharedata => this.tam = sharedata)

    this.id_phong=Number(this.tam );
   
  }
  DeleteBaiDang(id_bd:number)
  {
	  
		  const _title = this.translate.instant('Xóa Bài Đăng');
			const _description = this.translate.instant('Bạn có muốn xóa không ?');
			const _waitDesciption = this.translate.instant('Dữ liệu đang được xóa');
			const _deleteMessage = this.translate.instant('Xóa thành công !');
	
			const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					return;
		}
		//debugger
	
		
	
		this.service.DeleteBaidang(id_bd).subscribe(res=>{
			this.loadDataList();

          this.changeDetectorRefs.detectChanges();

						
					this.layoutUtilsService.OffWaitingDiv();
					if (res && res.status === 1) {
						this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete, 4000, true, false, 3000, 'top');
					}
					else {
						this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 9999999999, true, false, 3000, 'top' );
					}
				
					
				});
			});
  }
  
  ngOnInit() {
		this.tokenStorage.getPageSize().subscribe(res => {
			this.pageSize = +res;
		});
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => {
					this.loadDataList();
				})
			)
			.subscribe();
		// Init DataSource
		this.dataSource = new QuanLyBaiDangDataSource(this.service);
		this.dataSource.entitySubject.subscribe(res =>{});
		this.loadDataList();
	}

	ngOnChanges() {
		if (this.dataSource)
			this.loadDataList();
	}

	loadDataList() {
		const queryParams = new QueryParamsModelNew(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		this.dataSource.loadList_BaiDang(queryParams);
		setTimeout(x => {
			this.loadPage();
		}, 500)
	}
	loadPage() {
		var arrayData = [];
		this.dataSource.entitySubject.subscribe(res => arrayData = res);
		if (arrayData !== undefined && arrayData.length == 0) {
			var totalRecord = 0;
			this.dataSource.paginatorTotal$.subscribe(tt => totalRecord = tt)
			if (totalRecord > 0) {
				const queryParams1 = new QueryParamsModelNew(
					this.filterConfiguration(),
					this.sort.direction,
					this.sort.active,
					this.paginator.pageIndex = this.paginator.pageIndex - 1,
					this.paginator.pageSize
				);
        this.dataSource.loadList_BaiDang(queryParams1);
			}
			else {
				const queryParams1 = new QueryParamsModelNew(
					this.filterConfiguration(),
					this.sort.direction,
					this.sort.active,
					this.paginator.pageIndex = 0,
					this.paginator.pageSize
				);
				this.dataSource.loadList_BaiDang(queryParams1);
			}
		}
	}


	/**
	 * Returns CSS Class name by condition
	 *
	 * @param condition: number
	 */

	filterConfiguration(): any {
		let filter: any = {};
		if (this.keyword)
			filter.TIEUDE = this.keyword;
		// filter.HOTEN = "My";
		return filter;
	}

	XuatFile(item: any) {
		var linkdownload = item.Link;
		window.open(linkdownload);

	}

	

	// getHeight(): any {
	// 	let tmp_height = 0;
	// 	tmp_height = window.innerHeight - 175; // 286
	// 	return tmp_height + 'px';
	// }
	getHeight(): any {
		let obj = window.location.href.split("/").find(x => x == "wework");
		if (obj) {
			let tmp_height = 0;
			tmp_height = window.innerHeight - 197;
			return tmp_height + 'px';
		} else {
			let tmp_height = 0;
			tmp_height = window.innerHeight - 140;
			return tmp_height + 'px';
		}
	}
	quickEdit(item) {
		this.layoutUtilsService.showActionNotification("Updating");
	}
	updateStage(item) {
		this.layoutUtilsService.showActionNotification("Updating");
	}



}
