const configSchema = {};

configSchema.server = {
    db: {
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
    },
    redis: {
        host: '',
        port: '',
        password: ''
    },
    s3: {
        images: {
            bucket: '',
            host: ''
        },
        files: {
            bucketURL: '',
            bucketName: '',
            host: ''
        }
    },
    aws: {
        accessKeyId: '',
        secretAccessKey: ''
    },
    embed: {
        embedly: {
            url: '',
            key: ''
        },
        blackList: []
    }
};


configSchema.client = {
    appName: '',
    hasGroupChat: true,
    authConfig: {
        signinRoute: '',
        signoutRoute: ''
    },
    routeConfig: {
        base: ''
    }
};

module.exports = configSchema.client;
module.exports = configSchema.server;
