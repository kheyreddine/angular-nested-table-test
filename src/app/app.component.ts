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
  // Property to hold the table data
  tableData = TABLE_DATA;

  // Constructor with dependency injection of search service
  constructor(private searchService: SearchService) {}

  // Function to handle search input
  onSearch(event: any) {
    const query = event.target.value;
    this.searchService.setSearchValue(query);
  }
}
