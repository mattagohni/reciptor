import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [FlexLayoutModule, MatInputModule, MatCardModule, MatTableModule, MatToolbarModule],
  exports: [FlexLayoutModule, MatInputModule, MatCardModule, MatTableModule, MatToolbarModule],
})
export class SharedMaterialModule {}
