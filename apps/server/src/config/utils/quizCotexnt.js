"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToBool = exports.boolToStrng = exports.setMetaDataObject = exports.getAllMetaData = exports.getMetaData = exports.getTeamObject = exports.getIsTeamMode = exports.getSettings = exports.getQuestId = exports.getRoomId = exports.getUserId = exports.quizContext = void 0;
exports.turnQuestToId = turnQuestToId;
exports.setMetaData = setMetaData;
exports.getQuestion = getQuestion;
const async_hooks_1 = require("async_hooks");
const app_js_1 = require("../../../../../../Quiz-server/app.js");
const logic_js_1 = require("../../../../../../Quiz-server/logic/logic.js");
const redishelpers_js_1 = require("../../../../../../Quiz-server/logic/redishelpers.js");
exports.quizContext = new async_hooks_1.AsyncLocalStorage();
const getUserId = () => exports.quizContext.getStore()?.userId || '';
exports.getUserId = getUserId;
const getRoomId = () => exports.quizContext.getStore()?.roomId || '';
exports.getRoomId = getRoomId;
const getQuestId = () => exports.quizContext.getStore()?.metadata?.questId || '';
exports.getQuestId = getQuestId;
const getSettings = () => JSON.parse((0, exports.getMetaData)()?.settings || '{}');
exports.getSettings = getSettings;
const getIsTeamMode = () => exports.quizContext.getStore()?.metadata?.isTeamMode || false;
exports.getIsTeamMode = getIsTeamMode;
const getTeamObject = () => JSON.parse(exports.quizContext.getStore()?.metadata?.teamObject ?? '{}') || null;
exports.getTeamObject = getTeamObject;
const getMetaData = () => exports.quizContext.getStore()?.metadata;
exports.getMetaData = getMetaData;
const getAllMetaData = async (ri) => await redishelpers_js_1.redis.hgetall(logic_js_1.REDIS_KEY.ROOM(ri));
exports.getAllMetaData = getAllMetaData;
const setMetaDataObject = async (data) => {
    await redishelpers_js_1.redis.hset(logic_js_1.REDIS_KEY.ROOM((0, exports.getRoomId)()), data);
};
exports.setMetaDataObject = setMetaDataObject;
function turnQuestToId(questions) {
    return questions.map(({ id }) => id);
}
const boolToStrng = (bool) => bool ? 't' : 'f';
exports.boolToStrng = boolToStrng;
const stringToBool = (string) => string === 't';
exports.stringToBool = stringToBool;
async function setMetaData(field, value) {
    await redishelpers_js_1.redis.hset(logic_js_1.REDIS_KEY.ROOM((0, exports.getRoomId)()), { [field]: value });
}
function getQuestion(id, questions = app_js_1.DATA) {
    if (!id)
        id = (0, exports.getQuestId)();
    if (!questions?.at(typeof id === 'string' ? Number(id) : id || 1))
        console.error("the thing asked for a id that dont; esxits", id);
    return questions?.at(typeof id === 'string' ? Number(id) : id || 1) || app_js_1.DATA[0];
}
exports.default = exports.quizContext;
