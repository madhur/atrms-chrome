"use strict";

function atrmsClient(EmployeeId)
{
	this.EmpId=EmployeeId;

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
		.done(ExtractViewState).fail(errorFunc).always(alwaysFunc);
	   
		return "";

	};

	var SendPostRequest=function(viewState)
	{
		var EmpId = EmployeeId;

		var postData= {"cmdShow": "Show", "txtEmpId" : EmpId, "txtPeopleSoft_Id": EmpId, "__VIEWSTATE":  viewState  }
		//console.log(encodeURIComponent(viewState) );

		
			$.ajax
		({
		    type: "POST",
		    url: siteUrl,
		    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		    data: postData,
		    dataType: 'html',		    
		    processData: true,
			    xhrFields: 
			    {
			        withCredentials: true
			    }
	    })
		.done(parseRosterData).fail(errorFunc).always(alwaysFunc);


	};


	var parseRosterData=function(data)
	{
		console.log(data);
		


	};

	var ExtractViewState=function(data)
	{

		var rawResponse=data;
		var viewState=$(rawResponse).find('input[name=__VIEWSTATE]')[0].value;
	    console.log(viewState);

	    SendPostRequest(viewState);

	};

	var errorFunc=function()
	{


	};


	var alwaysFunc=function()
	{


	};

	this.getRosterData=function()
	{
		var viewStateVal=getViewState();
		console.log("calling");
		return "";
	};



}