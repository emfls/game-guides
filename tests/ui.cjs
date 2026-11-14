const fs=require('fs'),vm=require('vm'),assert=require('assert');const data=JSON.parse(fs.readFileSync('tests/fixtures.json'));
const fields={};for(const id of ['filters','query','game','category','count','empty'])fields['#'+id]={value:'',hidden:false,textContent:'',handlers:{},addEventListener(k,f){this.handlers[k]=f}};
const cards=data.map(g=>({dataset:{search:[g.title,g.game,g.category,g.summary].join(' '),game:g.game,category:g.category},hidden:false}));
const ctx={document:{querySelector:k=>fields[k],querySelectorAll:()=>cards}};vm.runInNewContext(fs.readFileSync('app-v2.js','utf8'),ctx);
function check(q,g,c,n){fields['#query'].value=q;fields['#game'].value=g;fields['#category'].value=c;fields['#query'].handlers.input();assert.equal(cards.filter(c=>!c.hidden).length,n);assert.equal(fields['#empty'].hidden,n!==0)}
check('','','',3);check('철판','','',1);check('','Factorio','',2);check('','Factorio','문제 해결',1);check('','Minecraft','자동화',0);check('FACTORIO','','',2);check('첫날밤','','',1);check('없는검색','','',0);fields['#filters'].handlers.reset();assert.equal(cards.filter(c=>!c.hidden).length,3);console.log('9 UI cases PASS');
