"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = shuffleArray;
exports.alphabeticalSort = alphabeticalSort;
exports.multiFilter = multiFilter;
function shuffleArray(arr) {
    // Fisher-Yates shuffle algorithm
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function alphabeticalSort(arr, key) {
    return arr.sort((a, b) => {
        if (a[key] < b[key])
            return -1;
        if (a[key] > b[key])
            return 1;
        return 0;
    });
}
function multiFilter(items, criteria) {
    if (!items || !criteria)
        return;
    return items.filter(item => {
        return Object.keys(criteria).every(key => {
            if (item[key] === null || item[key] === undefined) {
                // if the key donest;s exist on the item skip it
                return true;
            }
            ;
            if (Array.isArray(criteria[key])) {
                return criteria[key].includes(item[key]);
            }
            if (typeof criteria[key] === 'object' && criteria[key] !== null) {
                return Object.keys(criteria[key]).some(objKey => item[key] && item[key][objKey] === criteria[key][objKey]);
            }
            return item[key] === criteria[key];
        });
    });
}
;
