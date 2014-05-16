"use strict";

jQuery.support.cors = true;
$.ajaxSetup(
{
	cache : false
}
);



var empId = localStorage.getItem('empid');
if(empId!="" && empId!=null)
{
	console.log(empId);
	 $("#loading").show();
          var client=new atrmsClient(empId);
          client.getRosterData(completeFunc, failureFunc);
}

$( "#loginbutton" ).click(function() 
{
	var empId=$("#empid").val();
	if(empId!="")
	{

		  localStorage.setItem("empid" ,empId);

          // Notify that we saved.
          console.log('Settings saved');

          $("#loading").show();
          var client=new atrmsClient(empId);
          client.getRosterData(completeFunc, failureFunc);

      

	}
  
});






function completeFunc(pickupData, dropData)
{
	
	console.log(pickupData);
	
	var pickuptemplate = $('#pickup-template').html();
	var droptemplate = $('#drop-template').html();
    $('#accordion').append(Mustache.render(pickuptemplate, {
        rows: pickupData
    }));
     $('#accordion').append(Mustache.render(droptemplate, {
        rows: dropData
    }));

    $("#loading").hide();

    $(function() {
    $( "#accordion" ).accordion();
  });


}

function failureFunc()
{
	$("#loading").hide();

}