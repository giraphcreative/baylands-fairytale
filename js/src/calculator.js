

$(function(){

	$(".calculator.credit").accrue({
		mode: "compare",
		response_output_div: ".result.credit",
		response_compare:"<strong>Payment: $%loan_2_payment_amount%/mo<br>Savings: $%savings%</strong>",
		error_text:"<span>Enter balance and rate to see payment and savings.</span>"
	});

	$(".calculator.loan-auto").accrue({
		mode: "compare",
		response_output_div: ".result.auto",
		response_compare:"<strong>Payment: $%loan_2_payment_amount%/mo<br>Savings: $%savings%</strong>",
		error_text:"<span>Enter loan info to see payment and savings.</span>"
	});

	$(".calculator.loan-personal").accrue({
		mode: "compare",
		response_output_div: ".result.personal",
		response_compare:"<strong>Payment: $%loan_2_payment_amount%/mo<br>Savings: $%savings%</strong>",
		error_text:"<span>Enter loan info to see payment and savings.</span>",
		callback: function( elem, data ) {
			console.log( data );
		}
	});

	$(".numbers-only").keyup(function(){
		var fixed=$(this).val().replace(/[^0-9.]/g,"");
		$(this).val( fixed );
	});

});

