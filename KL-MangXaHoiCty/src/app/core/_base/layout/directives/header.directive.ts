// Angular
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
// ObjectPath
import * as objectPath from 'object-path';

export interface HeaderOptions {
	classic?: any;
	offset?: any;
	minimize?: any;
}

/**
 * Configure Header
 */
@Directive({
	selector: '[ktHeader]',
	exportAs: 'ktHeader',
})
export class HeaderDirective implements AfterViewInit {
	@Input() options: HeaderOptions = {};

	/**
	 * Directive Constructor
	 * @param el: ElementRef
	 */
	constructor(private el: ElementRef) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		this.setupOptions();

		const header = new KTHeader(this.el.nativeElement, this.options);
	}

	/**
	 * Setup options to header
	 */
	//  khoảng dòng mà menu 2 sẽ load
	private setupOptions() {
		this.options = {
			classic: {
				desktop: true,
				mobile: false
			},
		};

		if (this.el.nativeElement.getAttribute('data-ktheader-minimize') == '1') {
			objectPath.set(this.options, 'minimize', {
				desktop: {
					on: 'kt-header--minimize'
				},
				mobile: {
					on: 'kt-header--minimize'
				}
			});
			objectPath.set(this.options, 'offset', {
				desktop: 0,
				mobile: 0
					//  khoảng dòng mà menu 2 sẽ load 0,0 khi kéo xuống nó load liền  còn 150 vs 200 thì kéo 1 đoạn nó mới load
			});
		}
	}
}
