import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TABLE_DATA } from 'src/assets/data';
import { ResizeColumnDirective } from '../directives/resize-column.directive';
import { Person } from '../models/person';
@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ResizeColumnDirective,
  ],
})
export class NestedTableComponent {
  @Input() tableData: Person[] = TABLE_DATA;
  hoveredRow: number | null = null;
  // Object to keep track of expanded state for each row
  expandedRows: { [key: string]: boolean } = {};

  // Object to keep track of selected state for each row
  selectedRows: { [key: string]: boolean } = {};

  // Add a property to keep track of selected checkboxes
  anyCheckboxSelected: boolean = false;

  private searchSubject = new Subject<string>();
  private currentSearchQuery: string = ''; // Add this variable

  constructor() {
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.filterTableData(this.currentSearchQuery); // Use the current search query
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
    this.expandedRows[row.name] = !this.expandedRows[row.name];
  }

  isRowExpanded(row: Person): boolean {
    return this.expandedRows[row.name];
  }

  isRowSelected(row: Person): boolean {
    return this.selectedRows[row.name];
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
    this.currentSearchQuery = query; // Update the current search query

    this.searchSubject.next(query);
  }

  deleteMultiple() {
    const selectedRows = this.tableData.filter((row) => row.selected);

    if (selectedRows.length > 0) {
      // Implement the logic to delete multiple rows here

      // After deletion, you may want to update the table data
      // For example:
      this.tableData = this.tableData.filter((row) => !row.selected);

      // Reset the checkboxes
      this.anyCheckboxSelected = false;
    }
  }
}
