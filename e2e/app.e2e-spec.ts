import { MuLTWAPage } from './app.po';

describe('mu-ltwa App', () => {
  let page: MuLTWAPage;

  beforeEach(() => {
    page = new MuLTWAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
