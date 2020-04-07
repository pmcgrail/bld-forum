import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() error: boolean;
  @Input() loading: boolean;
  @Input() textControl: FormControl;

  @Output() saveComment: EventEmitter<null> = new EventEmitter();

  expand = false;

  constructor() {}

  validateInput() {
    return (
      this.textControl.touched &&
      this.textControl.dirty &&
      this.textControl.errors
    );
  }

  onSaveComment() {
    if (this.textControl.valid) {
      this.saveComment.emit();
    }
  }

  ngOnInit() {}
}
