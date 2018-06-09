import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {UserServices} from '../shared/user.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  name :string = null;
  uid : string = null;
  email : string = null
  isLoggedIn : boolean = false;
  constructor(private userService : UserServices , private router : Router) { }

  ngOnInit() {

    this.userService.statusChanged.subscribe(userData =>{
      if(userData){
        this.name = userData.name;
        this.email = userData.email;
        this.uid = userData.uid;
      }
      else{
        this.name = null;
        this.email = null;
        this.uid = null;
      }
    });

    firebase.auth().onAuthStateChanged(userData =>{

      if(userData && userData.emailVerified)
      {
        this.isLoggedIn = true;
        const user = this.userService.getProfile();

        if(user && user.name)
        {
          this.name = user.name;
          this.uid = user.uid;
          this.email = user.email;
        }

        this.router.navigate(["/myposts"]);
      }

      else{
        this.isLoggedIn = false;

      }

    });

  }

  onLogout(){

    firebase.auth().signOut()
      .then(() =>{
        this.userService.destroy();
        this.isLoggedIn = false;
      });


  }

}
