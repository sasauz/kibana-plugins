import expect from 'expect.js';

export default function ({ getService, getPageObjects }) {
  const log = getService('log');
  const retry = getService('retry');
  const PageObjects = getPageObjects(['common', 'visualize', 'header', 'settings']);

  describe('visualize app', function describeIndexTests() {
	log.debug('test running...');    
  });
}
