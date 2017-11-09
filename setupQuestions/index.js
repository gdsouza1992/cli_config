const dbQuestions = require('./dbQuestions');
const redisQuestions = require('./redisQuestions');
const s3FileQuestions = require('./s3FileQuestions');
const s3ImageQuestions = require('./s3ImageQuestions');
const awsQuestions = require('./awsQuestions');
const embedlyQuestions = require('./embedlyQuestions');
const appQuestion = require('./appQuestion');
const groupQuestion = require('./groupQuestion');
const authorizationRouteQuestion = require('./authorizationRouteQuestion');
const baseRouteQuestion = require('./baseRouteQuestion');

module.exports = {
    dbQuestions,
    redisQuestions,
    s3FileQuestions,
    s3ImageQuestions,
    awsQuestions,
    embedlyQuestions,
    appQuestion,
    groupQuestion,
    authorizationRouteQuestion,
    baseRouteQuestion
};
