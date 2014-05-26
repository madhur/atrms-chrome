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

	if(localStorage.getItem("oldroster")===true)
	{
		$('#oldroster').prop('checked', true);

	}
	else
	{
		$('#oldroster').prop('checked', false);

	}


});