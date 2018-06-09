import {EventEmitter} from "@angular/core";
import * as firebase from 'firebase';

export class UserServices {

  constructor() {}

  statusChanged :any = new EventEmitter<any>();

  set(userDataFromDatabase){

      localStorage.setItem('user' , JSON.stringify(userDataFromDatabase));

          const messaging = firebase.messaging();

          messaging.requestPermission()
            .then(() => {

              firebase.messaging().getToken()
                .then(token => {
                  console.log('Token received: ', token);

                  messaging.onMessage(payload => {
                    console.log(payload);
                    // TODO: display in toaster
                  });

                  const updates = {};
                  updates['/users/' + userDataFromDatabase.uid + "/messageToken"] = token;
                  return firebase.database().ref().update(updates);
                })
                .catch(err => {
                  console.log(err);
                })

            })
            .catch(err => {
              console.log(err);
            })
      this.statusChanged.emit(userDataFromDatabase);

    }

  destroy(){
    localStorage.removeItem('user');
    this.statusChanged.emit(null);
  }

  getProfile(){
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }

}
