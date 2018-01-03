!function(a,b,c,d){a.extend(a.fn,{accrue:function(b){return b=a.extend({calculationMethod:f},a.fn.accrue.options,b),this.each(function(){var c=a(this);c.find(".form").length||c.append('<div class="form"></div>');e(c,b,"amount"),e(c,b,"rate"),e(c,b,"term");if("compare"==b.mode){e(c,b,"rate_compare")}if(".results"===b.response_output_div){0==c.find(".results").length&&c.append('<div class="results"></div>');var d=c.find(".results")}else var d=a(b.response_output_div);switch(b.mode){case"basic":var i=f;break;case"compare":var i=g;break;case"amortization":var i=h}i(c,b,d),"button"==b.operation?(0==c.find("button").length&&c.find(".form").append('<button class="accrue-calculate">'+b.button_label+"</button>"),c.find("button, input[type=submit]").each(function(){a(this).click(function(a){a.preventDefault(),i(c,b,d)})})):c.find("input, select").each(function(){a(this).bind("keyup change",function(){i(c,b,d)})}),c.find("form").each(function(){a(this).submit(function(a){a.preventDefault(),i(c,b,d)})})})}}),a.fn.accrue.options={mode:"basic",operation:"keyup",default_values:{amount:"$7,500",rate:"7%",rate_compare:"1.49%",term:"36m"},field_titles:{amount:"Loan Amount",rate:"Rate (APR)",rate_compare:"Comparison Rate",term:"Term"},button_label:"Calculate",field_comments:{amount:"",rate:"",rate_compare:"",term:"Format: 12m, 36m, 3y, 7y"},response_output_div:".results",response_basic:"<p><strong>Monthly Payment:</strong><br />$%payment_amount%</p><p><strong>Number of Payments:</strong><br />%num_payments%</p><p><strong>Total Payments:</strong><br />$%total_payments%</p><p><strong>Total Interest:</strong><br />$%total_interest%</p>",response_compare:"Save $%savings% in interest!",error_text:"Please fill in all fields.",callback:function(a,b){}};var e=function(a,b,c){var d=a.find("."+c).length?a.find("."+c):a.find(".accrue-"+c).length?a.find(".accrue-"+c):a.find("input[name~="+c+"]").length?a.find("input[name~="+c+"]"):"";return"string"!=typeof d?d.val():"term_compare"==c?!1:(a.find(".form").append('<div class="accrue-field-'+c+'"><p><label>'+b.field_titles[c]+':</label><input type="text" class="'+c+'" value="'+b.default_values[c]+'" />'+(b.field_comments[c].length>0?"<small>"+b.field_comments[c]+"</small>":"")+"</p></div>"),a.find("."+c).val())},f=function(b,c,d){var f=a.loanInfo({amount:e(b,c,"amount"),rate:e(b,c,"rate"),term:e(b,c,"term")});if(0!==f){var g=c.response_basic.replace("%payment_amount%",f.payment_amount_formatted).replace("%num_payments%",f.num_payments).replace("%total_payments%",f.total_payments_formatted).replace("%total_interest%",f.total_interest_formatted);d.html(g)}else d.html(c.error_text);c.callback(b,f)},g=function(b,c,d){var f=e(b,c,"term_compare");f===!1&&(f=e(b,c,"term"));var g=a.loanInfo({amount:e(b,c,"amount"),rate:e(b,c,"rate"),term:e(b,c,"term")}),h=a.loanInfo({amount:e(b,c,"amount"),rate:e(b,c,"rate_compare"),term:f}),i={loan_1:g,loan_2:h};if(0!==g&&0!==h){g.total_interest-h.total_interest>0?i.savings=g.total_interest-h.total_interest:i.savings=0;var j=c.response_compare.replace("%savings%",i.savings.toFixed(2)).replace("%loan_2_payment_amount%",h.payment_amount_formatted).replace("%loan_2_num_payments%",h.num_payments).replace("%loan_2_total_payments%",h.total_payments_formatted).replace("%loan_2_total_interest%",h.total_interest_formatted).replace("%loan_1_payment_amount%",g.payment_amount_formatted).replace("%loan_1_num_payments%",g.num_payments).replace("%loan_1_total_payments%",g.total_payments_formatted).replace("%loan_1_total_interest%",g.total_interest_formatted);d.html(j)}else d.html(c.error_text);c.callback(b,i)},h=function(b,c,d){var f=a.loanInfo({amount:e(b,c,"amount"),rate:e(b,c,"rate"),term:e(b,c,"term")});if(0!==f){var g='<table class="accrue-amortization"><tr><th class="accrue-payment-number">#</th><th class="accrue-payment-amount">Payment Amt.</th><th class="accrue-total-interest">Total Interest</th><th class="accrue-total-payments">Total Payments</th><th class="accrue-balance">Balance</th></tr>',h=f.payment_amount-f.original_amount/f.num_payments,i=f.payment_amount-h;counter_interest=0,counter_payment=0,counter_balance=parseInt(f.original_amount);for(var j=0;j<f.num_payments;j++){counter_interest+=h,counter_payment+=f.payment_amount,counter_balance-=i;var k="td";j==f.num_payments-1&&(k="th"),g=g+"<tr><"+k+' class="accrue-payment-number">'+(j+1)+"</"+k+"><"+k+' class="accrue-payment-amount">$'+f.payment_amount_formatted+"</"+k+"><"+k+' class="accrue-total-interest">$'+counter_interest.toFixed(2)+"</"+k+"><"+k+' class="accrue-total-payments">$'+counter_payment.toFixed(2)+"</"+k+"><"+k+' class="accrue-balance">$'+counter_balance.toFixed(2)+"</"+k+"></tr>"}g+="</table>",d.html(g)}else d.html(c.error_text);c.callback(b,f)};a.loanInfo=function(a){var b=("undefined"!=typeof a.amount?a.amount:0).replace(/[^\d.]/gi,""),c=("undefined"!=typeof a.rate?a.rate:0).replace(/[^\d.]/gi,""),d="undefined"!=typeof a.term?a.term:0;d=d.match("y")?12*parseInt(d.replace(/[^\d.]/gi,"")):parseInt(d.replace(/[^\d.]/gi,""));var e=c/1200,f=b*(e/(1-Math.pow(1+e,-1*d)));return b*c*d>0?{original_rate:c,original_term:d,original_amount:b,payment_amount:f,payment_amount_formatted:f.toFixed(2),num_payments:d,total_payments:f*d,total_payments_formatted:(f*d).toFixed(2),total_interest:f*d-b,total_interest_formatted:(f*d-b).toFixed(2)}:0}}(jQuery,window,document),$(function(){var a=function(){$(".result.credit").is(":hidden")&&$(".result.personal").is(":hidden")&&$(".result.auto").is(":hidden")?$(".aside .instructions").slideDown():$(".aside .instructions").slideUp()};$(".calculator.credit").accrue({mode:"compare",response_output_div:".result.credit",response_compare:"Save up to <strong>$%savings%</strong> on <strong>Credit Cards</strong>.",error_text:"$0",callback:function(b,c){var d=$(".result.credit");0!=c.loan_1?d.is(":hidden")&&d.slideDown():d.is(":visible")&&d.slideUp(),a()}}),$(".calculator.loan-auto").accrue({mode:"compare",response_output_div:".result.auto",response_compare:"Save up to <strong>$%savings%</strong> on <strong>Auto Loans</strong>.",error_text:"$0",callback:function(b,c){var d=$(".result.auto");0!=c.loan_1?d.is(":hidden")&&d.slideDown():d.is(":visible")&&d.slideUp(),a()}}),$(".calculator.loan-personal").accrue({mode:"compare",response_output_div:".result.personal",response_compare:"Save up to <strong>$%savings%</strong> on <strong>Personal Loans</strong>",error_text:"$0",callback:function(b,c){var d=$(".result.personal");0!=c.loan_1?d.is(":hidden")&&d.slideDown():d.is(":visible")&&d.slideUp(),a()}}),$(".numbers-only").keyup(function(){var a=$(this).val().replace(/[^0-9.]/g,"");$(this).val(a)})});var valid_email=function(a){var b=/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;return-1!=String(a).search(b)},contact_submit=function(a){$(a).find("input[type=submit]").attr("disabled","disabled");var b={name:$(a).find("input[name=name]").val(),email:$(a).find("input[name=email]").val(),phone:$(a).find("input[name=phone]").val(),friend_name:$(a).find("input[name='friend-name']").val(),friend_email:$(a).find("input[name='friend-email']").val(),friend_phone:$(a).find("input[name='friend-phone']").val()},c=$.param(b),d=[],e=$(a).find(".error");return b.name.length<2&&d.push("Please provide a name."),b.friend_name.length<2&&d.push("Please provide a friend's name."),valid_email(b.email)||d.push("Please provide a valid email address."),valid_email(b.friend_email)||d.push("Please provide a valid friend's email address."),0==d.length?$.post("send.php",c,function(a){console.log(a),"success"===a?location.href="/thanks.html":e.html("There was a problem submitting the form. Please call us for further assistance.").slideDown(400)}):(e.html(""),$.each(d,function(a,b){0===a?e.append(b):e.append("<br>"+b)}),e.is(":hidden")&&e.slideDown(400),$(a).find("input[type=submit]").removeAttr("disabled")),!1};$(document).ready(function(){$("form#contact").submit(function(a){a.preventDefault(),contact_submit(this)})});