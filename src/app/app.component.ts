import { Component , OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit() {
     const config = {
       apiKey: "AIzaSyDzML50mArCAfcqMBcSgIfkgo0q4el12es",
       authDomain: "instalike-30dc2.firebaseapp.com",
       databaseURL: "https://instalike-30dc2.firebaseio.com",
       projectId: "instalike-30dc2",
       storageBucket: "instalike-30dc2.appspot.com",
       messagingSenderId: "1073620715518"
     };
     firebase.initializeApp(config);
  }

}
