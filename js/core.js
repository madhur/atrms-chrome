"use strict";

jQuery.support.cors = true;
$.ajaxSetup(
{
    cache: false
});

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
        localStorage.removeItem("empid");
        logout();

    });



});

function logout()
{
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


        });

    });


}


function completeFunc(pickupData, dropData, empId)
{

    //console.log(pickupData);
    localStorage.setItem("empid", empId);

    var pickuptemplate = $('#pickup-template').html();
    var droptemplate = $('#drop-template').html();

    $('#accordion').replaceWith('<div id="accordion"></div>');
    //$("#accordion").empty();
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

function failureFunc(data)
{
    $("#loading").hide();
    console.log(data);
    $("#error").html(data);

}
