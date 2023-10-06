import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NestedTableComponent } from './nested-table/nested-table.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NestedTableComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
