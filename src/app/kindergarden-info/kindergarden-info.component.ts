import { Component } from '@angular/core';

@Component({
  selector: 'app-kindergarden-info',
  templateUrl: './kindergarden-info.component.html',
  styleUrls: ['./kindergarden-info.component.scss']
})
export class KindergardenInfoComponent {

  public waldorfPoster: string =  "./../assets/images/waldorf_poster.jpg";
  public karlSchubertPoster: string =  "./../assets/images/karl_schubert_poster.png";
  public stadtWienPoster1: string = "./../assets/images/stadt_wien_poster1.svg";
  public stadtWienPoster2: string = "./../assets/images/stadt_wien_poster2.jpg";
  public montessoriPoster: string = "./../assets/images/montessori_poster.jpg";
}
