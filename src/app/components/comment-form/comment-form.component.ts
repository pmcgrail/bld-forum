import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Output()
  saveComment: EventEmitter<string> = new EventEmitter();

  text = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(500),
  ]);

  constructor() {}

  validateInput() {
    return this.text.touched && this.text.dirty && this.text.errors;
  }

  onSaveComment() {
    if (this.text.valid) {
      this.saveComment.emit(this.text.value);
    }
  }

  ngOnInit() {}
}
