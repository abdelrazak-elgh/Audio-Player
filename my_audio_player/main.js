import { style } from './js/css_template.js';
import { html } from './js/html_template.js';

export default class MyAudioPlayer extends HTMLElement {
  //It’s called when the component is first initialized. It must call super() and can set any defaults or perform other pre-rendering processes.
  constructor() {
    super();
  }

  //This function is called when the Web Component is appended to DOM
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${style}</style>${html}`;

    this.audioCtx = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    this.audioContext = new this.audioCtx();


    this.myAudioFile = this.shadowRoot.querySelector('#nube-negra');

    //DOM elements
    this.playButton = this.getShadowDom('#play');
    this.pauseButton = this.getShadowDom('#pause');
    this.muteButton = this.getShadowDom('#mute');
    this.moveForward = this.getShadowDom('#move-forward');
    this.moveBack = this.getShadowDom('#move-back');

    this.currentTime = this.getShadowDom('#current-time');
    this.duration = this.getShadowDom('#duration');
    this.audioTitle = this.getShadowDom('#audio-title');

    //Events
    this.myAudioFile.onloadedmetadata = () => {
      let audioDuration = Math.round(this.myAudioFile.duration);
      this.timeDisplayHandler(audioDuration);
      this.audioTitle.innerText = this.myAudioFile.getAttribute('title');
    }

    this.playButton.onclick = () => {
      this.myAudioFile.play();
    }

    this.pauseButton.onclick = () => {
      this.myAudioFile.pause();
      console.log(this.myAudioFile.currentTime);
    }

    this.muteButton.onclick = () => {
      this.handleMuteAudio();
      console.log(this.myAudioFile.muted);
      console.log(this.myAudioFile.volume);
    }

    this.moveForward.onclick = () => {
      this.myAudioFile.currentTime += 5;
    }

    this.moveBack.onclick = () => {
      this.myAudioFile.currentTime -= 5;
    }
  }

  //Convert seconds to HH:MM:SS or MM:SS
  timeConverter(time) {
    //toISOString convert date to 1970-01-01T00:10:00.000Z format
    let result = new Date(time * 1000).toISOString();
    if (time < 3600 && result.slice(14, 16) < 10) {
      return {
        minutes: result.slice(15, 16),
        seconds: result.slice(17, 19)
      };
    }
    
    if (time < 3600 && result.slice(14, 16) > 9) {
      return {
        minutes: result.slice(14, 16),
        seconds: result.slice(17, 19)
      };
    }
    
    if (time >= 3600 && result.slice(11, 13) < 10) {
      console.log('> 3600 et < 10');
      return {
        hours: result.slice(12,13),
        minutes: result.slice(14, 16),
        seconds: result.slice(17, 19)
      };
    }
    
    if (time >= 3600 && result.slice(11, 13) > 9) {
      console.log('> 3600 et > 9');
      return {
        hours: result.slice(11,13),
        minutes: result.slice(14, 16),
        seconds: result.slice(17, 19)
      };
    }
  }

  handleMuteAudio() {
    this.myAudioFile.muted == false ? this.myAudioFile.muted = true : this.myAudioFile.muted = false;
  }

  getShadowDom(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  //Display handlers

  timeDisplayHandler(time) {
    let convertedTime = this.timeConverter(time);
    console.log(convertedTime.hours);
    if(time < 3600) {
      this.duration.innerText = `${convertedTime.minutes}:${convertedTime.seconds}`;
      //this.currentTime.innerText = ''
    } else {
      this.duration.innerText = `${convertedTime.hours}:${convertedTime.minutes}:${convertedTime.seconds}`;
    }
  }
}

customElements.define('my-component', MyAudioPlayer);