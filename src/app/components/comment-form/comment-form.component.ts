import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input()
  text: FormControl;

  @Output()
  saveComment: EventEmitter<null> = new EventEmitter();

  expand = false;

  constructor() {}

  validateInput() {
    return this.text.touched && this.text.dirty && this.text.errors;
  }

  onSaveComment() {
    if (this.text.valid) {
      this.saveComment.emit();
    }
  }

  ngOnInit() {}
}
