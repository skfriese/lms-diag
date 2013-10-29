
/*
* Utility Functions
*/
var log=function(msg,type)
{
	$('debug').innerHTML += '<div class="entry">&gt; '+msg+'</div>';
	$('debug').scrollTop = $('debug').scrollHeight;
};
var clearConsle=function()
{
	$('debug').innerHTML = '';
};
var $=function(id)
{
	try
	{
		return document.getElementById(id);
	}
	catch(e)
	{
		alert('Error returning element with ID of '+id+': '+(e.description || e));
	}
	
};
var setElapsedTime=function()
{
	var timestamp = diag.getElapsedTime();
	$('elapsedTime').innerHTML = timestamp;
	var func=function()
	{
		setElapsedTime();
	};
	setTimeout(function(){func(),1000});
};
var setCustomValue=function()
{
	var k = $('customElKey').value;
	var v = $('customElVal').value;
	if(k == '' || v == '')
	{
		alert('You must enter a key and value before submitting.');
		return;
	}
	diag.setValue(k,v);
};

/*
* Window events
*/
var diag;
var terminated=false;
window.onload=function()
{
	diag = new LMSDiag(log);

	setElapsedTime();

	window.onunload=function()
	{
		if(terminated){return;}
		try
		{
			diag.setSessionTime();
			diag.commit();
			diag.terminate();
		}
		catch(e){}
	};
};
