import { kebabCase } from 'lodash';

var helloworld = (function (whom) {
    if (whom === void 0) { whom = "TS"; }
    return console.info("HelloWorld," + kebabCase(whom));
});

export { helloworld as default };
