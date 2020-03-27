import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from 'src/app/models';
import { UserService } from 'src/app/providers';

@Component({
  selector: 'app-user-tag',
  templateUrl: './user-tag.component.html',
  styleUrls: ['./user-tag.component.scss'],
})
export class UserTagComponent implements OnInit {
  @Input() userId: string;

  user$: Observable<IUser>;

  constructor(private service: UserService) {}

  ngOnInit() {
    this.user$ = this.service.getUser(this.userId);
  }
}
