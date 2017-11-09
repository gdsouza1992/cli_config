const dbQuestions = require('./dbQuestions');
const redisQuestions = require('./redisQuestions');
const s3FileQuestions = require('./s3FileQuestions');
const s3ImageQuestions = require('./s3ImageQuestions');

module.exports = {
    dbQuestions,
    redisQuestions,
    s3FileQuestions,
    s3ImageQuestions
};
