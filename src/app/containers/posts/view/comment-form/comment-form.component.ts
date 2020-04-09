import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CommentService, UIStateService } from 'src/app/providers';
import { COMMENT_MIN, COMMENT_MAX } from 'src/app/data';
import { IComment } from 'src/app/models';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() authId: string;
  @Input() postId: string;

  expand = false;
  loading: boolean;

  textControl = new FormControl('', [
    Validators.required,
    Validators.minLength(COMMENT_MIN),
    Validators.maxLength(COMMENT_MAX),
  ]);

  constructor(
    private service: CommentService,
    private uiService: UIStateService
  ) {}

  validateInput() {
    return (
      this.textControl.touched &&
      this.textControl.dirty &&
      this.textControl.errors
    );
  }

  saveComment() {
    this.loading = true;
    const data: IComment = {
      text: this.textControl.value,
      userId: this.authId,
      createdDate: new Date(),
    };
    this.service
      .createComment(this.postId, data)
      .then(this.onSaveCommentSuccess, this.onSaveCommentError);
  }

  onSaveCommentSuccess = () => {
    this.loading = false;
    this.textControl.reset();
    this.uiService.snackbar('Comment saved');
  };

  onSaveCommentError = (error) => {
    console.error(error);
    this.loading = false;
    this.uiService.snackbar('Error saving comment');
  };

  ngOnInit() {}
}
