"use strict";

function atrmsClient()
{

	var siteUrl="http://wncrpma011.japa.ad.aexp.com/TransportRoster/EmployeeReport.aspx";


	var getViewState=function()
	{

			$.ajax
		({
		    type: "GET",
		    url: siteUrl,
		    dataType: 'html',		    
		    processData: false,
			    xhrFields: 
			    {
			        withCredentials: true
			    }
	    })
		.done(function(data)
	    {
	    	console.log(data);
 

	    })
	    .fail(function()
	    {
	    	 console.log("fail");

	    })
	    .always(function()
	    {
	    	console.log("complete");
	    });
  
	

		return "";

	};

	this.getRosterData=function()
	{
		var viewStateVal=getViewState();
		return "";
	};



}