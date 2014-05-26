$(document).ready(function()
{

	$("#readmore").click(function()
	{
		document.getElementById('overlayDetails').show();
	});

	$('#oldroster').change(function()
	{
		if ($(this).is(":checked"))
		{
			localStorage.setItem("oldroster", true);
		}
		else
		{
			localStorage.removeItem("oldroster");
		}

	});


});