import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NotificationService } from "../../shared/notification.shared";
import * as firebase from 'firebase';
import { MyFireServices} from "../../shared/myfire.services";
import {UserServices} from "../../shared/user.services";
import {Router} from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private notifier : NotificationService , private myFire : MyFireServices , private userService :UserServices , private router :Router) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
      const email = form.value.email;
      const password = form.value.password;

      firebase.auth().signInWithEmailAndPassword(email , password)
      .then(userData =>{
        if(userData.emailVerified){
          console.log('next');

          return this.myFire.getUserFromDatabase(userData.uid);

        }
        else{
            const message = 'Your email isnt verified';
            this.notifier.display('error' , message);

            firebase.auth().signOut();
        }
      })
      .then(userDataFromDatabase =>{
        if(userDataFromDatabase){
          this.userService.set(userDataFromDatabase);
          console.log(userDataFromDatabase);
          this.router.navigate(['/myposts']);
        }
      })
      .catch(error =>{
        this.notifier.display('error' , error.message);
      });
  }
}
