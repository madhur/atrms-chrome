"use strict";

function atrmsClient(EmployeeId)
{
	this.EmpId=EmployeeId;

	var PickProps = 
	{
	   'StartDate': 'Week Start Date',
	   'RouteNo': 'Route No',
	   'Seq':'Seq',
	   'Order':'Order',
	   'EmpId':'Emp Id',
	   'Name':'Name',
	   'Days':'Days',
	   'Zone':'Zone',
	   'Area':'Area',
	   'Shift':'Shift',
	   'PickupTime':'Pickup time',
	   'CabMatesUrl':'Roster Details'
	};

	var DropProps = 
	{
	   'StartDate': 'Week Start Date',
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
	   'CabMatesUrl':'Roster Details'
	   
	};

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
		
		var pickUpDatarows=$(data).find("#MainTab tr");
		var pickupArray=[];
		pickUpDatarows.each(function()
		{
			if(this.className=="tbldata" || this.className=="tbldata1")
			{
				var pickupObj=new Object();
				var columnList=$('td', this);

				var i=0;
				for(var property in PickProps)
				{
					pickupObj[property]=columnList[i].innerHTML;
					i=i+1;


				}
				
				pickupObj[PickProps.CabMatesUrl]=$("td > a", this).innerHTML;
				pickupArray.push(pickupObj);

			}			
		});


		console.log(pickupArray);

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
				
				dropArray.push(dropObj);

			}			
		});

		console.log(dropArray);

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