

$(function(){

	var check_all_results = function(){
		if ($('.result.credit').is(':hidden') && 
			$('.result.personal').is(':hidden') && 
			$('.result.auto').is(':hidden') ) {
			$('.aside .instructions').slideDown();
		} else {
			$('.aside .instructions').slideUp();
		}
	}

	$(".calculator.credit").accrue({
		mode: "compare",
		response_output_div: ".result.credit",
		response_compare:"Save up to <strong>$%savings%</strong> on<br> <strong>Credit Cards</strong>.",
		error_text:"$0",
		callback: function( elem, data ) {
			var el = $(".result.credit");
			if ( data.loan_1 != 0 ) {
				if ( el.is(':hidden') ) el.slideDown();
			} else {
				if ( el.is(':visible') ) el.slideUp();
			}
			check_all_results();
		}
	});

	/*
	$(".calculator.credit input[type=text]").on('keyup',function(){
		var interest_old = parseFloat( $('.calculator.credit .amount').val().replace(/[^0-9.]/g,"") ) * parseFloat( $('.calculator.credit .rate').val().replace(/[^0-9.]/g,"") / 100 );
		var interest_new = parseFloat( $('.calculator.credit .amount').val().replace(/[^0-9.]/g,"") ) * .089;
		if ( interest_old-interest_new > 0 ) {
			$(".result.credit").addClass('calculated');
			$(".result.credit").html( "<strong>Interest Savings: $"+(interest_old-interest_new).toFixed(2)+"</strong>" );
		} else {
			$(".result.credit").removeClass('calculated');
			$(".result.credit").html( "<span>Enter balance and rate to calculate savings.</span>" );
		}
	});
	*/

	$(".calculator.loan-auto").accrue({
		mode: "compare",
		response_output_div: ".result.auto",
		response_compare:"Save up to <strong>$%savings%</strong> on<br><strong>Auto Loans</strong>.",
		error_text:"$0",
		callback: function( elem, data ) {
			var el = $(".result.auto");
			if ( data.loan_1 != 0 ) {
				if ( el.is(':hidden') ) el.slideDown();
			} else {
				if ( el.is(':visible') ) el.slideUp();
			}
			check_all_results();
		}
	});

	$(".calculator.loan-personal").accrue({
		mode: "compare",
		response_output_div: ".result.personal",
		response_compare:"Save up to <strong>$%savings%</strong> on<br><strong>Personal Loans</strong>",
		error_text:"$0",
		callback: function( elem, data ) {
			var el = $(".result.personal");
			if ( data.loan_1 != 0 ) {
				if ( el.is(':hidden') ) el.slideDown();
			} else {
				if ( el.is(':visible') ) el.slideUp();
			}
			check_all_results();
		}
	});

	$(".numbers-only").keyup(function(){
		var fixed=$(this).val().replace(/[^0-9.]/g,"");
		$(this).val( fixed );
	});

});

