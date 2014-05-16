"use strict";

jQuery.support.cors = true;
$.ajaxSetup(
{
	cache : false
}
);


  $(document).ready(function () 
  {

        var empId = localStorage.getItem('empid');
    console.log(empId);
    if(empId!="" && empId!=null)
    {
      console.log(empId);
       $("#loading").show();
              var client=new atrmsClient(empId);
              client.getRosterData(completeFunc, failureFunc);
    }
    else
      $("#login-panel").show();

    $("#loginbutton").click(function() 
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
      else
       console.log('madhur');
      
    });


          


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
    $("#login-panel").hide();

    $(function() {
    $( "#accordion" ).accordion();
  });


}

function failureFunc()
{
	$("#loading").hide();

}