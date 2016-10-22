
let assert = require('assert');

let store = require('../core/store');

let requestStore = store.getStore('request');
let responseStore = store.getStore('response');


function responseStep(stepName, fn) {
    return gauge.step(stepName, function () {
        let args = Array.prototype.slice.call(arguments);
        let res = responseStore.get('response');

        return fn.apply(gauge, [res].concat(args));
    });
}


function requestFailed(res) {
    let req = requestStore.get('request');
    if (req) {
        console.log(`\nRequest send "${req.method || 'GET'}" to ${req.url} failed:\n` +
            JSON.stringify(res.body, null, 2));
    }
}


responseStep('Response should return body <field> equals <value>', function (res, field, value) {
    assert.equal(res.body[field], value);
});


responseStep('Response should return body <field> matching <value>', function (res, field, value) {
    let regex = new RegExp(value);
    assert.ok(regex.test(res.body[field]),
        `Response body field "${field}" doesn't match regular expression "${value}"`);
});


responseStep('Response should return code <code>', function (res, code) {
    if (String(res.status) !== code) {
        requestFailed(res);
    }

    assert.equal(String(res.status), code);
});
