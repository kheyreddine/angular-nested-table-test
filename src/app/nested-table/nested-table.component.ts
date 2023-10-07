import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TABLE_DATA } from 'src/assets/data';
import { ResizeColumnDirective } from '../directives/resize-column.directive';
import { Person } from '../models/person';

@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, BrowserAnimationsModule, ResizeColumnDirective],
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

  onSearch(query: any) {
    // Implement logic for searching and updating the displayed rows
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
