import tinderauth from '../es5-src';
import chai, { expect } from 'chai';
chai.config.includeStack = true;

describe('TEST', () => {
    it('ENV vars should be set', () => {
        expect(process.env.FACEBOOK_EMAIL, 'you need to set FACEBOOK_EMAIL env var').to.be.a('string');
        expect(process.env.FACEBOOK_PASSWORD, 'you need to set FACEBOOK_PASSWORD env var').to.be.a('string');
        expect(process.env.FACEBOOK_EXPECTED_USER_ID, 'you need to set FACEBOOK_EXPECTED_USER_ID env var').to.be.a('string');
    });

    it('should work', async function () {
        let { token, id } = await tinderauth();
        expect(id).to.be.equal(process.env.FACEBOOK_EXPECTED_USER_ID);
    });
})