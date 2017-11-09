#!/usr/bin/env node
const async = require('async');
const program = require('commander');
const { prompt } = require('inquirer');

const initConfig = require('./config.json');
// const jsonfile = require('jsonfile');
// const configPath = './config.json';
const {
    dbQuestions,
    redisQuestions,
    s3FileQuestions,
    s3ImageQuestions
} = require('./setupQuestions');

program
    .version('0.0.1')
    .description('Chat setup management system');

// program
//     .command('addDBConfig') // No need of specifying arguments here
//     .alias('db')
//     .description('add Database config')
//     .action(() => {
//         console.log('Database Configuration');
//         prompt(dbQuestions).then((answers) => {
//             console.log(answers);
//         });
//     });
//
// program
//     .command('addRedisConfig') // No need of specifying arguments here
//     .alias('r')
//     .description('add Redis config')
//     .action(() => {
//         console.log('Redis Configuration');
//         prompt(redisQuestions).then((answers) => {
//             console.log(answers);
//         });
//     });


// ,
// (data, callback) => {
//     console.log(data);
//     prompt(redisQuestions).then((redisData) => {
//         console.log(redisData);
//         callback(null, redisData);
//     });
// }
const config = initConfig;
program
    .command('doAll')
    .alias('a')
    .action(() => {
        async.waterfall([
            (callback) => {
                console.log('Enter Database information:');
                prompt(dbQuestions).then((data) => {
                    config.serverConfig.db = data;
                    callback(null, config)
                });
            },
            (updatedConfig, callback) => {
                console.log('Enter Redis information:');
                prompt(redisQuestions).then((data) => {
                    updatedConfig.serverConfig.redis = data;
                    callback(null, updatedConfig)
                });
            },
            (updatedConfig, callback) => {
                console.log('Enter Redis information:');
                prompt(s3ImageQuestions).then((data) => {
                    updatedConfig.serverConfig.s3.images = data;
                    callback(null, updatedConfig)
                });
            },
            (updatedConfig, callback) => {
                console.log('Enter Redis information:');
                prompt(s3FileQuestions).then((data) => {
                    updatedConfig.serverConfig.s3.files = data;
                    callback(null, updatedConfig)
                });
            }
        ], (err, results) => {
            console.log(results);
        });
    });


if (!process.argv[2]) {
    process.argv[2] = 'a';
}

program.parse(process.argv);
