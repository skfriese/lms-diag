const LMSDiagMacros = [

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
    label: "Sets interaction and objectives data, fails SCO with score",
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
  },

  // 4
  {
    label: "Full assessment: 6 interaction types, 4 objectives, passes with 92",
    steps: [
      { type: "get", key: "cmi.core.lesson_status"},
      { type: "set", key: "cmi.core.lesson_status", val: "incomplete"},
      { type: "get", key: "cmi.core.student_id"},
      { type: "get", key: "cmi.core.student_name"},

      // Objectives
      { type: "set", key: "cmi.objectives.0.id", val: "OBJ_safety_basics"},
      { type: "set", key: "cmi.objectives.0.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.0.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.0.score.raw", val: "100"},
      { type: "set", key: "cmi.objectives.0.status", val: "passed"},
      { type: "set", key: "cmi.objectives.1.id", val: "OBJ_procedures"},
      { type: "set", key: "cmi.objectives.1.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.1.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.1.score.raw", val: "90"},
      { type: "set", key: "cmi.objectives.1.status", val: "passed"},
      { type: "set", key: "cmi.objectives.2.id", val: "OBJ_equipment_id"},
      { type: "set", key: "cmi.objectives.2.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.2.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.2.score.raw", val: "80"},
      { type: "set", key: "cmi.objectives.2.status", val: "passed"},
      { type: "set", key: "cmi.objectives.3.id", val: "OBJ_regulations"},
      { type: "set", key: "cmi.objectives.3.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.3.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.3.score.raw", val: "95"},
      { type: "set", key: "cmi.objectives.3.status", val: "passed"},

      // Interaction 0 - true-false
      { type: "set", key: "cmi.interactions.0.id", val: "Q1_tf_safety"},
      { type: "set", key: "cmi.interactions.0.objectives.0.id", val: "OBJ_safety_basics"},
      { type: "set", key: "cmi.interactions.0.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.0.type", val: "true-false"},
      { type: "set", key: "cmi.interactions.0.correct_responses.0.pattern", val: "t"},
      { type: "set", key: "cmi.interactions.0.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.0.student_response", val: "t"},
      { type: "set", key: "cmi.interactions.0.result", val: "correct"},
      { type: "set", key: "cmi.interactions.0.latency", val: "00:00:08.50"},

      // Interaction 1 - choice (multiple choice)
      { type: "set", key: "cmi.interactions.1.id", val: "Q2_mc_procedures"},
      { type: "set", key: "cmi.interactions.1.objectives.0.id", val: "OBJ_procedures"},
      { type: "set", key: "cmi.interactions.1.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.1.type", val: "choice"},
      { type: "set", key: "cmi.interactions.1.correct_responses.0.pattern", val: "b"},
      { type: "set", key: "cmi.interactions.1.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.1.student_response", val: "b"},
      { type: "set", key: "cmi.interactions.1.result", val: "correct"},
      { type: "set", key: "cmi.interactions.1.latency", val: "00:00:22.30"},

      // Interaction 2 - fill-in
      { type: "set", key: "cmi.interactions.2.id", val: "Q3_fill_equipment"},
      { type: "set", key: "cmi.interactions.2.objectives.0.id", val: "OBJ_equipment_id"},
      { type: "set", key: "cmi.interactions.2.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.2.type", val: "fill-in"},
      { type: "set", key: "cmi.interactions.2.correct_responses.0.pattern", val: "hydraulic press"},
      { type: "set", key: "cmi.interactions.2.weighting", val: "1.5"},
      { type: "set", key: "cmi.interactions.2.student_response", val: "hydraulic press"},
      { type: "set", key: "cmi.interactions.2.result", val: "correct"},
      { type: "set", key: "cmi.interactions.2.latency", val: "00:00:35.10"},

      // Interaction 3 - matching
      { type: "set", key: "cmi.interactions.3.id", val: "Q4_match_regulations"},
      { type: "set", key: "cmi.interactions.3.objectives.0.id", val: "OBJ_regulations"},
      { type: "set", key: "cmi.interactions.3.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.3.type", val: "matching"},
      { type: "set", key: "cmi.interactions.3.correct_responses.0.pattern", val: "1.a,2.b,3.c"},
      { type: "set", key: "cmi.interactions.3.weighting", val: "2.0"},
      { type: "set", key: "cmi.interactions.3.student_response", val: "1.a,2.b,3.c"},
      { type: "set", key: "cmi.interactions.3.result", val: "correct"},
      { type: "set", key: "cmi.interactions.3.latency", val: "00:01:05.00"},

      // Interaction 4 - performance
      { type: "set", key: "cmi.interactions.4.id", val: "Q5_perf_procedure_steps"},
      { type: "set", key: "cmi.interactions.4.objectives.0.id", val: "OBJ_procedures"},
      { type: "set", key: "cmi.interactions.4.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.4.type", val: "performance"},
      { type: "set", key: "cmi.interactions.4.correct_responses.0.pattern", val: "step_1.lock,step_2.tag,step_3.verify"},
      { type: "set", key: "cmi.interactions.4.weighting", val: "2.0"},
      { type: "set", key: "cmi.interactions.4.student_response", val: "step_1.lock,step_2.tag,step_3.verify"},
      { type: "set", key: "cmi.interactions.4.result", val: "correct"},
      { type: "set", key: "cmi.interactions.4.latency", val: "00:02:15.00"},

      // Interaction 5 - likert
      { type: "set", key: "cmi.interactions.5.id", val: "Q6_likert_feedback"},
      { type: "set", key: "cmi.interactions.5.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.5.type", val: "likert"},
      { type: "set", key: "cmi.interactions.5.correct_responses.0.pattern", val: "5"},
      { type: "set", key: "cmi.interactions.5.weighting", val: "0"},
      { type: "set", key: "cmi.interactions.5.student_response", val: "4"},
      { type: "set", key: "cmi.interactions.5.result", val: "neutral"},
      { type: "set", key: "cmi.interactions.5.latency", val: "00:00:05.00"},

      // Suspend data and location
      { type: "set", key: "cmi.suspend_data", val: "{\"module\":\"safety_training\",\"progress\":100,\"attempts\":1}"},
      { type: "set", key: "cmi.core.lesson_location", val: "module_4_summary"},

      // Final score and status
      { type: "set", key: "cmi.core.score.min", val: "0"},
      { type: "set", key: "cmi.core.score.max", val: "100"},
      { type: "set", key: "cmi.core.score.raw", val: "92"},
      { type: "set", key: "cmi.core.lesson_status", val: "passed"},
      { type: "set", key: "cmi.core.session_time", val: function(){ return diag.getElapsedTime(); } }
    ]
  },

  // 5
  {
    label: "Mixed results: some correct/wrong interactions, fails with 58",
    steps: [
      { type: "get", key: "cmi.core.lesson_status"},
      { type: "set", key: "cmi.core.lesson_status", val: "incomplete"},

      // Objectives with mixed results
      { type: "set", key: "cmi.objectives.0.id", val: "OBJ_mod1_concepts"},
      { type: "set", key: "cmi.objectives.0.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.0.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.0.score.raw", val: "75"},
      { type: "set", key: "cmi.objectives.0.status", val: "passed"},
      { type: "set", key: "cmi.objectives.1.id", val: "OBJ_mod2_application"},
      { type: "set", key: "cmi.objectives.1.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.1.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.1.score.raw", val: "40"},
      { type: "set", key: "cmi.objectives.1.status", val: "failed"},
      { type: "set", key: "cmi.objectives.2.id", val: "OBJ_mod3_analysis"},
      { type: "set", key: "cmi.objectives.2.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.2.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.2.score.raw", val: "55"},
      { type: "set", key: "cmi.objectives.2.status", val: "failed"},

      // Interaction 0 - choice, correct
      { type: "set", key: "cmi.interactions.0.id", val: "Q1_concepts_mc"},
      { type: "set", key: "cmi.interactions.0.objectives.0.id", val: "OBJ_mod1_concepts"},
      { type: "set", key: "cmi.interactions.0.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.0.type", val: "choice"},
      { type: "set", key: "cmi.interactions.0.correct_responses.0.pattern", val: "c"},
      { type: "set", key: "cmi.interactions.0.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.0.student_response", val: "c"},
      { type: "set", key: "cmi.interactions.0.result", val: "correct"},
      { type: "set", key: "cmi.interactions.0.latency", val: "00:00:14.20"},

      // Interaction 1 - true-false, wrong
      { type: "set", key: "cmi.interactions.1.id", val: "Q2_concepts_tf"},
      { type: "set", key: "cmi.interactions.1.objectives.0.id", val: "OBJ_mod1_concepts"},
      { type: "set", key: "cmi.interactions.1.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.1.type", val: "true-false"},
      { type: "set", key: "cmi.interactions.1.correct_responses.0.pattern", val: "f"},
      { type: "set", key: "cmi.interactions.1.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.1.student_response", val: "t"},
      { type: "set", key: "cmi.interactions.1.result", val: "wrong"},
      { type: "set", key: "cmi.interactions.1.latency", val: "00:00:06.00"},

      // Interaction 2 - fill-in, wrong
      { type: "set", key: "cmi.interactions.2.id", val: "Q3_application_fill"},
      { type: "set", key: "cmi.interactions.2.objectives.0.id", val: "OBJ_mod2_application"},
      { type: "set", key: "cmi.interactions.2.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.2.type", val: "fill-in"},
      { type: "set", key: "cmi.interactions.2.correct_responses.0.pattern", val: "mitosis"},
      { type: "set", key: "cmi.interactions.2.weighting", val: "1.5"},
      { type: "set", key: "cmi.interactions.2.student_response", val: "meiosis"},
      { type: "set", key: "cmi.interactions.2.result", val: "wrong"},
      { type: "set", key: "cmi.interactions.2.latency", val: "00:00:42.80"},

      // Interaction 3 - numeric, correct
      { type: "set", key: "cmi.interactions.3.id", val: "Q4_analysis_numeric"},
      { type: "set", key: "cmi.interactions.3.objectives.0.id", val: "OBJ_mod3_analysis"},
      { type: "set", key: "cmi.interactions.3.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.3.type", val: "numeric"},
      { type: "set", key: "cmi.interactions.3.correct_responses.0.pattern", val: "42"},
      { type: "set", key: "cmi.interactions.3.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.3.student_response", val: "42"},
      { type: "set", key: "cmi.interactions.3.result", val: "correct"},
      { type: "set", key: "cmi.interactions.3.latency", val: "00:00:18.50"},

      // Interaction 4 - sequencing, wrong
      { type: "set", key: "cmi.interactions.4.id", val: "Q5_analysis_seq"},
      { type: "set", key: "cmi.interactions.4.objectives.0.id", val: "OBJ_mod3_analysis"},
      { type: "set", key: "cmi.interactions.4.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.4.type", val: "sequencing"},
      { type: "set", key: "cmi.interactions.4.correct_responses.0.pattern", val: "a,c,b,d"},
      { type: "set", key: "cmi.interactions.4.weighting", val: "2.0"},
      { type: "set", key: "cmi.interactions.4.student_response", val: "a,b,c,d"},
      { type: "set", key: "cmi.interactions.4.result", val: "wrong"},
      { type: "set", key: "cmi.interactions.4.latency", val: "00:01:30.00"},

      // Suspend data and location
      { type: "set", key: "cmi.suspend_data", val: "{\"module\":\"mixed_assessment\",\"progress\":100,\"flagged\":[2,4]}"},
      { type: "set", key: "cmi.core.lesson_location", val: "results_page"},

      // Final score and status
      { type: "set", key: "cmi.core.score.min", val: "0"},
      { type: "set", key: "cmi.core.score.max", val: "100"},
      { type: "set", key: "cmi.core.score.raw", val: "58"},
      { type: "set", key: "cmi.core.lesson_status", val: "failed"},
      { type: "set", key: "cmi.core.session_time", val: function(){ return diag.getElapsedTime(); } }
    ]
  },

  // 6
  {
    label: "Completion-only: no score, objectives completed, 5 interactions",
    steps: [
      { type: "get", key: "cmi.core.lesson_status"},
      { type: "set", key: "cmi.core.lesson_status", val: "incomplete"},
      { type: "get", key: "cmi.core.student_id"},
      { type: "get", key: "cmi.core.student_name"},
      { type: "get", key: "cmi.launch_data"},

      // Objectives (no scores, just completion)
      { type: "set", key: "cmi.objectives.0.id", val: "OBJ_video_intro"},
      { type: "set", key: "cmi.objectives.0.status", val: "completed"},
      { type: "set", key: "cmi.objectives.1.id", val: "OBJ_reading_policy"},
      { type: "set", key: "cmi.objectives.1.status", val: "completed"},
      { type: "set", key: "cmi.objectives.2.id", val: "OBJ_interactive_walkthrough"},
      { type: "set", key: "cmi.objectives.2.status", val: "completed"},

      // Interaction 0 - likert (survey, no right answer)
      { type: "set", key: "cmi.interactions.0.id", val: "SURV_1_relevance"},
      { type: "set", key: "cmi.interactions.0.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.0.type", val: "likert"},
      { type: "set", key: "cmi.interactions.0.weighting", val: "0"},
      { type: "set", key: "cmi.interactions.0.student_response", val: "5"},
      { type: "set", key: "cmi.interactions.0.result", val: "neutral"},
      { type: "set", key: "cmi.interactions.0.latency", val: "00:00:04.00"},

      // Interaction 1 - likert (survey)
      { type: "set", key: "cmi.interactions.1.id", val: "SURV_2_clarity"},
      { type: "set", key: "cmi.interactions.1.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.1.type", val: "likert"},
      { type: "set", key: "cmi.interactions.1.weighting", val: "0"},
      { type: "set", key: "cmi.interactions.1.student_response", val: "4"},
      { type: "set", key: "cmi.interactions.1.result", val: "neutral"},
      { type: "set", key: "cmi.interactions.1.latency", val: "00:00:03.50"},

      // Interaction 2 - likert (survey)
      { type: "set", key: "cmi.interactions.2.id", val: "SURV_3_difficulty"},
      { type: "set", key: "cmi.interactions.2.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.2.type", val: "likert"},
      { type: "set", key: "cmi.interactions.2.weighting", val: "0"},
      { type: "set", key: "cmi.interactions.2.student_response", val: "3"},
      { type: "set", key: "cmi.interactions.2.result", val: "neutral"},
      { type: "set", key: "cmi.interactions.2.latency", val: "00:00:05.20"},

      // Interaction 3 - fill-in (open response, no scoring)
      { type: "set", key: "cmi.interactions.3.id", val: "SURV_4_comments"},
      { type: "set", key: "cmi.interactions.3.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.3.type", val: "fill-in"},
      { type: "set", key: "cmi.interactions.3.weighting", val: "0"},
      { type: "set", key: "cmi.interactions.3.student_response", val: "Very informative training module"},
      { type: "set", key: "cmi.interactions.3.result", val: "neutral"},
      { type: "set", key: "cmi.interactions.3.latency", val: "00:00:28.00"},

      // Interaction 4 - choice (knowledge check, unscored)
      { type: "set", key: "cmi.interactions.4.id", val: "KC_1_review"},
      { type: "set", key: "cmi.interactions.4.objectives.0.id", val: "OBJ_interactive_walkthrough"},
      { type: "set", key: "cmi.interactions.4.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.4.type", val: "choice"},
      { type: "set", key: "cmi.interactions.4.correct_responses.0.pattern", val: "a,d"},
      { type: "set", key: "cmi.interactions.4.weighting", val: "0"},
      { type: "set", key: "cmi.interactions.4.student_response", val: "a,d"},
      { type: "set", key: "cmi.interactions.4.result", val: "correct"},
      { type: "set", key: "cmi.interactions.4.latency", val: "00:00:16.00"},

      // Suspend data and location
      { type: "set", key: "cmi.suspend_data", val: "v=1;complete=true;sections=intro|policy|walkthrough"},
      { type: "set", key: "cmi.core.lesson_location", val: "completion_certificate"},
      { type: "set", key: "cmi.core.lesson_status", val: "completed"},
      { type: "set", key: "cmi.core.session_time", val: function(){ return diag.getElapsedTime(); } }
    ]
  },

  // 7
  {
    label: "Borderline pass at mastery (65), all 8 SCORM interaction types",
    steps: [
      { type: "get", key: "cmi.core.lesson_status"},
      { type: "set", key: "cmi.core.lesson_status", val: "incomplete"},
      { type: "get", key: "cmi.student_data.mastery_score"},

      // Objectives
      { type: "set", key: "cmi.objectives.0.id", val: "OBJ_knowledge"},
      { type: "set", key: "cmi.objectives.0.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.0.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.0.score.raw", val: "70"},
      { type: "set", key: "cmi.objectives.0.status", val: "passed"},
      { type: "set", key: "cmi.objectives.1.id", val: "OBJ_skill"},
      { type: "set", key: "cmi.objectives.1.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.1.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.1.score.raw", val: "60"},
      { type: "set", key: "cmi.objectives.1.status", val: "incomplete"},

      // Interaction 0 - true-false
      { type: "set", key: "cmi.interactions.0.id", val: "INT_tf_001"},
      { type: "set", key: "cmi.interactions.0.objectives.0.id", val: "OBJ_knowledge"},
      { type: "set", key: "cmi.interactions.0.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.0.type", val: "true-false"},
      { type: "set", key: "cmi.interactions.0.correct_responses.0.pattern", val: "f"},
      { type: "set", key: "cmi.interactions.0.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.0.student_response", val: "f"},
      { type: "set", key: "cmi.interactions.0.result", val: "correct"},
      { type: "set", key: "cmi.interactions.0.latency", val: "00:00:07.00"},

      // Interaction 1 - choice
      { type: "set", key: "cmi.interactions.1.id", val: "INT_choice_002"},
      { type: "set", key: "cmi.interactions.1.objectives.0.id", val: "OBJ_knowledge"},
      { type: "set", key: "cmi.interactions.1.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.1.type", val: "choice"},
      { type: "set", key: "cmi.interactions.1.correct_responses.0.pattern", val: "a,c"},
      { type: "set", key: "cmi.interactions.1.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.1.student_response", val: "a,b"},
      { type: "set", key: "cmi.interactions.1.result", val: "wrong"},
      { type: "set", key: "cmi.interactions.1.latency", val: "00:00:20.00"},

      // Interaction 2 - fill-in
      { type: "set", key: "cmi.interactions.2.id", val: "INT_fillin_003"},
      { type: "set", key: "cmi.interactions.2.objectives.0.id", val: "OBJ_knowledge"},
      { type: "set", key: "cmi.interactions.2.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.2.type", val: "fill-in"},
      { type: "set", key: "cmi.interactions.2.correct_responses.0.pattern", val: "osmosis"},
      { type: "set", key: "cmi.interactions.2.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.2.student_response", val: "osmosis"},
      { type: "set", key: "cmi.interactions.2.result", val: "correct"},
      { type: "set", key: "cmi.interactions.2.latency", val: "00:00:15.30"},

      // Interaction 3 - matching
      { type: "set", key: "cmi.interactions.3.id", val: "INT_match_004"},
      { type: "set", key: "cmi.interactions.3.objectives.0.id", val: "OBJ_skill"},
      { type: "set", key: "cmi.interactions.3.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.3.type", val: "matching"},
      { type: "set", key: "cmi.interactions.3.correct_responses.0.pattern", val: "1.c,2.a,3.b"},
      { type: "set", key: "cmi.interactions.3.weighting", val: "1.5"},
      { type: "set", key: "cmi.interactions.3.student_response", val: "1.c,2.b,3.a"},
      { type: "set", key: "cmi.interactions.3.result", val: "wrong"},
      { type: "set", key: "cmi.interactions.3.latency", val: "00:01:10.00"},

      // Interaction 4 - performance
      { type: "set", key: "cmi.interactions.4.id", val: "INT_perf_005"},
      { type: "set", key: "cmi.interactions.4.objectives.0.id", val: "OBJ_skill"},
      { type: "set", key: "cmi.interactions.4.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.4.type", val: "performance"},
      { type: "set", key: "cmi.interactions.4.correct_responses.0.pattern", val: "turn_off.disconnect.drain"},
      { type: "set", key: "cmi.interactions.4.weighting", val: "2.0"},
      { type: "set", key: "cmi.interactions.4.student_response", val: "turn_off.disconnect.drain"},
      { type: "set", key: "cmi.interactions.4.result", val: "correct"},
      { type: "set", key: "cmi.interactions.4.latency", val: "00:01:45.00"},

      // Interaction 5 - sequencing
      { type: "set", key: "cmi.interactions.5.id", val: "INT_seq_006"},
      { type: "set", key: "cmi.interactions.5.objectives.0.id", val: "OBJ_skill"},
      { type: "set", key: "cmi.interactions.5.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.5.type", val: "sequencing"},
      { type: "set", key: "cmi.interactions.5.correct_responses.0.pattern", val: "d,a,c,b"},
      { type: "set", key: "cmi.interactions.5.weighting", val: "1.5"},
      { type: "set", key: "cmi.interactions.5.student_response", val: "d,a,c,b"},
      { type: "set", key: "cmi.interactions.5.result", val: "correct"},
      { type: "set", key: "cmi.interactions.5.latency", val: "00:00:55.00"},

      // Interaction 6 - likert
      { type: "set", key: "cmi.interactions.6.id", val: "INT_likert_007"},
      { type: "set", key: "cmi.interactions.6.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.6.type", val: "likert"},
      { type: "set", key: "cmi.interactions.6.weighting", val: "0"},
      { type: "set", key: "cmi.interactions.6.student_response", val: "2"},
      { type: "set", key: "cmi.interactions.6.result", val: "neutral"},
      { type: "set", key: "cmi.interactions.6.latency", val: "00:00:03.00"},

      // Interaction 7 - numeric
      { type: "set", key: "cmi.interactions.7.id", val: "INT_numeric_008"},
      { type: "set", key: "cmi.interactions.7.objectives.0.id", val: "OBJ_knowledge"},
      { type: "set", key: "cmi.interactions.7.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.7.type", val: "numeric"},
      { type: "set", key: "cmi.interactions.7.correct_responses.0.pattern", val: "3.14"},
      { type: "set", key: "cmi.interactions.7.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.7.student_response", val: "3.14"},
      { type: "set", key: "cmi.interactions.7.result", val: "correct"},
      { type: "set", key: "cmi.interactions.7.latency", val: "00:00:12.00"},

      // Suspend data and location
      { type: "set", key: "cmi.suspend_data", val: "review_flags=1,3;time_spent=487;version=2"},
      { type: "set", key: "cmi.core.lesson_location", val: "assessment_review"},

      // Score at mastery threshold
      { type: "set", key: "cmi.core.score.min", val: "0"},
      { type: "set", key: "cmi.core.score.max", val: "100"},
      { type: "set", key: "cmi.core.score.raw", val: "65"},
      { type: "set", key: "cmi.core.lesson_status", val: "passed"},
      { type: "set", key: "cmi.core.session_time", val: function(){ return diag.getElapsedTime(); } }
    ]
  },

  // 8
  {
    label: "Suspend/resume scenario: incomplete with partial progress",
    steps: [
      { type: "get", key: "cmi.core.lesson_status"},
      { type: "get", key: "cmi.core.lesson_location"},
      { type: "get", key: "cmi.suspend_data"},
      { type: "get", key: "cmi.core.entry"},
      { type: "set", key: "cmi.core.lesson_status", val: "incomplete"},

      // Partial objectives
      { type: "set", key: "cmi.objectives.0.id", val: "OBJ_chapter1"},
      { type: "set", key: "cmi.objectives.0.score.min", val: "0"},
      { type: "set", key: "cmi.objectives.0.score.max", val: "100"},
      { type: "set", key: "cmi.objectives.0.score.raw", val: "88"},
      { type: "set", key: "cmi.objectives.0.status", val: "passed"},
      { type: "set", key: "cmi.objectives.1.id", val: "OBJ_chapter2"},
      { type: "set", key: "cmi.objectives.1.status", val: "incomplete"},
      { type: "set", key: "cmi.objectives.2.id", val: "OBJ_chapter3"},
      { type: "set", key: "cmi.objectives.2.status", val: "not attempted"},

      // Interactions from the completed portion
      { type: "set", key: "cmi.interactions.0.id", val: "CH1_Q1_tf"},
      { type: "set", key: "cmi.interactions.0.objectives.0.id", val: "OBJ_chapter1"},
      { type: "set", key: "cmi.interactions.0.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.0.type", val: "true-false"},
      { type: "set", key: "cmi.interactions.0.correct_responses.0.pattern", val: "t"},
      { type: "set", key: "cmi.interactions.0.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.0.student_response", val: "t"},
      { type: "set", key: "cmi.interactions.0.result", val: "correct"},
      { type: "set", key: "cmi.interactions.0.latency", val: "00:00:09.00"},

      { type: "set", key: "cmi.interactions.1.id", val: "CH1_Q2_choice"},
      { type: "set", key: "cmi.interactions.1.objectives.0.id", val: "OBJ_chapter1"},
      { type: "set", key: "cmi.interactions.1.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.1.type", val: "choice"},
      { type: "set", key: "cmi.interactions.1.correct_responses.0.pattern", val: "b"},
      { type: "set", key: "cmi.interactions.1.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.1.student_response", val: "b"},
      { type: "set", key: "cmi.interactions.1.result", val: "correct"},
      { type: "set", key: "cmi.interactions.1.latency", val: "00:00:11.50"},

      { type: "set", key: "cmi.interactions.2.id", val: "CH1_Q3_numeric"},
      { type: "set", key: "cmi.interactions.2.objectives.0.id", val: "OBJ_chapter1"},
      { type: "set", key: "cmi.interactions.2.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.2.type", val: "numeric"},
      { type: "set", key: "cmi.interactions.2.correct_responses.0.pattern", val: "256"},
      { type: "set", key: "cmi.interactions.2.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.2.student_response", val: "256"},
      { type: "set", key: "cmi.interactions.2.result", val: "correct"},
      { type: "set", key: "cmi.interactions.2.latency", val: "00:00:20.00"},

      { type: "set", key: "cmi.interactions.3.id", val: "CH2_Q1_fill"},
      { type: "set", key: "cmi.interactions.3.objectives.0.id", val: "OBJ_chapter2"},
      { type: "set", key: "cmi.interactions.3.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.3.type", val: "fill-in"},
      { type: "set", key: "cmi.interactions.3.correct_responses.0.pattern", val: "refraction"},
      { type: "set", key: "cmi.interactions.3.weighting", val: "1.0"},
      { type: "set", key: "cmi.interactions.3.student_response", val: "reflection"},
      { type: "set", key: "cmi.interactions.3.result", val: "wrong"},
      { type: "set", key: "cmi.interactions.3.latency", val: "00:00:30.00"},

      { type: "set", key: "cmi.interactions.4.id", val: "CH2_Q2_matching"},
      { type: "set", key: "cmi.interactions.4.objectives.0.id", val: "OBJ_chapter2"},
      { type: "set", key: "cmi.interactions.4.time", val: function(){ return diag.getCurrentTime(); } },
      { type: "set", key: "cmi.interactions.4.type", val: "matching"},
      { type: "set", key: "cmi.interactions.4.correct_responses.0.pattern", val: "1.b,2.c,3.a"},
      { type: "set", key: "cmi.interactions.4.weighting", val: "1.5"},
      { type: "set", key: "cmi.interactions.4.student_response", val: "1.b,2.a,3.c"},
      { type: "set", key: "cmi.interactions.4.result", val: "wrong"},
      { type: "set", key: "cmi.interactions.4.latency", val: "00:01:02.00"},

      // Bookmark and suspend data for resume
      { type: "set", key: "cmi.core.lesson_location", val: "chapter2_page3"},
      { type: "set", key: "cmi.suspend_data", val: "{\"ch1\":{\"done\":true,\"score\":88},\"ch2\":{\"done\":false,\"page\":3},\"ch3\":{\"done\":false}}"},
      { type: "set", key: "cmi.core.exit", val: "suspend"},
      { type: "set", key: "cmi.core.session_time", val: function(){ return diag.getElapsedTime(); } }
    ]
  }
  
];