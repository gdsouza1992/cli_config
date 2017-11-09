#!/usr/bin/env node
const async = require('async');
const jsonfile = require('jsonfile');
const program = require('commander');
const { prompt } = require('inquirer');

const initConfig = require('./config_backup.json');
const {
    dbQuestions,
    redisQuestions,
    s3FileQuestions,
    s3ImageQuestions,
    awsQuestions,
    embedlyQuestions,
    authorizationRouteQuestion,
    baseRouteQuestion
} = require('./setupQuestions');

const configPath = './config.json';

// groupQuestion,
// appQuestion,

const infoMessages = [
    '\n---Enter Chat Server information----\n',
    '\nEnter Database information:',
    '\nEnter Redis information:',
    '\nEnter S3 image bucket information (Bucket for static images):',
    '\nEnter S3 file bucket information (Bucket for static files):',
    '\nEnter aws information:',
    '\nEnter embedly information:',
    '\n\n---Enter Chat Client information----\n'
]

program
    .version('0.0.1')
    .description('Chat setup management system');

const config = initConfig;
program
    .command('doAll')
    .alias('a')
    .action(() => {
        let i = 0; // for infoMessages index
        async.waterfall([
            (callback) => {
                console.log(infoMessages[i++]);
                prompt(dbQuestions).then((data) => {
                    config.serverConfig.db = data;
                    callback(null, config);
                });
            },

            (updatedConfig, callback) => {
                console.log(infoMessages[i++]);
                prompt(redisQuestions).then((data) => {
                    updatedConfig.serverConfig.redis = data;
                    callback(null, updatedConfig);
                });
            },

            (updatedConfig, callback) => {
                console.log(infoMessages[i++]);
                prompt(s3ImageQuestions).then((data) => {
                    updatedConfig.serverConfig.s3.images = data;
                    callback(null, updatedConfig);
                });
            },

            (updatedConfig, callback) => {
                console.log(infoMessages[i++]);
                prompt(s3FileQuestions).then((data) => {
                    updatedConfig.serverConfig.s3.files = data;
                    callback(null, updatedConfig);
                });
            },

            (updatedConfig, callback) => {
                console.log(infoMessages[i++]);
                prompt(awsQuestions).then((data) => {
                    updatedConfig.serverConfig.aws = data;
                    callback(null, updatedConfig);
                });
            },

            (updatedConfig, callback) => {
                console.log(infoMessages[i++]);
                prompt(embedlyQuestions).then((data) => {
                    updatedConfig.serverConfig.embed.embedly = data;
                    callback(null, updatedConfig);
                });
            },

            (updatedConfig, callback) => {
                prompt(authorizationRouteQuestion).then((data) => {
                    updatedConfig.clientConfig.authConfig = data;
                    callback(null, updatedConfig);
                });
            },

            (updatedConfig, callback) => {
                prompt(baseRouteQuestion).then((data) => {
                    updatedConfig.clientConfig.routeConfig = data;
                    callback(null, updatedConfig);
                });
            }

        ], (err, results) => {
            console.log('\n');

            const options = {
                spaces: 4,
                EOL: '\r\n'
            };
            jsonfile.writeFile(configPath, results, options, (writeError) => {
                if (writeError) {
                    console.error(writeError)
                } else {
                    console.log('write to config successfull config');
                }
            });
        });
    });


if (!process.argv[2]) {
    process.argv[2] = 'a';
}

program.parse(process.argv);

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
