import { Component } from '@angular/core';
import { ErrorPanelService } from '../services/error-panel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-panel',
  templateUrl: './error-panel.component.html',
  styleUrls: ['./error-panel.component.scss'],
})
export class ErrorPanelComponent {
  statusCode: string;
  errorMsg: string;
  origin: string;

  constructor(
    private errorPanelService: ErrorPanelService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.origin = params['origin'] || '/';
    });
    this.statusCode = this.errorPanelService.errorStatusCode;
    this.errorMsg = this.errorPanelService.errorMessage;
  }

  goBackToOrigin() {
    this.router.navigateByUrl(this.origin);
  }
}
