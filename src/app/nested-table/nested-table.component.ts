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
  // Input property to receive table data from parent component
  @Input() tableData: Person[] = TABLE_DATA;

  // Variable to keep track of the currently hovered row
  hoveredRow: number | null = null;

  // Variable to track if any checkbox is selected
  anyCheckboxSelected: boolean = false;

  // Observable for search functionality
  private searchSubject = new Subject<string>();

  // Variable to store the current search query
  private currentSearchQuery: string = '';

  // Constructor with dependency injection of search service
  constructor(private searchService: SearchService) {
    // Subscribe to search service to receive search queries
    this.searchService.getSearchValue().subscribe((query) => {
      this.currentSearchQuery = query;
      this.filterTableData(query);
    });
  }

  // Function to select all checkboxes
  selectAll(event: Event) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = (event.target as HTMLInputElement).checked;
      this.onRowSelect(checkbox);
    });
  }

  // Function to handle individual row selection
  onRowSelect(row: Person) {
    row.selected = !row.selected;
    this.anyCheckboxSelected = this.tableData.some((row) => row.selected);
  }

  // Function to toggle nested row visibility
  toggleRow(row: Person) {
    row.expanded = !row.expanded;
  }

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

  // Function to handle deletion of multiple rows
  deleteMultiple() {
    // Deleting multiple rows
  }
}
