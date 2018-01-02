import puppeteer from 'puppeteer';
import axios from 'axios'

const FACEBOOK_AUTHENTICATION_TOKEN_URL = 'https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067%3A%2F%2Fauthorize%2F&display=touch&state=%7B%22challenge%22%3A%22IUUkEUqIGud332lfu%252BMJhxL4Wlc%253D%22%2C%220_auth_logger_id%22%3A%2230F06532-A1B9-4B10-BB28-B29956C71AB1%22%2C%22com.facebook.sdk_client_state%22%3Atrue%2C%223_method%22%3A%22sfvc_auth%22%7D&scope=user_birthday%2Cuser_photos%2Cuser_education_history%2Cemail%2Cuser_relationship_details%2Cuser_friends%2Cuser_work_history%2Cuser_likes&response_type=token%2Csigned_request&default_audience=friends&return_scopes=true&auth_type=rerequest&client_id=464891386855067&ret=login&sdk=ios&logger_id=30F06532-A1B9-4B10-BB28-B29956C71AB1&ext=1470840777&hash=AeZqkIcf-NEW6vBd';

export default async function getTokenAndId (email, password) {
  email = email || process.env.FACEBOOK_EMAIL;
  password = password || process.env.FACEBOOK_PASSWORD;

  if (!email || !password) {
    throw new Error('Define username and password via env vars');
  }

  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto(FACEBOOK_AUTHENTICATION_TOKEN_URL);

  await page.type("input[name=email]", email);
  await page.type("input[name=pass]", password);
  await page.click("button[name=login]");

  await page.waitForNavigation();

  let urlRegex = /\/v[0-9]\.[0-9]\/dialog\/oauth\/(confirm|read)\?dpr=[0-9]{1}/;
  let token = '';

  await page.evaluate('window.isResponseFound = false');

  page.on('response', response => {
    if(response.request().url.match(urlRegex)) {
      response.text().then((body) => {
        page.removeAllListeners('response');
        token = body.match(/access_token=(.+)&/)[1];
        page.evaluate('window.isResponseFound = true');
      });
    }
  });

  await page.click('button[name=__CONFIRM__]');
  await page.waitForFunction('window.isResponseFound === true');

  let {data: {id: id}} = await axios.get(`https://graph.facebook.com/me?access_token=${token}`)

  return {token, id};
}
