"use strict";

jQuery.support.cors = true;
$.ajaxSetup(
{
	cache : false
}
);



var client=new atrmsClient('6247543');

client.getRosterData(completeFunc, failureFunc);

function completeFunc(pickupData, dropData)
{
	
	console.log(pickupData);
	
	var template = $('#mustache-template').html();
    $('#moustacheHtml').append(Mustache.render(template, {
        rows: pickupData
    }));


}

function failureFunc()
{


}