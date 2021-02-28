import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [FlexLayoutModule, MatInputModule, MatCardModule, MatToolbarModule],
  exports: [FlexLayoutModule, MatInputModule, MatCardModule, MatToolbarModule],
})
export class SharedMaterialModule {}
