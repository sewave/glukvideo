var WEB_ROOT = '';
var calendarDateFormat = '';

function showCalendar(id, buttonId) {
	Calendar.setup({
		inputField           : id,
		weekNumbers   : false,
		trigger : buttonId,
		onSelect   : function() { this.hide() },
		dateFormat : getCalendarDateFormat()
	});
}


function setWebRoot(value) {
	WEB_ROOT = value;
}

function getWebRoot(){
	return WEB_ROOT;
}

function setCalendarDateFormat(aValue) {
	calendarDateFormat = aValue;
}

function getCalendarDateFormat() {
	return calendarDateFormat;
}


function clearForm(oForm) {
	var elements = oForm.elements;
	oForm.reset();
	for (i = 0; i < elements.length; i++) {
		field_type = elements[i].type.toLowerCase();
		switch (field_type) {
		case "text":
		case "password":
		case "textarea":
		case "hidden":
			elements[i].value = "";
			break;
		case "radio":
		case "checkbox":
			if (elements[i].checked) {
				elements[i].checked = false;
			}
			break;
		case "select-one":
		case "select-multi":
			elements[i].selectedIndex = 0;
			break;
		default:
			break;
		}
	}
}

function popupCenter(pageURL, title, w, h) {
	var left = (screen.width / 2) - (w / 2);
	var top = (screen.height / 2) - (h / 2);
	var targetWin = window
			.open(
					pageURL,
					title,
					'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width='
							+ w
							+ ', height='
							+ h
							+ ', top='
							+ top
							+ ', left='
							+ left);
}