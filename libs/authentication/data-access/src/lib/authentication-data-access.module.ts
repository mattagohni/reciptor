import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RECIPTOR_API_CONFIG} from '../../../feature/src/lib/tokens/injection-tokens';
import {RECIPTOR_CONFIG} from '@reciptor/app-config';

const reciptorConfig = RECIPTOR_CONFIG;

@NgModule({
  imports: [CommonModule],
  providers: [
    {provide: RECIPTOR_API_CONFIG, useValue: reciptorConfig}
  ]
})
export class AuthenticationDataAccessModule {}
