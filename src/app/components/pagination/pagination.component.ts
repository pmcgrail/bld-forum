import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() max: number;

  @Output() prev: EventEmitter<null> = new EventEmitter();
  @Output() next: EventEmitter<null> = new EventEmitter();

  current: number = 1;

  constructor() {}

  onPrev() {
    this.prev.emit();
    this.current--;
  }

  onNext() {
    this.next.emit();
    this.current++;
  }

  ngOnInit() {}
}
