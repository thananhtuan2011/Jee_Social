import { QueryParamsModelNew } from './../../../../core/_base/crud/models/query-models/query-params.model';
import { TokenStorage } from './../../../../core/auth/_services/token-storage.service';
import { LayoutUtilsService } from './../../../../core/_base/crud/utils/layout-utils.service';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { UserDataSource } from '../DataSources/User.datasource';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';
import { EditQuyenUserComponent } from '../edit-quyen-user/edit-quyen-user.component';

@Component({
  selector: 'kt-quan-ly-phan-quyen',
  templateUrl: './quan-ly-phan-quyen.component.html',
  styleUrls: ['./quan-ly-phan-quyen.component.scss']
})
export class QuanLyPhanQuyenComponent implements OnInit {

  dataSource: UserDataSource;
  displayedColumns: string[] = ['username','hoten','chucvu','actions'];
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

  
    private changeDetectorRefs: ChangeDetectorRef,
    private service:DashboardService,
    private layoutUtilsService: LayoutUtilsService,
    private tokenStorage:TokenStorage,
    public dialog: MatDialog,
  ) { }

 
  
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
		this.dataSource = new UserDataSource(this.service);
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
		this.dataSource.loadList_User(queryParams);
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
        this.dataSource.loadList_User(queryParams1);
			}
			else {
				const queryParams1 = new QueryParamsModelNew(
					this.filterConfiguration(),
					this.sort.direction,
					this.sort.active,
					this.paginator.pageIndex = 0,
					this.paginator.pageSize
				);
				this.dataSource.loadList_User(queryParams1);
			}
		}
	}

  Update_QuyenUser(id_user:number) {
    var data = Object.assign({}, id_user);
    // var data = Object.assign({}, item);
    
    const dialogRef = this.dialog.open(EditQuyenUserComponent, { data:id_user,
      
      width: '500px',
      height:'300px'});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
     
        this.loadDataList();
        this.changeDetectorRefs.detectChanges();
      }
      else
      {
        this.loadDataList();
        this.changeDetectorRefs.detectChanges();
      }
    });
  }

	/**
	 * Returns CSS Class name by condition
	 *
	 * @param condition: number
	 */

	filterConfiguration(): any {
		let filter: any = {};
		if (this.keyword)
			filter.UserName = this.keyword;
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
