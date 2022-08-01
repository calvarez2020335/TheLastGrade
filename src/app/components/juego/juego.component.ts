import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss'],
})
export class JuegoComponent implements OnInit {
  user$ = this.authService.currentUser$;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var buildUrl = '../../../assets/unitygame/Build';
    var config = {
      dataUrl: buildUrl + '/Unity test.data',
      frameworkUrl: buildUrl + '/Unity test.framework.js',
      codeUrl: buildUrl + '/Unity test.wasm',
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'DefaultCompany',
      productName: 'Plataformas2D',
      productVersion: '1.0',
      devicePixelRatio: 0,
    };
    let container = document.querySelector('#unity-container') || new Element();
    var canvas: HTMLElement =
      document.querySelector('#unity-canvas') || new HTMLElement();
    var loadingBar: HTMLElement =
      document.querySelector('#unity-loading-bar') || new HTMLElement();
    var progressBarFull: HTMLElement =
      document.querySelector('#unity-progress-bar-full') || new HTMLElement();
    var fullscreenButton: HTMLElement =
      document.querySelector('#unity-fullscreen-button') || new HTMLElement();
    var warningBanner: HTMLElement =
      document.querySelector('#unity-warning') || new HTMLElement();
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Mobile device style: fill the whole browser client area with the game canvas:

      container.className = 'unity-mobile';

      // To lower canvas resolution on mobile devices to gain some
      // performance, uncomment the following line:
      // config.devicePixelRatio = 1;

      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    } else {
      // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:

      canvas.style.width = '700px';
      canvas.style.height = '400px';
    }

    loadingBar.style.display = 'block';

    createUnityInstance(canvas, config, (progress: any) => {
      progressBarFull.style.width = 100 * progress + '%';
    })
      .then((unityInstance: any) => {
        loadingBar.style.display = 'none';
        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1);
        };
      })
      .catch((message: any) => {
        alert(message);
      });
  }
}
