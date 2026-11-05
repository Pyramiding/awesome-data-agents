// Apply the saved reading theme before the stylesheet paints.
(() => {
  let theme = 'dark';
  try { if (localStorage.getItem('awesome-data-agents:theme:v1') === 'light') theme = 'light'; } catch {}
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f3f6fc' : '#080e1b';
})();
