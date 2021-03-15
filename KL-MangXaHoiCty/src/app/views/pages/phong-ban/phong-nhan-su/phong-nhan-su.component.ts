import { QueryParamsModelNew } from './../../../../core/_base/crud/models/query-models/query-params.model';
import { TokenStorage } from './../../../../core/auth/_services/token-storage.service';
import { SharedService } from './../../../../core/auth/_services/sharedata.service';
import { LayoutUtilsService } from './../../../../core/_base/crud/utils/layout-utils.service';
import { PhongbanService } from './../phongban.service';
import { PhongBanDataSource } from './../Data-source/phongban.datasource';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

export interface PeriodicElement {
  hoten: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'kt-phong-nhan-su',
  templateUrl: './phong-nhan-su.component.html',
  styleUrls: ['./phong-nhan-su.component.scss']
})
export class PhongNhanSuComponent implements OnInit {


  dataSource: PhongBanDataSource;
  displayedColumns: string[] = ['hoten','ngayvaolam','diachi','gioitinh','tenphong'];
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

    private service:PhongbanService,
    private changeDetectorRefs: ChangeDetectorRef,
    private  sharedService: SharedService,
    private layoutUtilsService: LayoutUtilsService,
    private tokenStorage:TokenStorage
  ) { }

  getData(){
    
    this.sharedService.id_phongban.subscribe(sharedata => this.tam = sharedata)

    this.id_phong=Number(this.tam );
   
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
		this.dataSource = new PhongBanDataSource(this.service);
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
		this.dataSource.loadList_NV(2,queryParams);
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
        this.dataSource.loadList_NV(2,queryParams1);
			}
			else {
				const queryParams1 = new QueryParamsModelNew(
					this.filterConfiguration(),
					this.sort.direction,
					this.sort.active,
					this.paginator.pageIndex = 0,
					this.paginator.pageSize
				);
				this.dataSource.loadList_NV(2,queryParams1);
			}
		}
	}
	getItemStatusString(status: number = 0): string {
		switch (status) {
			case 0:
				return 'Selling';
			case 1:
				return 'Sold';
		}
		return '';
	}
	getItemCssClassByLocked(status: number = 0): string {
		switch (status) {
			case 0:
				return 'success';
			case 1:
				return 'info';
		}
		return '';
	}
	getItemLockedString(condition: number = 0): string {
		switch (condition) {
			case 1:
				return 'ACTIVE';
			case 0:
				return 'LOCKED';
		}
		return '';
	}

	/**
	 * Returens item CSS Class Name by status
	 *
	 * @param status: number
	 */
	getItemCssClassByStatus(status: number = 0): string {
		switch (status) {
			case 0:
				return 'success';
			case 1:
				return 'info';
		}
		return '';
	}
	getColorProgressbar(status: number = 0): string {
		if (status < 50)
			return 'metal';
		else
			if (status < 100)
				return 'brand';
			else
				return 'success';
	}
	/**
	 * Returns item condition
	 *
	 * @param condition: number
	 */
	getItemConditionString(condition: number = 0): string {
		switch (condition) {
			case 1:
				return 'Đúng tiến độ';
			case 3:
				return 'Rủi ro cao';
		}
		return 'Chậm tiến độ';
	}

	/**
	 * Returns CSS Class name by condition
	 *
	 * @param condition: number
	 */
	getItemCssClassByCondition(condition: number = 0): string {
		switch (condition) {
			case 1:
				return 'success';
			case 2:
				return 'brand';
		}
		return 'metal';
	}
	filterConfiguration(): any {
		let filter: any = {};
		if (this.keyword)
			filter.keyword = this.keyword;
		return filter;
	}

	XuatFile(item: any) {
		var linkdownload = item.Link;
		window.open(linkdownload);

	}

	// /** Delete */
	// Delete(_item: DepartmentModel) {
	// 	// const _title = this.translate.instant('JeeHR.xoa');
	// 	// const _description = this.translate.instant('JeeHR.bancochacchanmuonxoakhong');
	// 	// const _waitDesciption = this.translate.instant('JeeHR.dulieudangduocxoa');
	// 	// const _deleteMessage = this.translate.instant('JeeHR.xoathanhcong');

	// 	// const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
	// 	// dialogRef.afterClosed().subscribe(res => {
	// 	// 	if (!res) {
	// 	// 		return;
	// 	// 	}

	// 	// 	this.deptService.Delete_WorkProcess(_item.RowID).subscribe(res => {
	// 	// 		if (res && res.status === 1) {
	// 	// 			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete, 4000, true, false, 3000, 'top', 1);
	// 	// 		}
	// 	// 		else {
	// 	// 			this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 9999999999, true, false, 3000, 'top', 0);
	// 	// 		}
	// 	// 		this.loadDataList();
	// 	// 	});
	// 	// });
	// }
	// Add() {
	// 	const ProcessWorkModels = new DepartmentModel();
	// 	ProcessWorkModels.clear(); // Set all defaults fields
	// 	this.Update(ProcessWorkModels);
	// }

	// Update(_item: DepartmentModel) {
	// 	// let saveMessageTranslateParam = '';
	// 	// saveMessageTranslateParam += _item.RowID > 0 ? 'JeeHR.capnhatthanhcong' : 'JeeHR.themthanhcong';
	// 	// const _saveMessage = this.translate.instant(saveMessageTranslateParam);
	// 	// const _messageType = _item.RowID > 0 ? MessageType.Update : MessageType.Create;
	// 	// const dialogRef = this.dialog.open(ProcessWorkEditComponent, { data: { _item, _type: 0 }, height: '70%', width: '50%' });
	// 	// dialogRef.afterClosed().subscribe(res => {
	// 	// 	if (!res) {
	// 	// 		this.loadDataList();
	// 	// 	}
	// 	// 	else {
	// 	// 		this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 4000, true, false);
	// 	// 		this.loadDataList();
	// 	// 	}
	// 	// });
	// }

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
