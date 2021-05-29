import { InjectionToken } from '@angular/core';
export * from './lib/reciptor-configuration.module';
// @todo has to go into its own lib
export const RECIPTOR_API_URL = new InjectionToken<string>('reciptorBaseUrl');
