var LMSDiagMacros = [

  // 0
  { 
    label: "Gets and sets some values, sets SCO to completed",
    steps: [
      {
        type: "get",
        key: "cmi.core.lesson_status"
      },
      {
        type: "set",
        key: "cmi.core.lesson_status",
        val: "incomplete"
      },
      {
        type: "get",
        key: "cmi.core.lesson_location"
      },
      {
        type: "get",
        key: "cmi.suspend_data"
      },
      {
        type: "set",
        key: "cmi.suspend_data",
        val: "test123"
      },
      {
        type: "set",
        key: "cmi.core.lesson_location",
        val: "page_af87f1iu2g4189724byq8we7sd897f9s"
      },
      {
        type: "set",
        key: "cmi.core.lesson_status",
        val: "completed"
      },
      {
        type: "set",
        key: "cmi.core.session_time",
        val: function(){ return diag.getElapsedTime(); }
      }
    ]
  },

  // 1
  {
    label: "Gets and sets some values, passes SCO with score",
    steps: [
      {
        type: "get",
        key: "cmi.core.lesson_status"
      },
      {
        type: "set",
        key: "cmi.core.lesson_status",
        val: "incomplete"
      },
      {
        type: "get",
        key: "cmi.suspend_data"
      },
      {
        type: "set",
        key: "cmi.suspend_data",
        val: "test789"
      },
      {
        type: "get",
        key: "cmi.core.lesson_location"
      },
      {
        type: "set",
        key: "cmi.core.lesson_location",
        val: "page_4279814g2ui1f78fas9f798ds7ew8qyb"
      },
      {
        type: "set",
        key: "cmi.core.score.min",
        val: 0
      },
      {
        type: "set",
        key: "cmi.core.score.max",
        val: 100
      },
      {
        type: "set",
        key: "cmi.core.score.raw",
        val: 85
      },
      {
        type: "set",
        key: "cmi.core.lesson_status",
        val: "passed"
      },
      {
        type: "set",
        key: "cmi.core.session_time",
        val: function(){ return diag.getElapsedTime(); }
      }
    ]
  },

  // 1
  {
    label: "Gets and sets some values, fails SCO with score",
    steps: [
      {
        type: "get",
        key: "cmi.core.lesson_status"
      },
      {
        type: "set",
        key: "cmi.core.lesson_status",
        val: "incomplete"
      },
      {
        type: "get",
        key: "cmi.suspend_data"
      },
      {
        type: "set",
        key: "cmi.suspend_data",
        val: "test789"
      },
      {
        type: "get",
        key: "cmi.core.lesson_location"
      },
      {
        type: "set",
        key: "cmi.core.score.min",
        val: 0
      },
      {
        type: "set",
        key: "cmi.core.score.max",
        val: 100
      },
      {
        type: "set",
        key: "cmi.core.score.raw",
        val: 45
      },
      {
        type: "set",
        key: "cmi.core.lesson_status",
        val: "failed"
      },
      {
        type: "set",
        key: "cmi.core.session_time",
        val: function(){ return diag.getElapsedTime(); }
      }
    ]
  }
];