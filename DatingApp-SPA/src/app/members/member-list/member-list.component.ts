import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  pagination : Pagination;
  pageNumber = 1 ;
  pageSize = 6;
  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }


 ngOnInit() {
    //this.loadUsers();
    this.route.data.subscribe(data => {
    this.users = data['users'].result;
    this.pagination = data['users'].pagination;
  });
  this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
  this.userParams.minAge = 18;
  this.userParams.maxAge = 99;
  this.userParams.orderBy = "lastActive";

}

resetFilters() {
  this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
  this.userParams.minAge = 18;
  this.userParams.maxAge = 99;
  this.loadUsers();
}

  loadUsers() {
    this.userService.getUsers(this.pageNumber, this.pageSize , this.userParams)
      .subscribe(response =>{
        this.users = response.result;
       this.pagination = response.pagination;
      }) 
  }
  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadUsers();
  }
  // loadUsers() {
  //   this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
  //     .subscribe((response : PaginatedResult<User[]>) => {
  //       this.users = response.result;
  //       this.pagination = response.pagination;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
