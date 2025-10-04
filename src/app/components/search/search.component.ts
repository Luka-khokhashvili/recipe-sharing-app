import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [FormsModule, InputText],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() searchTermChanged = new EventEmitter<string>();
  private searchTerms = new Subject<string>();

  constructor() {
    this.searchTerms
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.searchTermChanged.emit(term));
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (!target) return; // safety check

    const term = target.value;
    this.searchTerms.next(term);
  }
}
