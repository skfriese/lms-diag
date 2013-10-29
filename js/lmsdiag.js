
/**
 * LMSDiag Class
 * @Developer Sean K. Friese (sean.friese@ancile.com)
 */

(function()
{
	/**
	 * Constructor - initiate with the new operator
	 * @param {Object} logFunc Function for sending log messages
	 */
	this.LMSDiag = function(logFunc)
	{
		this.startTime = '';
		this.version = 'v1.1_20110816';
		this.log = logFunc;
		this.log('Instance of LMS Diagnostic class created ('+this.version+')');
		this.initialize();
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
				this.log('doLMSInitialize was not successful');
			}
		},

		terminate: function()
		{
			this.log('Calling doLMSFinish...');
			var success = doLMSFinish();
			if(success === "true")
			{
				this.log('doLMSFinish executed successfully');
			}
			else
			{
				this.log('doLMSFinish was not successful');
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
				this.log('doLMSCommit was not successful');
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
				this.log('doLMSSetValue: cmi.core.lesson_location was not successful');
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
				this.log('doLMSSetValue: cmi.core.lesson_status was not successful');
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
				this.log('doLMSSetValue: cmi.core.score.raw was not successful');
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
				this.log('doLMSSetValue: cmi.suspend_data was not successful');
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
				this.log('doLMSSetValue: '+field+' was not successful');
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
				this.log('doLMSSetValue: cmi.core.session_time was not successful');
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

		toString: function()
		{
			return 'LMSDiag: '+this.version;
		}
	};
})();
