var LMSDiagMacros = [

  // 0
  { 
    label: "Gets and sets some values, sets SCO to completed",
    steps: [
      { type: "get", key: "cmi.core.lesson_status"}, 
      { type: "set", key: "cmi.core.lesson_status", val: "incomplete"}, 
      { type: "get", key: "cmi.core.lesson_location"}, 
      { type: "get", key: "cmi.suspend_data"}, 
      { type: "set", key: "cmi.suspend_data", val: "test123"}, 
      { type: "set", key: "cmi.core.lesson_location", val: "page_af87f1iu2g4189724byq8we7sd897f9s"}, 
      { type: "set", key: "cmi.core.lesson_status", val: "completed"}, 
      { type: "set", key: "cmi.core.session_time", val: function(){ return diag.getElapsedTime(); } }
    ]
  },

  // 1
  {
    label: "Gets and sets some values, passes SCO with score",
    steps: [
      { type: "get", key: "cmi.core.lesson_status"},
      { type: "set", key: "cmi.core.lesson_status", val: "incomplete"}, 
      { type: "get", key: "cmi.suspend_data"}, 
      { type: "set", key: "cmi.suspend_data", val: "test789"}, 
      { type: "get", key: "cmi.core.lesson_location"}, 
      { type: "set", key: "cmi.core.lesson_location", val: "page_4279814g2ui1f78fas9f798ds7ew8qyb"}, 
      { type: "set", key: "cmi.core.score.min", val: "0" }, 
      { type: "set", key: "cmi.core.score.max", val: "100" }, 
      { type: "set", key: "cmi.core.score.raw", val: "85" }, 
      { type: "set", key: "cmi.core.lesson_status", val: "passed"}, 
      { type: "set", key: "cmi.core.session_time", val: function(){ return diag.getElapsedTime(); } }
    ]
  },

  // 2
  {
    label: "Gets and sets some values, fails SCO with score",
    steps: [
      { type: "get", key: "cmi.core.lesson_status"}, 
      { type: "set", key: "cmi.core.lesson_status", val: "incomplete"}, 
      { type: "get", key: "cmi.suspend_data"}, 
      { type: "set", key: "cmi.suspend_data", val: "test789"}, 
      { type: "get", key: "cmi.core.lesson_location"}, 
      { type: "set", key: "cmi.core.lesson_location", val: "page_af87f1iu2g4189724byq8we7sd897f9s"},
      { type: "set", key: "cmi.core.score.min", val: "0" }, 
      { type: "set", key: "cmi.core.score.max", val: "100" }, 
      { type: "set", key: "cmi.core.score.raw", val: "25" }, 
      { type: "set", key: "cmi.core.lesson_status", val: "failed"}, 
      { type: "set", key: "cmi.core.session_time", val: function(){ return diag.getElapsedTime(); } }
    ]
  },

  // 3
  {
    label: "Sets interaction and objectives data, passes SCO with score",
    steps: [
      { type: "get", key: "cmi.core.lesson_status"}, 
      { type: "set", key: "cmi.core.lesson_status", val: "incomplete"}, 
      { type: "get", key: "cmi.objectives._children"}, 
      { type: "get", key: "cmi.objectives._count"}, 
      { type: "set", key: "cmi.objectives.0.id", val: "OID123"},
      { type: "set", key: "cmi.objectives.0.status", val: "passed"},
      { type: "set", key: "cmi.objectives.0.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.0.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.0.score.raw", val: "85"},
      { type: "set", key: "cmi.objectives.1.id", val: "OID456"},
      { type: "set", key: "cmi.objectives.1.status", val: "completed"},
      { type: "set", key: "cmi.objectives.2.id", val: "OID789"},
      { type: "set", key: "cmi.objectives.2.status", val: "failed"},
      { type: "set", key: "cmi.objectives.2.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.2.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.2.score.raw", val: "50"},
      { type: "get", key: "cmi.suspend_data"}, 
      { type: "set", key: "cmi.suspend_data", val: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend at enim ut iaculis. Etiam vel diam elementum, hendrerit metus eget, cursus odio. In id lectus iaculis, pretium turpis id, accumsan lorem. Morbi gravida accumsan erat at rutrum."}, 
      { type: "get", key: "cmi.core.lesson_location"}, 
      { type: "set", key: "cmi.core.lesson_location", val: "page_af87f1iu2g4189724byq8we7sd897f9s"},
      { type: "get", key: "cmi.interactions._children"}, 
      { type: "get", key: "cmi.interactions._count"}, 
      { type: "set", key: "cmi.interactions.0.id", val: "IID123"},
      { type: "get", key: "cmi.interactions.0.objectives._count"},
      { type: "set", key: "cmi.interactions.0.objectives.0.id", val: "IOID123"},
      { type: "set", key: "cmi.interactions.0.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.0.type", val: "true-false"},
      { type: "get", key: "cmi.interactions.0.correct_responses._count"},
      { type: "set", key: "cmi.interactions.0.correct_responses.0.pattern", val: "t"},
      { type: "set", key: "cmi.interactions.0.weighting", val: "0.60"},
      { type: "set", key: "cmi.interactions.0.student_response", val: "t"},
      { type: "set", key: "cmi.interactions.0.result", val: "correct"},
      { type: "set", key: "cmi.interactions.0.latency", val: "00:00:10.00"},
      { type: "set", key: "cmi.core.score.min", val: "0" }, 
      { type: "set", key: "cmi.core.score.max", val: "100" }, 
      { type: "set", key: "cmi.core.score.raw", val: "40" }, 
      { type: "set", key: "cmi.core.lesson_status", val: "failed"}, 
      { type: "set", key: "cmi.core.session_time", val: function(){ return diag.getElapsedTime(); } }
    ]
  }
  
];