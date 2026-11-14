(() => {
'use strict';
const form=document.querySelector('#filters'), q=document.querySelector('#query'), game=document.querySelector('#game'), category=document.querySelector('#category'), cards=[...document.querySelectorAll('[data-guide]')], count=document.querySelector('#count'), empty=document.querySelector('#empty');
function normalize(s){return s.toLocaleLowerCase().replace(/\s/g,'');}
function matches(text,g,c,query,gameChoice,catChoice){return normalize(text).includes(normalize(query))&&(!gameChoice||g===gameChoice)&&(!catChoice||c===catChoice);}
function render(){let n=0;for(const card of cards){const show=matches(card.dataset.search,card.dataset.game,card.dataset.category,q.value,game.value,category.value);card.hidden=!show;if(show)n++;}count.textContent=`공략 ${n}개`;empty.hidden=n!==0;}
form.addEventListener('submit',e=>e.preventDefault());q.addEventListener('input',render);game.addEventListener('change',render);category.addEventListener('change',render);form.addEventListener('reset',()=>{q.value='';game.value='';category.value='';render();});render();
if(typeof module!=='undefined')module.exports={normalize,matches};
})();
