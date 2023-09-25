(()=>{"use strict";class e{constructor(){this.board=Array.from({length:100},((e,t)=>({x:t%10,y:Math.floor(t/10),hit:!1,occupied:!1,ship:null})))}placeShip(e,t,r,s){let a=[];if("horizontal"===s){if(t+r.length>10)return!1;for(let s=0;s<r.length;s++){const r=this.board[10*(t+s)+e];a.push(r)}}else{if(e+r.length>10)return!1;for(let s=0;s<r.length;s++){const r=this.board[10*t+e+s];a.push(r)}}return!a.some((e=>e.occupied))&&(a.forEach((e=>{e.occupied=!0,e.ship=r})),!0)}receiveAttack(e,t){const r=this.board[10*t+e];return!r.hit&&(r.occupied&&r.ship.hit(),r.hit=!0,!0)}areAllShipsSunk(){return 0===this.board.filter((e=>!0===e.occupied&&!1===e.hit)).length}}class t{constructor(e){this.length=e,this.damage=0,this.sunk=!1}hit(){this.damage++}isSunk(){return this.length===this.damage&&(this.sunk=!0,!0)}}class r{constructor(){this.gameBoard=new e,this.carrier=new t(5),this.battleship=new t(4),this.cruiser=new t(3),this.submarine=new t(3),this.destroyer=new t(2)}attack(e,t,r){return!!r.receiveAttack(e,t)&&(r.receiveAttack(e,t),!0)}aiAttack(e){let t,r,s;do{t=Math.floor(10*Math.random()),r=Math.floor(10*Math.random()),s=e.receiveAttack(t,r)}while(!s)}}(new class{constructor(){this.humanPlayer=new r,this.computerPlayer=new r,this.userBoardDOM=document.querySelector(".user-board"),this.enemyBoardDOM=document.querySelector(".enemy-board"),this.isUserTurn=!0}loadHomePage(){this.gamePlay()}renderUserBoard(){this.userBoardDOM.innerHTML="";const e=this.humanPlayer.gameBoard.board;let t=0;e.forEach((e=>{const r=document.createElement("div");r.classList.add("cell"),e.hit&&r.classList.add("hit"),e.occupied&&r.classList.add("occupied"),r.setAttribute("id",`u${t}`),t++,this.userBoardDOM.appendChild(r)}))}renderEnemyBoard(){this.enemyBoardDOM.innerHTML="";const e=this.computerPlayer.gameBoard.board;let t=0;e.forEach((e=>{const r=document.createElement("div");r.classList.add("cell"),e.hit&&r.classList.add("hit"),e.occupied&&r.classList.add("occupied"),r.setAttribute("id",`e${t}`),t++,this.enemyBoardDOM.appendChild(r)}))}gamePlay(){this.renderUserBoard(),this.renderEnemyBoard(),this.isUserTurn?this.enemyBoardDOM.querySelectorAll(".cell").forEach((e=>{e.addEventListener("click",(e=>{const t=e.target,r=parseInt(t.id.slice(1)),s=r%10,a=Math.floor(r/10);t.classList.contains("hit")||this.humanPlayer.attack(s,a,this.computerPlayer.gameBoard),this.renderEnemyBoard(),this.isUserTurn=!1,setTimeout((()=>{this.gamePlay()}),500)}))}),{once:!0}):(this.computerPlayer.aiAttack(this.humanPlayer.gameBoard),this.renderUserBoard(),this.isUserTurn=!0,this.gamePlay())}}).gamePlay()})();