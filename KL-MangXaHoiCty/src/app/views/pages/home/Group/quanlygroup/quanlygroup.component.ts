import { QueryParamsModelNew } from './../../../../../core/_base/crud/models/query-models/query-params.model';
import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { SharedService } from './../../../../../core/auth/_services/sharedata.service';
import { GroupService } from './../../Bai-Dang/_Services/group.service';

import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { GroupDataSource } from '../group.datasource';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EditQuyenComponent } from '../edit-quyen/edit-quyen.component';



@Component({
  selector: 'kt-quanlygroup',
  templateUrl: './quanlygroup.component.html',
  styleUrls: ['./quanlygroup.component.scss']
})
export class QuanlygroupComponent implements OnInit {

 
  dataSource: GroupDataSource;
  displayedColumns: string[] = ['Username','create_date','quyen_group','actions'];
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
  item_11:any[]=[];
  id_phong:number;
  @Input() id_g: any;
  constructor(

    private service:GroupService,
    private changeDetectorRefs: ChangeDetectorRef,
    private  sharedService: SharedService,
    private layoutUtilsService: LayoutUtilsService,
    private tokenStorage:TokenStorage,
    private route:ActivatedRoute,
	private translate: TranslateService,
	public dialog: MatDialog,

  ) { }


  Update_Quyen(item,index,indexc=-1) {
	var data = Object.assign({}, item);
	// var data = Object.assign({}, item);
	
	const dialogRef = this.dialog.open(EditQuyenComponent, { data:data,
		
		width: '500px' });
	dialogRef.afterClosed().subscribe(res => {
		if (res) {
			item.quyen = res.quyen
			this.loadDataList();
			//this.changeDetectorRefs.detectChanges();
		}
		else
		{
			this.loadDataList();
			///this.changeDetectorRefs.detectChanges();
		}
	});
}
  getData(){
    
    this.sharedService.id_phongban.subscribe(sharedata => this.tam = sharedata)

    this.id_phong=Number(this.tam );
   
  }
  
  LoadData() {
    // debugger
    this.tokenStorage.getUserData().subscribe(res =>{
      this.item_11= res;
    });
    }
  ngOnInit() {

     
    this.route.params.subscribe(params => {
    
      this.id_g =+params.id_group;
      this.changeDetectorRefs.detectChanges();
    });
    this.LoadData();
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
		this.dataSource = new GroupDataSource(this.service);
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
		this.dataSource.loadList_User(this.id_g ,queryParams);
		// setTimeout(x => {
		// 	this.loadPage();
		// }, 500)
	}
	loadPage() {
		debugger
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
        this.dataSource.loadList_User(this.id_g,queryParams1);
			}
			else {
				const queryParams1 = new QueryParamsModelNew(
					this.filterConfiguration(),
					this.sort.direction,
					this.sort.active,
					this.paginator.pageIndex = 0,
					this.paginator.pageSize
				);
				this.dataSource.loadList_User(this.id_g,queryParams1);
			}
		}
	}
	
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
  
  creaFormDelete(id_group:number,id_user:number)
		{
      
			const _title = this.translate.instant('X??a User');
			const _description = this.translate.instant('B???n c?? mu???n x??a kh??ng ?');
			const _waitDesciption = this.translate.instant('D??? li???u ??ang ???????c x??a');
			const _deleteMessage = this.translate.instant('X??a th??nh c??ng !');
	
			const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					return;
		}
		//debugger
	
		
	
				this.service.Delete_User_Group(id_group,id_user).subscribe(res => {
           
          this.loadDataList();
          this.changeDetectorRefs.detectChanges();

						
					//this.layoutUtilsService.OffWaitingDiv();
					if (res && res.status === 1) {
						this.layoutUtilsService.showActionNotification('X??a th??nh c??ng !', MessageType.Delete, 4000, true, false, 3000, 'top');
					}
					else {
						this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 9999999999, true, false, 3000, 'top' );
					}
				
					
				});
			});
		 }


  
  Delete()
  {

  }
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
