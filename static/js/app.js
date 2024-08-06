var checkDelete = '';
var deleteConfirm = '';

function setCheckDelete(aValue) {
	checkDelete = aValue;
}

function getCheckDelete() {
	return checkDelete;
}

function setDeleteConfirm(aValue) {
	deleteConfirm = aValue;
}

function getDeleteConfirm() {
	return deleteConfirm;
}

function showTextbox(aText, aTitle, aWidth, aHeight) {
	Shadowbox.open({
        content:    '<div style="background-color:white;height:'+(aHeight)+'px" id="'+aTitle+'-msg">'+aText+'</div>',
        player:     "html",
        title:      aTitle,
        height:     aHeight,
        width:      aWidth
    });
}

function showEmailLlistaCorreus(data) {
	var aHeight = 600;
	var aWidth = 600;
	Shadowbox.open({
        content:    '<div style="background-color:white;height:'+(aHeight)+'px">'+data['EMAILS']+'</div>',
        player:     "html",
        title:      '',
        height:     aHeight,
        width:      aWidth
    });
}

function openLlistaCorreus() {
	$.ajax({
		  url: getWebRoot()+"membres/exportEmailsLlistaCorreus",
		  type: "GET",
		  dataType: "json",
		  success: function(data) {showEmailLlistaCorreus(data);}
		});	
}

function openAllCorreus(msg) {
	var res = confirm(msg);
	if(res) {
		$.ajax({
			  url: getWebRoot()+"membres/exportEmails",
			  type: "GET",
			  dataType: "json",
			  success: function(data) {showAllEmail(data);}
			});
	}		
}

function showAllEmail(data) {
	var aHeight = 600;
	var aWidth = 600;
	Shadowbox.open({
        content:    '<div style="background-color:white;height:'+(aHeight)+'px">'+data['EMAILS']+'</div>',
        player:     "html",
        title:      '',
        height:     aHeight,
        width:      aWidth
    });
}

function getMemberByName(src, dest) {
	$.ajax({
		  url: getWebRoot()+"membres/getByNickAjax/"+document.getElementById(src).value,
		  type: "GET",
		  dataType: "json",
		  success: function(data) {fillMember(src, dest, data);}
		});
}

function selectMember(id, nick) {
	document.getElementById('ID_MEMBRE_PRESTEC').value = id;
	document.getElementById('NICK_MEMBRE_PRESTEC').value = nick;
}

function selectMemberPopup() {
	popupCenter(getWebRoot()+"membresCerca", 'cercaMembresPop', 650, 600);
} 

function doPrestec(form) {
	form.action = getWebRoot()+"video/doPrestec";
}

function doRetornar(form) {
	form.action = getWebRoot()+"video/doRetornar";
}

function retallaPopup(dir, id, w, h) {
	popupCenter(getWebRoot() + 'retalla/serve/' + encodeURI(dir) + '/' + id+ '/' + w+ '/' + h, 'retalla', 850, 700);
}

function updateRetallaXapa(imgDir, id) {
	document.getElementById(id).value = imgDir;
}

function videoToPdf(msgSelect) {
	var selected = $('[name=checkSelectionVideo]:checked');
	if(selected.size() < 1) {
		alert(msgSelect);
	}
	else {
		var ids = '';
		selected.each(function (i, l) {
			if(ids == '') {
				ids = l.value;
			}
			else {
				ids = ids + ',' + l.value;
			}
		}
		);
		window.location=getWebRoot() + 'video/getPdf/' + ids; 
	}
}

var REGEXP_TEST_ELEM_NUM_PDF = new RegExp("^[0-9]{1,3}x[0-9]{1,2}[\\s]*(,[\\\s]*[0-9]{1,3}x[0-9]{1,2}[\\\s]*)*$", "i");

function xapaToPdf(msgInvalidFormat) {
	var value = document.getElementById('XAPES_IMPRIMIR_PDF').value;
	if(!REGEXP_TEST_ELEM_NUM_PDF.test(value)) {
		alert(msgInvalidFormat);
	}
	else {
		var ids = '';
		var nums = '';
		var tamany = '';
		var xapes = value.split(',');
		for (xapaTupla in xapes) {
			var valorsXapa = xapes[xapaTupla].toLowerCase().split('x');
			if(ids.length == 0) {
				ids = $.trim(valorsXapa[0]);
			}
			else {
				ids = ids + ',' + $.trim(valorsXapa[0]);
			}
			if(nums.length == 0) {
				nums = $.trim(valorsXapa[1]);
			}
			else {
				nums = nums + ',' + $.trim(valorsXapa[1]);
			}
		}
		var selectValue = $("#XAPES_TAM_IMPRIMIR_PDF").val();
		
		window.location=getWebRoot() + 'xapa/getPdf/' + ids + '/' + nums + '/' +  selectValue; 
	}
}

function puntToPdf(msgInvalidFormat) {
	var value = document.getElementById('PUNTS_IMPRIMIR_PDF').value;
	if(!REGEXP_TEST_ELEM_NUM_PDF.test(value)) {
		alert(msgInvalidFormat);
	}
	else {
		var ids = '';
		var nums = '';
		var tamany = '';
		var xapes = value.split(',');
		for (xapaTupla in xapes) {
			var valorsXapa = xapes[xapaTupla].toLowerCase().split('x');
			if(ids.length == 0) {
				ids = $.trim(valorsXapa[0]);
			}
			else {
				ids = ids + ',' + $.trim(valorsXapa[0]);
			}
			if(nums.length == 0) {
				nums = $.trim(valorsXapa[1]);
			}
			else {
				nums = nums + ',' + $.trim(valorsXapa[1]);
			}
		}
		window.location=getWebRoot() + 'punt/getPdf/' + ids + '/' + nums; 
	}
}

function setActionAndSubmitIfConfirms(action, msg) {
	if(confirm(msg)) {
		var form = document.getElementById('actionForm');
		form.action = action;
		form.submit();
	}
}


function doDelete(id, ctrl) {
	if(!document.getElementById('deleteCheck').checked) {
		alert(getCheckDelete());
	} else {
		var res = confirm(getDeleteConfirm());
		if(res) {
			window.location=getWebRoot() + ctrl + "/doDelete/" + id;
		}
	}
}