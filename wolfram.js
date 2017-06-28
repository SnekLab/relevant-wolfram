const snekfetch = require('snekfetch');
const { BASE_URL } = require('./Constants');

class Wolfram {
    constructor(appId) {
        if (!appId) throw new ReferenceError('appId is not defined');
        this.appId = appId;
    }

    query(query) {
        return new snekfetch('GET', `${BASE_URL}/v2/query`)
	.query({
    appid: this.key,
    input: encodeURIComponent(query),
    primary: true,
    output: 'json'
})
    .then(res => res.body && res.body.queryresult.success ? res.body : Promise.reject(TypeError('no results')));
    }
    
    get key() {
        return this.appId() || this.appId[0] || this.appId;
    }
    
    get version() {
        return require('./package.json').version;
    }

}

module.exports = Wolfram;
