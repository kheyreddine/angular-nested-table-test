import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TABLE_DATA } from 'src/assets/data';
import { ResizeColumnDirective } from '../directives/resize-column.directive';
import { Person } from '../models/person';
import { SearchService } from '../services/search.service';
@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ResizeColumnDirective],
})
export class NestedTableComponent {
  @Input() tableData: Person[] = TABLE_DATA;
  hoveredRow: number | null = null;

  // Add a property to keep track of selected checkboxes
  anyCheckboxSelected: boolean = false;

  private searchSubject = new Subject<string>();
  private currentSearchQuery: string = ''; // Add this variable

  constructor(private searchService: SearchService) {
    this.searchService.getSearchValue().subscribe((query) => {
      this.currentSearchQuery = query;
      this.filterTableData(query);
    });
  }

  // Add the rest of the functions here...
  selectAll(event: Event) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = (event.target as HTMLInputElement).checked;
      this.onRowSelect(checkbox);
    });
  }

  onRowSelect(row: Person) {
    row.selected = !row.selected;
    this.anyCheckboxSelected = this.tableData.some((row) => row.selected);
  }

  toggleRow(row: Person) {
    row.expanded = !row.expanded;
  }

  // isRowSelected(row: Person): boolean {
  //   return this.selectedRows[row.name];
  // }

  // Function to filter the table data based on the search query
  private filterTableData(query: string): void {
    if (!query) {
      this.tableData = TABLE_DATA; // Reset to original data when query is empty
      return;
    }

    this.tableData = TABLE_DATA.filter(
      (row) =>
        row.name.toLowerCase().includes(query.toLowerCase()) ||
        this.hasMatchingChild(row, query)
    );
  }

  // Function to check if a row has a matching child
  private hasMatchingChild(row: Person, query: string): boolean {
    if (row.children) {
      return row.children.some(
        (child) =>
          child.name.toLowerCase().includes(query.toLowerCase()) ||
          this.hasMatchingChild(child, query)
      );
    }
    return false;
  }

  // Function to handle search input
  onSearch(event: any) {
    const query = event.target.value;
    this.searchService.setSearchValue(query);
  }

  deleteMultiple() {
    // Deleting multiple rows
  }
}
