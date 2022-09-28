const html = `
<div>
    <div id="progress-bar"></div>
    <div id="controller">
        <button id="play"><span>PLAY</span></button>
        <button id="pause"><span>PAUSE</span></button>
        <button id="mute"><span>MUTE</span></button>
        <button id="move-forward"><span>+5</span></button>
        <button id="move-back"><span>-5</span></button>
    </div>
    <div id="info-video">
        <span id="audio-title">Titre</span>
        <span id="current-time">00:00</span>
        <span>/</span>
        <span id="duration">01:53</span>
    </div>
<div>

<audio id="nube-negra" title="Nube">
  <source src="./my_audio_player/assets/nube_negra.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

`;
export { html };