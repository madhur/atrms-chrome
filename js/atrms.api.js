"use strict";

function atrmsClient(EmployeeId)
{
	this.EmpId=EmployeeId;

	var PickProps = 
	{
	   'StartDate': 'Date',
	   'RouteNo': 'Route No',
	   'Seq':'Seq',
	   'Order':'Order',
	   'EmpId':'Emp Id',
	   'Name':'Name',
	   'Days':'Days',
	   'Zone':'Zone',
	   'Area':'Area',
	   'Shift':'Shift',
	   'PickupTime':'Pickup',
	   'CabMatesUrl':'Details'
	};

	this.PickDrops=PickProps;

	var DropProps = 
	{
	   'StartDate': 'Date',
	   'Slot': 'Parking Slot',
	   'RouteNo': 'Route No',
	   'Seq':'Seq',
	   'Order':'Order',
	   'EmpId':'Emp Id',
	   'Name':'Name',
	   'Days':'Days',
	   'Zone':'Zone',
	   'Area':'Area',
	   'Shift':'Shift',
	   'CabMatesUrl':'Details'
	   
	};

	this.DropProps=DropProps;

	var siteUrl="http://wncrpma011.japa.ad.aexp.com/TransportRoster/EmployeeReport.aspx";
	var clientSuccessCallback;
	var clientFailureCallback;

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
		var totaldata=[];

		var pickUpDatarows=$(data).find("#MainTab tr");
		var pickupArray=[];
		var pickupObj;

		pickupObj=new Object();
		for(var property in PickProps)
		{
			pickupObj[property]=PickProps[property];
		}
		pickupArray.push({"pickup":pickupObj});

		pickUpDatarows.each(function()
		{
			if(this.className=="tbldata" || this.className=="tbldata1")
			{
				pickupObj=new Object();
				var columnList=$('td', this);

				var i=0;
				for(var property in PickProps)
				{
					pickupObj[property]=columnList[i].innerHTML;
					i=i+1;


				}
			//	var detailsArray=$("td > a", this);
			//	pickupObj[PickProps.CabMatesUrl]=detailsArray[0].href.substring(detailsArray[0].href.indexOf("/M"));
				
				
				pickupArray.push({"pickup":pickupObj});

			}			
		});


		//console.log(pickupArray);

		var dropDataRows=$(data).find("#MainTab2ndOrder tr");
		var dropArray=[];
		dropDataRows.each(function()
		{
			if(this.className=="tbldata" || this.className=="tbldata1")
			{
				var dropObj=new Object();
				var columnList=$('td', this);

				var i=0;
				for(var property in DropProps)
				{
					dropObj[property]=columnList[i].innerHTML;
					i=i+1;
				}

			//	var detailsArray=$("td > a", this);
			//	dropObj[DropProps.CabMatesUrl]=detailsArray[0].href.substring(detailsArray[0].href.indexOf("/M"));
				
				dropArray.push({"drop": dropObj});

			}			
		});

		

		clientSuccessCallback(pickupArray, dropArray);

	};

	var ExtractViewState=function(data)
	{

		var rawResponse=data;
		var viewState=$(rawResponse).find('input[name=__VIEWSTATE]')[0].value;
	   

	    SendPostRequest(viewState);

	};

	var errorFunc=function()
	{
		
		failureFunc();

	};


	var alwaysFunc=function()
	{


	};

	this.getRosterData=function(completeFunc, failureFunc)
	{
		clientSuccessCallback=completeFunc;
		clientFailureCallback=failureFunc;

		getViewState();
		
	};



}