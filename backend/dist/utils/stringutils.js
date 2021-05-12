"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowercase = exports.slugify = void 0;
function slugify(title) {
    let slugarr = [];
    for (let i = 0; i < title.length; i++) {
        if (i >= 30)
            break;
        let char = title[i].toLowerCase();
        if (char >= 'a' && char <= 'z')
            slugarr.push(char);
        else
            slugarr.push('-');
    }
    return slugarr.join('');
}
exports.slugify = slugify;
function lowercase(title) {
    let lower = [];
    for (let i = 0; i < title.length; i++) {
        if (i >= 30)
            break;
        let char = title[i];
        if (char >= 'A' && char <= 'Z')
            lower.push(char.toLowerCase());
    }
    return lower.join('');
}
exports.lowercase = lowercase;
