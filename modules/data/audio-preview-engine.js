'use strict';
let dxPreviewPlayer=null,dxPreviewUrl=null;
function dxPreviewStatus(id,text){const el=document.getElementById(id);if(el)el.textContent=text;}
function loadAudioPreview(inputId,playerId,statusId){
 const file=document.getElementById(inputId)?.files?.[0],player=document.getElementById(playerId);
 if(!file||!player){dxPreviewStatus(statusId,'Välj en ljudfil först.');return false;}
 if(dxPreviewPlayer)dxPreviewPlayer.pause();if(dxPreviewUrl)URL.revokeObjectURL(dxPreviewUrl);
 dxPreviewPlayer=player;dxPreviewUrl=URL.createObjectURL(file);player.src=dxPreviewUrl;
 player.onerror=()=>dxPreviewStatus(statusId,'Ljudformatet kunde inte spelas. Prova WAV, MP3 eller WebM.');
 dxPreviewStatus(statusId,'Ljudfil laddad: '+file.name);return true;
}
async function playAudioPreview(statusId){if(!dxPreviewPlayer){dxPreviewStatus(statusId,'Välj en ljudfil först.');return;}try{await dxPreviewPlayer.play();dxPreviewStatus(statusId,'Spelar ljudfil.');}catch(e){dxPreviewStatus(statusId,'Kunde inte spela: '+e.message)}}
function pauseAudioPreview(statusId){dxPreviewPlayer?.pause();dxPreviewStatus(statusId,'Ljud pausat.');}
function stopAudioPreview(statusId){if(dxPreviewPlayer){dxPreviewPlayer.pause();dxPreviewPlayer.currentTime=0;}dxPreviewStatus(statusId,'Ljud stoppat.');}
function attachAudioEndStatus(playerId,statusId){const player=document.getElementById(playerId);if(player)player.addEventListener('ended',()=>dxPreviewStatus(statusId,'Ljudfilen är slut.'));}
