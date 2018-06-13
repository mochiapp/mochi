const assert = require('assert');
const app = require('../../src/app');

describe('\'gun\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/gun');

    assert.ok(service, 'Registered the service');
  });
});
