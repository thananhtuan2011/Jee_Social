// Angular
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
// Layout
import { LayoutConfigService, SplashScreenService, TranslationService } from '../../../core/_base/layout';
// Auth
import { AuthNoticeService } from '../../../core/auth';
import { ActivatedRoute, Router, RouterLinkActive, Routes } from '@angular/router';

@Component({
	selector: 'kt-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit,AfterViewInit {
	// Public properties
	today: number = Date.now();
	headerLogo: string;
	isViewInitialized = false;
  
	navLinks = [];
	/**
	 * Component constructor
	 *
	 * @param el
	 * @param render
	 * @param layoutConfigService: LayoutConfigService
	 * @param authNoticeService: authNoticeService
	 * @param translationService: TranslationService
	 * @param splashScreenService: SplashScreenService
	 */
	constructor(
		private el: ElementRef,
		private render: Renderer2,
		private layoutConfigService: LayoutConfigService,
		public authNoticeService: AuthNoticeService,
		private translationService: TranslationService,
		private splashScreenService: SplashScreenService,
		private route: ActivatedRoute,
		private router: Router,
		private changeDetector: ChangeDetectorRef,
		
		
		
		) {
	}
	ngAfterViewInit(): void {
		this.isViewInitialized = true;
		this.changeDetector.detectChanges();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.translationService.setLanguage(this.translationService.getSelectedLanguage());
		this.headerLogo = this.layoutConfigService.getLogo();

		this.splashScreenService.hide();

		// router link login với register
		this.navLinks = (
			this.route.routeConfig && this.route.routeConfig.children ?
			this.buildNavItems(this.route.routeConfig.children) :
			[]
		  );
	}


	  
  buildNavItems(routes: Routes) {
    return (routes)
      .filter(route => route.data)
      .map(({ path = '', data }) => ({
        path: path,
        label: data.label,
        icon: data.icon
      }));
  }

  isLinkActive(rla: RouterLinkActive): boolean {
    const routerLink = rla.linksWithHrefs.first;
    
    return this.router.isActive(routerLink.urlTree, false);
  }






	/**
	 * Load CSS for this specific page only, and destroy when navigate away
	 * @param styleUrl
	 */
	private loadCSS(styleUrl: string) {
		return new Promise((resolve, reject) => {
			const styleElement = document.createElement('link');
			styleElement.href = styleUrl;
			styleElement.type = 'text/css';
			styleElement.rel = 'stylesheet';
			styleElement.onload = resolve;
			this.render.appendChild(this.el.nativeElement, styleElement);
		});
	}
}
