import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { navData } from './nav-data';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  navData = navData;
  isActive = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Logout`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('authToken');
        this.router.navigateByUrl('login');
      }
    })
  }
}
