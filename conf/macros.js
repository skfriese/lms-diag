var LMSDiagMacros = [

  // 0
  [
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
      type: "set",
      key: "cmi.suspend_data",
      val: "test123"
    },
    {
      type: "set",
      key: "cmi.core.lesson_location",
      val: "page_af87f1iu2g4189724byq8we7sd897f9s"
    }
  ],

  // 1
  [
    {
      type: "get",
      key: "cmi.core.lesson_status"
    },
    {
      type: "get",
      key: "cmi.core.lesson_location"
    },
    {
      type: "set",
      key: "cmi.suspend_data",
      val: "test456"
    },
    {
      type: "set",
      key: "cmi.core.lesson_location",
      val: "page_s9f798ds7ew8qyb4279814g2ui1f78fa"
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
    
  ],

  // 2
  [
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

];