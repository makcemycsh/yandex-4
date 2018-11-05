"use strict";function cardReducer(r,e){switch(e.type){case"removeItem":var t=$(r.filter(function(r){return r.cardId===e.id})[0].card);t.fadeOut(200,function(){t.remove()}),r=r.filter(function(r){return r.cardId!==e.id});var c=[];return r.forEach(function(r){c.push(r.cardId)}),localStorage.setItem("CardIdSore",JSON.stringify(c)),r;default:return r}}
//# sourceMappingURL=myActions.js.map
