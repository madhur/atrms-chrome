"use strict";

jQuery.support.cors = true;
$.ajaxSetup(
{
	cache : false
}
);


var client=new atrmsClient('6247543');

var val=client.getRosterData();