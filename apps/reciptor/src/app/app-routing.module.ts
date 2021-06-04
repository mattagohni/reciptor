import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from './guard/authentication.guard';

const routes: Routes = [
  {
    path: 'tools',
    loadChildren: () =>
      import('@reciptor/tools/feature').then(
        (module) => module.ToolsFeatureModule
      ),
    canLoad: [AuthenticationGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@reciptor/authentication/feature').then(
        (module) => module.ReciptorAuthenticationFeatureModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
