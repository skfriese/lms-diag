/**
 * LMSDiag Class
 * @Developer Sean K. Friese (skfriese@gmail.com)
 */

var LMSDiag = (function($)
{
  "use strict"

  var _getters = [
    'cmi.suspend_data',
    'cmi.launch_data',
    'cmi.comments',
    'cmi.comments_from_lms',
    'cmi.core',
    'cmi.objectives',
    'cmi.suspend_data',
    'cmi.student_data',
    'cmi.student_preference',
    'cmi.interactions'
  ];

  var _hasChildren = [
    'cmi.core',
    'cmi.core.score',
    'cmi.objectives',
    'cmi.student_data',
    'cmi.student_preference',
    'cmi.interactions'
  ];

  var _hasCount = [
    'cmi.objectives',
    'cmi.interactions'
  ];

  var _writeOnly = [
    'cmi.core.exit',
    'cmi.core.session_time',
    'cmi.interactions'
  ];

  var apiData = {};

  /**
   * Constructor - initiate with the new operator
   */
  function LMSDiag()
  {
    this.terminated = false;
    this.initialized = false;
    this.startTime = '';
    this.initSeconds = 20;
    this.version = 'v2.0_20160819';
    this.log('Instance of LMS Diagnostic class created ('+this.version+')');
    this.populateMacros();
    this.setElapsedTime();
    this.setInitSeconds();
  };

  LMSDiag.prototype = { 

    initialize: function()
    {
      var success = doLMSInitialize();
      if(success === "true")
      {
        // Store initial startTime in centiseconds
        this.startTime = Math.round((new Date()).getTime() / 10);
        this.initialized = true;
      }
    },

    terminate: function()
    {
      this.terminated = true;
      doLMSFinish();
    },

    commit: function()
    {
      doLMSCommit();
    },

    setValue: function(key,val,e)
    {
      doLMSSetValue(key,val.toString());
    },

    getValue: function(key)
    {
      doLMSGetValue(key);
    },

    setSessionTime: function(key,val,e)
    {
      doLMSSetValue('cmi.core.session_time', this.getElapsedTime());
    },

    setInitSeconds: function()
    {
      if(this.initialized)
      {
        $("#init-warning").remove();
        return;
      }

      var self = this;
      this.initSeconds--;

      $("#init-seconds").html(this.initSeconds);

      if(this.initSeconds < 1)
      {
        $("#init-warning").addClass("alert-danger");
        this.log('LMSInitialize was not called within 20 seconds','text-danger');
      }
      else
      {
        var func=function()
        {
          self.setInitSeconds();
        };
        setTimeout(function(){func();},1000);
      }      
    },

    getElapsedTime: function()
    {
      if(this.startTime != 0)
      {
        var curTime = Math.round((new Date()).getTime() / 10);
        var duration = curTime - this.startTime;
        var timeStamp = centisecsToSCORM12Duration(duration);
      }
      else
      {
        var timeStamp = "00:00:00.0";
      }
      return timeStamp;
    },

    setElapsedTime: function()
    {
      var self = this;
      var timestamp = this.getElapsedTime();
      $("#elapsedTime").html(timestamp);
      var func=function()
      {
        self.setElapsedTime();
      };
      setTimeout(function(){func();},1);
    },

    setCustomValue: function()
    {
      var k = $("#set-custom-key").val();
      var v = $("#set-custom-value").val();
      if(k == "" || v == "")
      {
        this.log("You must enter a key and value before sending.","text-warning");
        return;
      }
      this.setValue(k,v);
    },

    getCustomValue: function()
    {
      var k = $("#get-custom-key").val();
      if(k == "")
      {
        this.log("You must enter a key before requesting.","text-warning");
        return;
      }
      this.getValue(k);
    },

    populateMacros: function()
    {
      if(!LMSDiagMacros){return;}

      for(var i=0; i<LMSDiagMacros.length;i++)
      {
        var macro = LMSDiagMacros[i];
        $("<option />")
          .html(i + ": " + macro.label)
          .data("steps",macro.steps)
          .appendTo($("#macros"));
      }
    },

    runMacro: function(key,val,e)
    {
      var steps = $("#macros option:selected").data("steps");
      if(typeof steps == "undefined" || !steps.length){return;}
       
      for(var i=0; i<steps.length;i++)
      {
        var step = steps[i];
        switch(step.type)
        {
          case "get":
            this.getValue(step.key);
            break;
          case "set":
            var val = (typeof step.val == "function") ? step.val() : step.val;
            this.setValue(step.key,val);
            break;
        }
      }

      this.commit();
    },

    getAll: function(key,val,e)
    {
      for(var i=0;i<_getters.length;i++)
      {
        var prop = _getters[i];
        this.populate(prop);
      }

      console.log(apiData);
    },

    populate: function(prop)
    {
      if(this.inArray(prop, _hasChildren))
      {
        this.populateChildren(prop);
      }
      else
      {
        this.populateChild(prop);
      }
    },

    populateChildren: function(parentProp)
    {
      var result = doLMSGetValue(parentProp+"._children");
      var children = result.split(",");

      if(this.inArray(parentProp, _hasCount))
      {
        var count = doLMSGetValue(parentProp+"._count");
        if(!this.inArray(parentProp, _writeOnly))
        {
          for(var i=0;i<parseInt(count);i++)
          {
            for(var j=0;j<children.length;j++)
            {
              var child = children[j];
              var prop = [parentProp,i,child].join(".");
              this.populate(prop);
            }
          }
        }        
      }
      else
      {
        for(var i=0;i<children.length;i++)
        {
          var child = children[i];
          var prop = [parentProp,child].join(".");
          this.populate(prop);
        }
      }      
    },

    populateChild: function(prop)
    {
      if(this.inArray(prop, _writeOnly)){return}

      var result = doLMSGetValue(prop);
      if(result)
      {
        apiData[prop] = result;
      }
    },

    clearConsole: function(val,e)
    {
      $("#logs ul").empty();
    },

    getCurrentTime: function()
    {
      var timeFix=function(time)
      {
        return (time<10) ? "0"+time : time;
      };
      var d = new Date();
      var hrs = timeFix(d.getHours());
      var min = timeFix(d.getMinutes());
      var sec = timeFix(d.getSeconds());
      return [hrs,min,sec].join(":");
    },

    inArray(val, array)
    {
      return $.inArray(val, array) > -1;
    },

    log: function(msg,css)
    {
      $("<li />")
        .addClass(css || "text-success")
        .html(this.getCurrentTime() + " " + msg)
        .appendTo($('#logs ul'));

      $("#logs").scrollTop();
    },

    closeWin: function(val,e)
    {
      if(top == parent)
      {
        top.close();
      }
    },

    toString: function()
    {
      return "LMSDiag: "+this.version;
    }
  };

  return LMSDiag;

})(jQuery);
