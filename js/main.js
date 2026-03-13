let diag;

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  diag = new LMSDiag();

  // Tab switching (replaces Bootstrap JS tab plugin)
  document.querySelectorAll('[data-toggle="tab"]').forEach((tabLink) => {
    tabLink.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = tabLink.getAttribute("href");
      const targetPane = document.querySelector(targetId);
      if (!targetPane) return;

      // Deactivate all tabs and panes
      document.querySelectorAll('.nav-tabs li').forEach((li) => li.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach((pane) => {
        pane.classList.remove('active', 'in');
      });

      // Activate clicked tab and its pane
      tabLink.parentElement.classList.add('active');
      targetPane.classList.add('active', 'in');
    });
  });

  window.addEventListener("unload", () => {
    if (diag.terminated) return;
    try {
      diag.setSessionTime();
      diag.commit();
      diag.terminate();
    } catch (e) { /* swallow */ }
  });

  // Event delegation for data-click actions
  document.querySelectorAll("[data-click]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const key = el.dataset.key;
      const val = el.dataset.val;
      diag[el.dataset.click](key, val, e);
    });
  });
});
