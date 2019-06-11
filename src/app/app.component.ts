import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('uploader', {static: true}) uploader: ElementRef;
  fileBuffer: any;
  filename: string;
  isBusy: boolean = false;
  success: boolean = false;

  constructor(private http: HttpClient) {

  }

  selectFile() {
    this.uploader.nativeElement.click();
    this.success = false;
  }

  loadFile(event) {
    this.fileBuffer = null;
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let content: any = fileReader.result;
      this.filename = event.target.files[0].name;
      this.fileBuffer = content.split(',')[1];
    };
    fileReader.readAsDataURL(event.target.files[0]);
  }

  upload() {
    this.isBusy = true;
    this.http.post("http://192.168.1.12:3000/upload", {buffer: this.fileBuffer})
      .subscribe((res: any) => {
        this.isBusy = false;
        this.success = true;
        this.filename = null;
        alert(res);
      },err => {
        alert(err);
      });
  }
}
