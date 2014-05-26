"use strict";

jQuery.support.cors = true;
$.ajaxSetup(
{
    cache: false
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-51233548-1']);
_gaq.push(['_trackPageview']);

(function()
{
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();



$(document).ready(function()
{

    var empId = localStorage.getItem('empid');
    if (empId != "" && empId != null)
    {
        login(empId);
    }
    else
    {
        logout();
    }

    $("#loginbutton").click(function()
    {
        var empId = $("#empid").val();
        if (empId != "")
        {

            login(empId);
        }
        else
        {
            $("#error").html("Please enter your employee ID");

        }

    });

    $("#logout").click(function()
    {

        logout();

    });



});

function logout()
{
    localStorage.removeItem("empid");
    $("#app-panel").hide();
    $("#login-panel").show();
}

function login(empId)
{
    $("#error").empty();
    $("#loading").show();
    var client = new atrmsClient(empId);
    client.getRosterData(completeFunc, failureFunc);
}

function fixurl()
{
    $(".fixed-panel").each(function()
    {

        $(this).click(function()
        {

            $(".expand-panel").each(function()
            {
                $(this).hide();
            });

            $(this).next(".expand-panel").slideDown("fast");

            var cabUrl = $(this).find("a.cabmateurl");

            // console.log(cabUrl);

            new atrmsClient().getCabMates(cabUrl[0].href, completeCabFunc, failureFunc, this);

        });

    });


}

function completeCabFunc(data, parentElement)
{

    data.shift();
    console.log(data);
    //console.log(parentElement);

    var cabDiv = $(parentElement).next().find(".cabmates");
    console.log(cabDiv);
    //  $(cabDiv[0]).html(data.toString());


}

function completeFunc(pickupData, dropData, empId)
{

    localStorage.setItem("empid", empId);

    var pickuptemplate = $('#pickup-template').html();
    var droptemplate = $('#drop-template').html();

    $('#accordion').replaceWith('<div id="accordion"></div>');

    if (localStorage.getItem("oldroster")===true)
    {
        filterDates(pickupData);
        filterDates(dropData);
    }

    $('#accordion').append(Mustache.render(droptemplate,
    {
        rows: dropData
    }));

    $('#accordion').append(Mustache.render(pickuptemplate,
    {
        rows: pickupData
    }));


    $("#loading").hide();
    $("#login-panel").hide();
    $("#app-panel").show();

    $("#accordion").accordion();
    $(".ui-accordion-content").height("+=0");

    fixurl();



}

function filterDates(Data)
{

    var i;


    i = Data.length;
    while (i--)
    {

        var rosterDate = moment(Data[i].rowitem["StartDate"], "DD/MM/YYYY");

        if (moment().startOf('day') > rosterDate)
        {

            Data.splice(i, 1);
        }
    }



}

function failureFunc(data)
{
    $("#loading").hide();
    console.log(data);
    if (data != null)
        $("#error").html(data);
    else
        $("#error").html("Error");

}