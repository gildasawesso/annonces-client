import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('uploader', {static: true}) uploader: ElementRef;
  fileBuffer: any = null;
  filename: string;
  isBusy: boolean = false;
  success: boolean = false;
  error: boolean = false;

  constructor(private http: HttpClient) {

  }

  selectFile() {
    this.uploader.nativeElement.click();
    this.success = false;
    this.error = false;
  }

  loadFile(event) {
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
    // this.http.post("https://api.annonce.awessome.fr/upload", {buffer: this.fileBuffer})
    this.http.post("http://192.168.1.5:3010/upload", {buffer: this.fileBuffer})
    // this.http.post("http://localhost:3010/upload", {buffer: this.fileBuffer})
      .subscribe((res: any) => {
        this.isBusy = false;
        this.success = true;
        this.filename = null;
        this.fileBuffer = null;
        alert(JSON.stringify(res));
      },err => {
        this.isBusy = false;
        this.filename = null;
        this.error = true;
        alert(JSON.stringify("Une Erreur est survenue lors de l'upload du fichier, vérifie bien l'intégrité du fichier"));
      });
  }
}
