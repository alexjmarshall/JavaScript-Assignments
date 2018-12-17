document.addEventListener('DOMContentLoaded', function(){
	let descriptionInput = document.querySelectorAll('.frm-control')[0];
	let typeDDLInput = document.querySelectorAll('.frm-control')[1];
	let currencyInput = document.querySelectorAll('.frm-control')[2];
	let addButton = document.querySelectorAll('.frm-control')[3];
	let transactionTable = document.querySelector('.transactions');
	let errorMessage = document.querySelector('.error');
	let tbodyList = document.querySelector('tbody');
	let totalDebit=parseFloat(0);
	let totalCredit=parseFloat(0);
	let timeoutInterval;
	let debit = document.querySelector('span','.debits');
	let credits = document.querySelector('.total.credits')
	let dollarTX = '$';
	let zeroO = (0).toFixed(2);
	
	debit.removeChild(debit.lastChild);
	credits.removeChild(credits.lastChild);
	debit.appendChild(document.createTextNode(dollarTX));
	debit.appendChild(document.createTextNode(zeroO));
	credits.appendChild(document.createTextNode(dollarTX));
	credits.appendChild(document.createTextNode(zeroO));
	
	addButton.addEventListener('click', function (evt) {
		evt.preventDefault();
		// create required text and elements
		if (currencyInput.value == '')
			currencyInput.value = 0;
		let amount = parseFloat(currencyInput.value);
		let descriptionInputText = document.createTextNode(descriptionInput.value);	
		let typeDDLInputText = document.createTextNode(typeDDLInput.options[typeDDLInput.selectedIndex].text);
		let currencyInputText = document.createTextNode(amount.toFixed(2));
		if (typeDDLInput.selectedIndex == 1 )
			totalDebit += parseFloat(amount.toFixed(2));
		if (typeDDLInput.selectedIndex == 2 )
			totalCredit += parseFloat(amount.toFixed(2));
		//i
		let eDeleteTdI = document.createElement('i');
		//td
		let eDescriptionTd = document.createElement('td');
		let eTypeTd = document.createElement('td');
		let eCurrencyTd = document.createElement('td');
		let eToolsTd = document.createElement('td');
		//tr
		let eRowTr = document.createElement('tr');
		// set appropriate attributes
		eDeleteTdI.setAttribute('class','delete fa fa-trash-o');
		eToolsTd.setAttribute('class','tools');
		eCurrencyTd.setAttribute('class','amount');
		eRowTr.setAttribute('class',typeDDLInput.options[typeDDLInput.selectedIndex].text);
		//error message
		if (typeDDLInput.selectedIndex == 0 || currencyInput.value <= 0 ) {
			errorMessageText = document.createTextNode('Invalid input. Transaction type must be selected and amount must be greater than zero.')
			if (errorMessage.hasChildNodes())
				errorMessage.removeChild(errorMessage.lastChild);
			errorMessage.appendChild(errorMessageText);
		} else {
			//reset form
			if (errorMessage.hasChildNodes())
				errorMessage.removeChild(errorMessage.lastChild);
			descriptionInput.value = '';
			typeDDLInput.selectedIndex = 0;
			currencyInput.value = '';
			// build document fragment
			eDescriptionTd.appendChild(descriptionInputText);
			eTypeTd.appendChild(typeDDLInputText);
			eCurrencyTd.appendChild(document.createTextNode(dollarTX));
			eCurrencyTd.appendChild(currencyInputText);
			eToolsTd.appendChild(eDeleteTdI);
			eRowTr.appendChild(eDescriptionTd);
			eRowTr.appendChild(eTypeTd);
			eRowTr.appendChild(eCurrencyTd);
			eRowTr.appendChild(eToolsTd);
			//transactionTableChildNodeCount++;
			transactionTable.childNodes[3].appendChild(eRowTr);
			//update total
			debit.removeChild(debit.lastChild);
			credits.removeChild(credits.lastChild);		
			let totalDebitTX = Number(totalDebit).toFixed(2);
			let totalCreditTX = Number(totalCredit).toFixed(2);
			debit.appendChild(document.createTextNode(totalDebitTX));
			credits.appendChild(document.createTextNode(totalCreditTX));
		}
	});
	
	tbodyList.addEventListener('click', function (evt) {
		let targetTodo = evt.target.parentNode;
		let targetRow = targetTodo.parentNode;
		let tableList = targetRow.parentNode;
		if (evt.target.classList.contains('delete')) {
			if (confirm("Are you sure you want to delete this transaction?")) {
				let tempValue = Number(targetRow.childNodes[2].lastChild.nodeValue);
				let temptype = targetRow.childNodes[1].firstChild.nodeValue;
				if (temptype == "debit") {
					totalDebit -= tempValue;
					debit.removeChild(debit.lastChild);
					let totalDebitTX = Number(totalDebit).toFixed(2);
					if(totalDebitTX == -0.00)
						totalDebitTX = zeroO;
					debit.appendChild(document.createTextNode(totalDebitTX));
				} else {
					totalCredit -= tempValue;
					credits.removeChild(credits.lastChild);	
					let totalCreditTX = Number(totalCredit).toFixed(2);
					if(totalCreditTX == -0.00)
						totalCreditTX = zeroO;
					credits.appendChild(document.createTextNode(totalCreditTX));
				}
				targetRow.removeChild(targetTodo);
				tableList.removeChild(targetRow);
				}
		}
	});
	
	function reloadTimer() {
		timeoutInterval = setInterval(function() {
			alert('The page has timed out and will now refresh.');
			location.reload();            
		}, 120000);
		function resetTimer() {
			clearInterval(timeoutInterval);
			reloadTimer();			
		}
		onmousemove = resetTimer;
		onkeypress = resetTimer;
	}
	reloadTimer();
})