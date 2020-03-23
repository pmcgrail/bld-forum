import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { PostsService } from '../../providers/posts.service';
import { IUser } from '../../models/user.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts$;
  destroy$: Subject<null> = new Subject();

  constructor(private service: PostsService) {}

  ngOnInit() {
    this.posts$ = this.service.getPosts();
    this.posts$.subscribe(posts => console.log(posts));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
