import { Component } from '@angular/core';
import { TABLE_DATA } from 'src/assets/data';
import { NestedTableComponent } from './nested-table/nested-table.component';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NestedTableComponent],
})
export class AppComponent {
  tableData = TABLE_DATA;

  constructor(private searchService: SearchService) {}

  onSearch(event: any) {
    const query = event.target.value;
    this.searchService.setSearchValue(query);
  }
}
