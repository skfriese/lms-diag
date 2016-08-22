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
    this.startTime = '';
    this.version = 'v2.0_20160819';
    this.log('Instance of LMS Diagnostic class created ('+this.version+')');
    this.populateMacros();
    this.setElapsedTime();
  };

  LMSDiag.prototype = { 

    initialize: function()
    {
      this.log('Calling doLMSInitialize...');
      var success = doLMSInitialize();
      if(success === "true")
      {
        // Store initial startTime in centiseconds
        this.startTime = Math.round((new Date()).getTime() / 10);
        this.log('doLMSInitialize executed successfully');
      }
      else
      {
        this.log('doLMSInitialize was not successful','text-danger');
      }
    },

    terminate: function()
    {
      this.terminated = true;
      this.log('Calling doLMSFinish...');
      var success = doLMSFinish();
      if(success === "true")
      {
        this.log('doLMSFinish executed successfully');
      }
      else
      {
        this.log('doLMSFinish was not successful','text-danger');
      }
    },

    commit: function()
    {
      var success = doLMSCommit();
      if(success === "true")
      {
        this.log('doLMSCommit executed successfully');
      }
      else
      {
        this.log('doLMSCommit was not successful','text-danger');
      }
    },
    
    setLocation: function(lesson_location)
    {
      var success = doLMSSetValue('cmi.core.lesson_location', lesson_location);

      if(success === "true")
      {
        this.log('doLMSSetValue: cmi.core.lesson_location executed successfully ('+lesson_location+')');
      }
      else
      {
        this.log('doLMSSetValue: cmi.core.lesson_location was not successful','text-danger');
      }
    },

    getLocation: function()
    {
      var result = doLMSGetValue('cmi.core.lesson_location');
      this.log('getLocation='+result);
      return result;
    },

    setStatus: function(lesson_status)
    {
      var success = doLMSSetValue('cmi.core.lesson_status', lesson_status);
      if(success === "true")
      {
        this.log('doLMSSetValue: cmi.core.lesson_status executed successfully ('+lesson_status+')');
      }
      else
      {
        this.log('doLMSSetValue: cmi.core.lesson_status was not successful','text-danger');
      }
    },

    getStatus: function()
    {
      var result = doLMSGetValue('cmi.core.lesson_status');
      this.log('getStatus='+result);
      return result;
    },

    setScore: function(score)
    {
      var minResult = doLMSSetValue('cmi.core.score.min', '0');
      var maxResult = doLMSSetValue('cmi.core.score.max', '100');
      
      var success = doLMSSetValue('cmi.core.score.raw', score);

      if(success === "true")
      {
        this.log('doLMSSetValue: cmi.core.score.raw executed successfully ('+score+')');
      }
      else
      {
        this.log('doLMSSetValue: cmi.core.score.raw was not successful','text-danger');
      }
    },

    getScore: function()
    {
      var result = doLMSGetValue('cmi.core.score.raw');
      this.log('getScore='+result);
      return result;
    },

    setSuspendData: function(suspend_data)
    {
      var success = doLMSSetValue('cmi.suspend_data', escape(suspend_data));
      if(success === "true")
      {
        this.log('doLMSSetValue: cmi.suspend_data executed successfully ('+escape(suspend_data)+')');
      }
      else
      {
        this.log('doLMSSetValue: cmi.suspend_data was not successful','text-danger');
      }
    },
    
    getSuspendData: function()
    {
      var result = unescape(doLMSGetValue('cmi.suspend_data'));
      this.log('getSuspendData='+result);
      return result;
    },

    setValue: function(field,data)
    {
      var success = doLMSSetValue(field,data);
      
      if(success === "true")
      {
        this.log('doLMSSetValue: '+field+' executed successfully ('+data+')');
      }
      else
      {
        this.log('doLMSSetValue: '+field+' was not successful','text-danger');
      }
    },

    getValue: function(field)
    {
      var result = doLMSGetValue(field);
      if(result)
      {
        this.log('doLMSGetValue: '+field+' executed successfully ('+result+')');
      }
      else
      {
        this.log('doLMSGetValue: '+field+' was not successful','text-danger');
      }
    },

    setSessionTime: function()
    {
      var timeStamp = this.getElapsedTime();

      var success = doLMSSetValue('cmi.core.session_time', timeStamp);
      if(success === "true")
      {
        this.log('doLMSSetValue: cmi.core.session_time executed successfully ('+timeStamp+')');
      }
      else
      {
        this.log('doLMSSetValue: cmi.core.session_time was not successful','text-danger');
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
      setTimeout(function(){func(),1000});
    },

    setCustomValue: function()
    {
      var k = $('#customElKey').val();
      var v = $('#customElVal').val();
      if(k == '' || v == '')
      {
        this.log('You must enter a key and value before submitting.','text-danger');
        return;
      }
      this.setValue(k,v);
    },

    getCustomValue: function()
    {
      var k = $('#customElKey').val();
      if(k == '')
      {
        this.log('You must enter a key and value before submitting.','text-danger');
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
          .html("Macro "+i)
          .data("macro",macro)
          .appendTo($("#macros"));
      }
    },

    getAll: function()
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

    clearConsole: function()
    {
      $("#logs").empty();
    },

    log: function(msg,css)
    {
      $("<div />")
        .addClass(css || 'text-success')
        .html("&gt; "+msg)
        .appendTo($('#logs'));

      $('#logs').scrollTop();
    },

    closeWin: function()
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
