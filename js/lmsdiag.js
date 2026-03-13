/**
 * LMSDiag Class
 * @Developer Sean K. Friese (skfriese@gmail.com)
 */

const GETTERS = [
  'suspend_data',
  'launch_data',
  'comments',
  'comments_from_lms',
  'core',
  'objectives',
  'student_data',
  'student_preference',
  'interactions'
];

const HAS_CHILDREN = new Set([
  'core',
  'score',
  'objectives',
  'student_data',
  'student_preference',
  'interactions'
]);

const HAS_COUNT = new Set([
  'objectives',
  'interactions',
  'correct_responses'
]);

const WRITE_ONLY = new Set([
  'exit',
  'session_time',
  'interactions'
]);

class LMSDiag {

  terminated = false;
  initialized = false;
  startTime = '';
  initSeconds = 20;
  version = 'v3.0';
  apiData = {};

  constructor() {
    this.log(`Instance of LMS Diagnostic class created (${this.version})`);
    this.populateMacros();
    this.setElapsedTime();
    this.setInitSeconds();
  }

  initialize() {
    const success = doLMSInitialize();
    if (success === "true") {
      this.startTime = Math.round(Date.now() / 10);
      this.initialized = true;
    }
  }

  terminate() {
    this.terminated = true;
    doLMSFinish();
  }

  commit() {
    doLMSCommit();
  }

  setValue(key, val) {
    doLMSSetValue(key, val.toString());
  }

  getValue(key) {
    doLMSGetValue(key);
  }

  setSessionTime() {
    doLMSSetValue('cmi.core.session_time', this.getElapsedTime());
  }

  setInitSeconds() {
    if (this.initialized) {
      const warning = document.getElementById('init-warning');
      if (warning) warning.remove();
      return;
    }

    this.initSeconds--;

    const secondsEl = document.getElementById('init-seconds');
    if (secondsEl) secondsEl.textContent = this.initSeconds;

    if (this.initSeconds < 1) {
      const warning = document.getElementById('init-warning');
      if (warning) warning.classList.add('alert-danger');
      this.log('LMSInitialize was not called within 20 seconds', 'text-danger');
    } else {
      setTimeout(() => this.setInitSeconds(), 1000);
    }
  }

  getElapsedTime() {
    if (this.startTime) {
      const curTime = Math.round(Date.now() / 10);
      const duration = curTime - this.startTime;
      return centisecsToSCORM12Duration(duration);
    }
    return "00:00:00.0";
  }

  setElapsedTime() {
    const el = document.getElementById('elapsedTime');
    if (el) el.textContent = this.getElapsedTime();
    setTimeout(() => this.setElapsedTime(), 1);
  }

  setCustomValue() {
    const k = document.getElementById('set-custom-key')?.value;
    const v = document.getElementById('set-custom-value')?.value;
    if (k === "" || v === "") {
      this.log("You must enter a key and value before sending.", "text-warning");
      return;
    }
    this.setValue(k, v);
  }

  getCustomValue() {
    const k = document.getElementById('get-custom-key')?.value;
    if (k === "") {
      this.log("You must enter a key before requesting.", "text-warning");
      return;
    }
    this.getValue(k);
  }

  populateMacros() {
    if (typeof LMSDiagMacros === 'undefined' || !LMSDiagMacros) return;

    const select = document.getElementById('macros');
    if (!select) return;

    LMSDiagMacros.forEach((macro, i) => {
      const option = document.createElement('option');
      option.textContent = `${i}: ${macro.label}`;
      option.value = i;
      select.appendChild(option);
    });
  }

  runMacro() {
    const select = document.getElementById('macros');
    if (!select || select.selectedIndex < 0) return;

    const macro = LMSDiagMacros[select.selectedIndex];
    if (!macro?.steps?.length) return;

    for (const step of macro.steps) {
      switch (step.type) {
        case "get":
          this.getValue(step.key);
          break;
        case "set": {
          const val = (typeof step.val === "function") ? step.val() : step.val;
          this.setValue(step.key, val);
          break;
        }
      }
    }

    this.commit();
  }

  getAll() {
    for (const getter of GETTERS) {
      this.populate(`cmi.${getter}`);
    }
  }

  populate(prop) {
    const youngest = this.getYoungest(prop);
    if (HAS_CHILDREN.has(youngest)) {
      this.populateChildren(prop);
    } else {
      this.populateChild(prop);
    }
  }

  populateChildren(parentProp) {
    const result = doLMSGetValue(`${parentProp}._children`);
    const children = result.split(",");
    const youngest = this.getYoungest(parentProp);

    if (HAS_COUNT.has(youngest)) {
      const count = doLMSGetValue(`${parentProp}._count`);
      if (!WRITE_ONLY.has(parentProp)) {
        for (let i = 0; i < Number.parseInt(count); i++) {
          for (const child of children) {
            const prop = [parentProp, i, child].join(".");
            console.log(prop);
            this.populate(prop);
          }
        }
      }
    } else {
      for (const child of children) {
        const prop = [parentProp, child].join(".");
        this.populate(prop);
      }
    }
  }

  populateChild(prop) {
    const youngest = this.getYoungest(prop);
    if (WRITE_ONLY.has(youngest)) return;

    const result = doLMSGetValue(prop);
    if (result) {
      this.apiData[prop] = result;
    }
  }

  getYoungest(prop) {
    const parts = prop.split(".");
    return parts[parts.length - 1];
  }

  clearConsole() {
    const logList = document.querySelector('#logs ul');
    if (logList) logList.innerHTML = '';
  }

  getCurrentTime() {
    const pad = (n) => (n < 10) ? `0${n}` : n;
    const d = new Date();
    return [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(":");
  }

  log(msg, css) {
    const li = document.createElement('li');
    li.className = css || 'text-success';
    li.innerHTML = `${this.getCurrentTime()} ${msg}`;
    const logList = document.querySelector('#logs ul');
    if (logList) {
      logList.appendChild(li);
      const logs = document.getElementById('logs');
      if (logs) logs.scrollTop = logs.scrollHeight;
    }
  }

  closeWin() {
    if (top === parent) {
      top.close();
    }
  }

  toString() {
    return `LMSDiag: ${this.version}`;
  }
}
