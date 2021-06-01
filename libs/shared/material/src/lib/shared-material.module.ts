import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [FlexLayoutModule, MatInputModule, MatButtonModule, MatCardModule, MatTableModule, MatToolbarModule, MatMenuModule],
  exports: [FlexLayoutModule, MatInputModule, MatButtonModule, MatCardModule, MatTableModule, MatToolbarModule, MatMenuModule],
})
export class SharedMaterialModule {
}
