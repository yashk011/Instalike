import { Component, OnInit } from '@angular/core';
import {MyFireServices} from '../shared/myfire.services';
import {NotificationService} from '../shared/notification.shared';
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  personalPostsRef :any;
  postLists : any = [];
  displayPostedBy:any;
  constructor(private myFire : MyFireServices , private notifier : NotificationService) { }

  ngOnInit() {

    const uid = firebase.auth().currentUser.uid;
    this.personalPostsRef = this.myFire.getUserPostsRef(uid);
    this.personalPostsRef.on('child_added', data => {
    this.postLists.push({
       key: data.key,
       data: data.val()
     });

     console.log(this.postLists.key);
     console.log(this.postLists.data);
   });

  }

  onFileSelection(event) {

    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.myFire.uploadFile(file)
        .then(data => {
          this.notifier.display('success', 'Picture Successfully uploaded!!');
          this.myFire.handleImageUpload(data);
          console.log(data['fileUrl']);
        })
        .catch(err => {
          this.notifier.display('error', err.message);
          console.log(err);
        });
    }


  }

  ngOnDestroy(){

      this.personalPostsRef.off();
  }

}
