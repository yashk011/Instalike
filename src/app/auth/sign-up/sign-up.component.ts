import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NotificationService } from '../../shared/notification.shared';

import * as firebase from 'firebase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  constructor(private notifier : NotificationService) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
    const fullname = form.value.fullname;
    const email = form.value.email;
    const password = form.value.password;

    console.log(fullname , email , password);

    firebase.auth().createUserWithEmailAndPassword(email ,password)
      .then(userData => {
        console.log(userData);
        userData.sendEmailVerification();
        const message = `A verification link has been sent to the ${email} , After verification please login through the login section `;

        this.notifier.display('success' ,message);

        return firebase.database().ref('users/' + userData.uid).set({
          email:email,
          uid : userData.uid ,
          registrationDate :new Date().toString(),
          name: fullname
        })
        .then(() =>{
          firebase.auth().signOut();
        });

      })
      .catch(error => {
        console.log(error);
        this.notifier.display('error',error.message);
      });
  }
}
