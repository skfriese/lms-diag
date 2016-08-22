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
    'cmi.core.session_time'
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

    initialize: function(key,val,e)
    {
      var success = doLMSInitialize();
      if(success === "true")
      {
        // Store initial startTime in centiseconds
        this.startTime = Math.round((new Date()).getTime() / 10);
        this.initialized = true;
      }
    },

    terminate: function(key,val,e)
    {
      this.terminated = true;
      doLMSFinish();
    },

    commit: function(key,val,e)
    {
      doLMSCommit();
    },

    setValue: function(key,val,e)
    {
      doLMSSetValue(key,val.toString());
    },

    getValue: function(key,val,e)
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
      $('#elapsedTime').html(timestamp);
      var func=function()
      {
        self.setElapsedTime();
      };
      setTimeout(function(){func();},1);
    },

    setCustomValue: function(key,val,e)
    {
      var k = $('#customElKey').val();
      var v = $('#customElVal').val();
      if(k == '' || v == '')
      {
        this.log('You must enter a key and value before sending.','text-danger');
        return;
      }
      this.setValue(k,v);
    },

    getCustomValue: function(key,val,e)
    {
      var k = $('#customElKey').val();
      if(k == '')
      {
        this.log('You must enter a key before requesting.','text-danger');
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
        if($.inArray(prop, _hasChildren) < 0)
        {
          var result = doLMSGetValue(prop);
          if(result)
          {
            apiData[prop] = result;
          }
        }
        else
        {
          if($.inArray(prop, _hasCount) < 0)
          {
            var children = doLMSGetValue(prop+"._children");
            this.getChildren(prop, children.split(","));
          }
          else
          {
            console.log(prop, "has count")
          }
        }

      }

      console.log(apiData);
    },

    getChildren: function(parent,children)
    {
      for(var i=0;i<children.length;i++)
      {
        var child = children[i];
        var prop = parent+"."+child;

        if($.inArray(prop, _writeOnly) < 0)
        {
          if($.inArray(prop, _hasChildren) < 0)
          {
            var result = doLMSGetValue(prop);
            if(result)
            {
              apiData[prop] = result;
            }
          }
          else
          {
            if($.inArray(prop, _hasCount) < 0)
            {
              var children = doLMSGetValue(prop+"._children");
              this.getChildren(prop, children.split(","));
            }
            else
            {
              console.log(prop, "has count")
            }
          }
        }        
      }
    },

    clearConsole: function(val,e)
    {
      $("#logs").empty();
    },

    getCurrentTime: function()
    {
      var timeFix=function(time)
      {
        return (time<10) ? '0'+time : time;
      };
      var d = new Date();
      var hrs = timeFix(d.getHours());
      var min = timeFix(d.getMinutes());
      var sec = timeFix(d.getSeconds());
      return hrs+':'+min+':'+sec;
    },

    log: function(msg,css)
    {
      $("<li />")
        .addClass(css || 'text-success')
        .html(this.getCurrentTime() + " " + msg)
        .appendTo($('#logs ul'));

      $('#logs').scrollTop();
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
      return 'LMSDiag: '+this.version;
    }
  };

  return LMSDiag;

})(jQuery);
