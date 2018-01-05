

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
		response_compare:"Save up to <strong>$%savings%</strong>",
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

	$(".calculator.loan-auto").accrue({
		mode: "compare",
		response_output_div: ".result.auto",
		response_compare:"Save up to <strong>$%savings%</strong>",
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
		response_compare:"Save up to <strong>$%savings%</strong>",
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

