"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
    Check line X Y for checkRect Function
*/
function checkLineXRec(y1, y2, x, arr) {
    let min = Math.min(y1, y2);
    let max = Math.max(y1, y2);
    let result = false;
    for (let y = min + 1; y <= max; y++) {
        if (arr[y][x] == null) {
            result = true;
        }
        else {
            result = false;
        }
    }
    return result;
}
function checkLineYRec(x1, x2, y, arr) {
    let min = Math.min(x1, x2);
    let max = Math.max(x1, x2);
    let result = false;
    for (let x = min + 1; x < max; x++) {
        if (arr[y][x] == null) {
            result = true;
        }
        else {
            result = false;
        }
    }
    return result;
}
//
function checkLineX(y1, y2, x, arr) {
    let min = Math.min(y1, y2);
    let max = Math.max(y1, y2);
    let result = false;
    if (max - min == 1) {
        return true;
    }
    for (let y = min + 1; y < max; y++) {
        if (arr[y][x] == null) {
            result = true;
        }
        else {
            result = false;
        }
    }
    return result;
}
function checkLineY(x1, x2, y, arr) {
    let min = Math.min(x1, x2);
    let max = Math.max(x1, x2);
    let result = false;
    if (max - min == 1) {
        return true;
    }
    for (let x = min + 1; x < max; x++) {
        if (arr[y][x] == null) {
            result = true;
        }
        else {
            result = false;
        }
    }
    return result;
}
function checkRectX(point1, point2, arr) {
    let pMinY = point1;
    let pMaxY = point2;
    if (point1.x > point2.x) {
        pMinY = point2;
        pMaxY = point1;
    }
    for (let y = parseInt(pMinY.x) + 1; y < pMaxY.x; y++) {
        console.log(y);
        console.log(checkLineYRec(pMinY.x, y, pMinY.y, arr) + '' +
            checkLineXRec(pMinY.y, pMaxY.y, y, arr) + '' +
            checkLineY(y, pMaxY.x, pMaxY.y, arr));
        if (checkLineYRec(pMinY.x, y, pMinY.y, arr) &&
            checkLineXRec(pMinY.y, pMaxY.y, y, arr) &&
            checkLineY(y, pMaxY.x, pMaxY.y, arr)) {
            return true;
            console.log(true);
        }
    }
    return false;
    // checkLineY(pMinY.x,y,pMinY.y,arr)}
}
function checkRectY(point1, point2, arr) {
    let pMinY = point1;
    let pMaxY = point2;
    if (point1.y > point2.y) {
        pMinY = point2;
        pMaxY = point1;
    }
    for (let y = parseInt(pMinY.y) + 1; y < pMaxY.y; y++) {
        console.log(y);
        console.log(checkLineXRec(pMinY.y, y, pMinY.x, arr) + '' +
            checkLineYRec(pMinY.x, pMaxY.x, y, arr) + '' +
            checkLineX(y, pMaxY.y, pMaxY.x, arr));
        if (checkLineXRec(pMinY.y, y, pMinY.x, arr) &&
            checkLineY(pMinY.x, pMaxY.x, y, arr) &&
            checkLineX(y, pMaxY.y, pMaxY.x, arr)) {
            return true;
            console.log(true);
        }
    }
    return false;
}
const pokemon_number = 10;
var queue = [];
var list_pokemon = new Array;
const getPokemon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = yield fetch(url);
    const pokemon = yield res.json();
    return pokemon.sprites.front_default;
});
const createListPokemon = (list_pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 6; i++) {
        let list = [];
        for (let j = 0; j < 10; j++) {
            let id_poke = Math.floor(Math.random() * pokemon_number) + 1;
            let url = yield getPokemon(id_poke);
            let poke = {
                id: id_poke,
                urlimg: url
            };
            list[j] = poke;
        }
        list_pokemon.push(list);
    }
    return list_pokemon;
});
const renderListPokemon = (list) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < list.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < list[i].length; j++) {
            let td = `
                <td data-id="${list[i][j].id}" data-x="${j}" data-y="${i}" class='pokemon'><img src="${list[i][j].urlimg}" /> </td>
            `;
            tr.innerHTML += td;
        }
        document.querySelector('table').appendChild(tr)
    }
});
createListPokemon(list_pokemon)
    .then(data => {
    renderListPokemon(data);
    const pokemon = document.querySelectorAll('.pokemon');
    pokemon.forEach(el => {
        el.addEventListener('click', (e) => {
            addWaitCheck(el.dataset.x,el.dataset.y,el.dataset.id,el)
        });
    });
});
function addWaitCheck(x, y, id, el) {
    if (list_pokemon[y][x] == null) {
        return;
    }
    else {
        queue.push({
            x,
            y,
            id,
            el
        });
        el.classList.add('border');
    }
    function del() {
        queue[0].el.querySelector('img').remove();
        queue[1].el.querySelector('img').remove();
        list_pokemon[queue[0].y][queue[0].x] = null;
        list_pokemon[queue[1].y][queue[1].x] = null;
    }
    if (queue.length > 1) {
        console.log(queue);
        if (queue[0].id === queue[1].id) {
            if (queue[0].x === queue[1].x) {
                let result = checkLineX(queue[0].y,queue[1].y,queue[0].x,list_pokemon,queue[0].id);
                if(result === true){
                    del()
                }
            }
            else if (queue[0].y == queue[1].y) {
                let result = checkLineY(queue[0].x,queue[1].x,queue[0].y,list_pokemon,queue[0].id);
                if(result === true){
                    del()
                }
            }
            else if (queue[0].y != queue[1].y && queue[0].x != queue[0].y) {
                if (checkRectX(queue[0], queue[1], list_pokemon)) {
                    console.log(checkRectX(queue[0], queue[1], list_pokemon));
                    del();
                }
                if (checkRectY(queue[0], queue[1], list_pokemon)) {
                    console.log(checkRectY(queue[0], queue[1], list_pokemon));
                    del();
                }
            }
        }
        let elems = document.querySelectorAll(".border");
        elems.forEach(el => {
            el.classList.remove('border');
        });
        return queue = [];
    }
}
