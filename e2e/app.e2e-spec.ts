import { RollerMetricsPocPage } from './app.po';

describe('roller-metrics-poc App', () => {
  let page: RollerMetricsPocPage;

  beforeEach(() => {
    page = new RollerMetricsPocPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
