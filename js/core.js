"use strict";

jQuery.support.cors = true;
$.ajaxSetup(
{
	cache : false
}
);


var client=new atrmsClient();

var val=client.getRosterData();