import { LayoutUtilsService } from './../../../../../core/_base/crud/utils/layout-utils.service';
// Angular
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Inject, Input, Output, EventEmitter, ViewEncapsulation, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// Material
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material';
// RxJS
import { Observable, BehaviorSubject, Subscription, ReplaySubject } from 'rxjs';
// NGRX
// Service

//Models

import moment from 'moment';


@Component({
	selector: 'kt-color-picker',
	templateUrl: './color-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})

export class ColorPickerComponent implements OnInit, OnChanges {
	// Public properties
	@Input() selected: string;
	@Output() ItemSelected = new EventEmitter<any>();

	public defaultColors: string[] = [
		'bg1',
		'bg2',
		'bg3',
		'bg4',
		'bg5',
		'bg6',
		'bg7',
		'bg8',
		'bg9',
		'bg10',
	];
	constructor(
		private FormControlFB: FormBuilder,
		public dialog: MatDialog,
		private layoutUtilsService: LayoutUtilsService,
	
		private changeDetectorRefs: ChangeDetectorRef) { }

	/**
	 * On init
	 */
	ngOnInit() {
	}
	ngOnChanges() {

	}
	select(user) {
		this.ItemSelected.emit(user)
	}
}
