import { BurritoWednesdaysPage } from './app.po';

describe('burrito-wednesdays App', () => {
  let page: BurritoWednesdaysPage;

  beforeEach(() => {
    page = new BurritoWednesdaysPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
