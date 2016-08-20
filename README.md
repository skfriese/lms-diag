LMSDiag
=======

A SCORM 1.2 LMS Diagnostic SCO for testing and validating how a Learning Management System handles SCORM Run-Time Environment (RTE) calls. Upload it as a SCORM package to exercise `LMSGetValue`, `LMSSetValue`, and other API calls against your LMS and observe the results in real time.

## Features

- **Manual SCORM API calls** -- Trigger `LMSInitialize`, `LMSCommit`, and `LMSFinish` with dedicated buttons.
- **LMSSetValue** -- Set common CMI data model elements (`lesson_status`, `score.raw`, `lesson_location`, `session_time`, `suspend_data`) via one-click buttons, or enter any arbitrary key/value pair.
- **LMSGetValue** -- Read back individual CMI elements or retrieve everything the LMS exposes in a single pass.
- **Macros** -- Run pre-configured sequences of get/set calls that simulate realistic SCO behavior (assessments, completions, suspend/resume, etc.).
- **Live logging** -- All API calls and responses are displayed in a timestamped log panel within the SCO.
- **Elapsed time tracking** -- A live timer tracks session duration since `LMSInitialize`, automatically formatting it as a SCORM 1.2 duration for `cmi.core.session_time`.

## Usage

1. Zip the repository contents into a PIF (`.zip`) file.
2. Upload the zip into your LMS as a **SCORM 1.2** package.
3. Launch the SCO from the LMS.
4. Click **LMSInitialize** to begin the session (a 20-second countdown warns if initialization is delayed).
5. Use the **LMSSetValue**, **LMSGetValue**, and **Macros** tabs to interact with the LMS.
6. Click **LMSCommit** to persist data, or **LMSFinish** to end the session.

Session time is automatically committed and the session is finished when the SCO window is closed or navigated away from.

## Manifest Configuration

The included `imsmanifest.xml` defines a single SCO with a mastery score of **65**:

```xml
<adlcp:masteryscore>65</adlcp:masteryscore>
```

LMS platforms that support mastery score will use this threshold to determine pass/fail when `lesson_status` is set based on `score.raw`.

## Macros

Macros are pre-defined sequences of SCORM API calls configured in `conf/macros.js`. Select a macro from the dropdown on the **Macros** tab and click **Run** to execute all of its steps in order, followed by an automatic `LMSCommit`.

Each macro step is either a `get` (calls `LMSGetValue`) or a `set` (calls `LMSSetValue`). Values can be static strings or functions that compute a value at run time (used for timestamps and elapsed time).

### Available Macros

| # | Label | Status | Score | Objectives | Interactions | Scenario |
|---|-------|--------|-------|------------|--------------|----------|
| 0 | Gets and sets some values, sets SCO to completed | completed | -- | -- | -- | Basic completion with suspend data and lesson location |
| 1 | Gets and sets some values, passes SCO with score | passed | 85 | -- | -- | Pass with score, suspend data, and lesson location |
| 2 | Gets and sets some values, fails SCO with score | failed | 25 | -- | -- | Fail with low score |
| 3 | Sets interaction and objectives data, fails SCO with score | failed | 40 | 3 (passed, completed, failed) | 1 (true-false) | Objectives and a single interaction, overall fail |
| 4 | Full assessment: 6 interaction types, 4 objectives, passes with 92 | passed | 92 | 4 (all passed with scores) | 6 (true-false, choice, fill-in, matching, performance, likert) | Comprehensive assessment with high pass |
| 5 | Mixed results: some correct/wrong interactions, fails with 58 | failed | 58 | 3 (1 passed, 2 failed) | 5 (choice, true-false, fill-in, numeric, sequencing) | Mixed correct/wrong answers, below mastery threshold |
| 6 | Completion-only: no score, objectives completed, 5 interactions | completed | -- | 3 (all completed, no scores) | 5 (3 likert, 1 fill-in, 1 choice) | Survey/informational content with no graded score |
| 7 | Borderline pass at mastery (65), all 8 SCORM interaction types | passed | 65 | 2 (1 passed, 1 incomplete) | 8 (true-false, choice, fill-in, matching, performance, sequencing, likert, numeric) | Score exactly at mastery threshold, every interaction type exercised |
| 8 | Suspend/resume scenario: incomplete with partial progress | incomplete | -- | 3 (1 passed, 1 incomplete, 1 not attempted) | 5 (true-false, choice, numeric, fill-in, matching) | Mid-course exit with `cmi.core.exit` set to `suspend`, bookmark and suspend data preserved for resume |

### Writing Custom Macros

Add entries to the `LMSDiagMacros` array in `conf/macros.js`. Each macro is an object with a `label` and a `steps` array:

```javascript
{
  label: "Description shown in the dropdown",
  steps: [
    { type: "get", key: "cmi.core.lesson_status" },
    { type: "set", key: "cmi.core.lesson_status", val: "completed" },
    { type: "set", key: "cmi.core.session_time", val: function(){ return diag.getElapsedTime(); } }
  ]
}
```

- **`type`** -- `"get"` to read or `"set"` to write.
- **`key`** -- Any SCORM 1.2 CMI data model element.
- **`val`** -- A string value, or a function returning a string for dynamic values. The helper `diag.getElapsedTime()` returns the session duration formatted as `HHHH:MM:SS.SS`, and `diag.getCurrentTime()` returns the current time as `HH:MM:SS`.

## SCORM 1.2 Data Model Coverage

The tool can read and write any SCORM 1.2 CMI element. The macros collectively exercise the following:

**Core elements** -- `lesson_status`, `lesson_location`, `score.raw`, `score.min`, `score.max`, `session_time`, `exit`, `entry`, `student_id`, `student_name`

**Data elements** -- `suspend_data`, `launch_data`, `mastery_score`

**Objectives** -- `id`, `status` (passed, completed, failed, incomplete, not attempted), `score.raw`, `score.min`, `score.max`

**Interactions** -- `id`, `type`, `time`, `weighting`, `student_response`, `result`, `latency`, `correct_responses.n.pattern`, `objectives.n.id`

**All 8 interaction types** -- true-false, choice, fill-in, matching, performance, sequencing, likert, numeric

## Project Structure

```
├── conf/
│   └── macros.js              # Macro definitions (LMSDiagMacros array)
├── css/
│   └── styles.css             # Custom styles
├── js/
│   ├── main.js                # Entry point, event wiring, unload handler
│   ├── lmsdiag.js             # LMSDiag class (API calls, macro execution, logging)
│   └── lib/
│       ├── APIWrapper.js      # SCORM 1.2 API adapter (doLMSInitialize, etc.)
│       └── ostynscormtime.js  # SCORM 1.2 duration/timestamp utilities
├── imsmanifest.xml            # SCORM 1.2 content package manifest
├── adlcp_rootv1p2.xsd         # ADL content packaging schema
├── imscp_rootv1p1p2.xsd       # IMS content packaging schema
├── imsmd_rootv1p2p1.xsd       # IMS metadata schema
├── ims_xml.xsd                # IMS XML schema
├── index.html                 # SCO UI (Bootstrap 3)
├── LICENSE                    # MIT License
└── README.md
```

## Dependencies

All external dependencies are loaded via CDN at runtime (requires network access from the LMS player):

- jQuery 2.2.4
- Bootstrap 3.3.7 (CSS and JS)
- Font Awesome 4.6.3

## License

MIT License. See [LICENSE](LICENSE) for details.
