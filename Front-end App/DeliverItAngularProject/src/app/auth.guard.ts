import { inject, Injectable } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ErrorPanelService } from './services/error-panel.service';
import { User } from './entities/user.entity';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const router = inject(Router);
    const errorPanelService = inject(ErrorPanelService);

    const loggedUser: User = JSON.parse(sessionStorage.getItem('user'));

    const requiredUserType: string[] = next.data['role'];

    if (loggedUser) {
      if (!requiredUserType) {
        return true;
      }

      if (requiredUserType.some((r) => r === loggedUser.userType.description)) {
        return true;
      } else {
        errorPanelService.setProperties({
          message: 'Access denied',
          status: 401,
        });
        return router.createUrlTree(['error-panel']);
      }
    } else {
      return router.createUrlTree(['/login']);
    }
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  return inject(PermissionsService).canActivate(next, state);
};
