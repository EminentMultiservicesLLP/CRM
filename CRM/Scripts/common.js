var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;	
var monthCollection = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var colorsCollection = ["#7FFFD4", "#FFE4C4", "#000000", "#FFEBCD", "#0000FF", "#8A2BE2", "#A52A2A", "#DEB887", "#5F9EA0", "#7FFF00", "#D2691E", "#FF7F50", "#6495ED", "#FFF8DC", "#DC143C", "#00FFFF",
    "#00008B", "#008B8B", "#B8860B", "#A9A9A9", "#A9A9A9", "#006400", "#BDB76B", "#8B008B", "#556B2F", "#FF8C00", "#9932CC", "#8B0000", "#EEE8AA", "#98FB98", "#AFEEEE", "#DB7093", "#FFEFD5",
    "#FFDAB9", "#CD853F", "#FFC0CB", "#DDA0DD", "#B0E0E6", "#800080", "#663399", "#FF0000", "#BC8F8F", "#4169E1", "#8B4513", "#FA8072", "#F4A460", "#2E8B57", "#FFF5EE", "#A0522D", "#C0C0C0",
    "#87CEEB", "#6A5ACD", "#708090", "#708090", "#FFFAFA", "#00FF7F", "#4682B4", "#D2B48C", "#008080", "#D8BFD8", "#FF6347", "#40E0D0", "#EE82EE", "#F5DEB3", "#FFFFFF", "#F5F5F5", "#FFFF00"];

var chartColorCollection = ['rgb(255, 99, 132)', 'rgb(153, 102, 255)', '#FFA500', '#acc236', 'rgb(54, 162, 235)', '#808080', "#A52A2A", "#8B008B", '#008000', '#DEB887', '#f67019', 'rgb(255, 159, 64)', '#4dc9f6', 'rgb(210,105,30)', 'rgb(153, 102, 255)', '#166a8f', '#00a950', '#58595b', '#8549ba'];

function getMin(array) {
    return Math.min.apply(Math, array);
}

function getMax(array) {
    return Math.max.apply(Math, array);
}

function getMaxJson(arr, prop) {
    var max;
    for (var i = 0; i < arr.length; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

function DisableClick(buttonName) {
    var btn = "#" + buttonName;
    $(btn).attr('disabled', true);
    var t = setTimeout(function () { $(btn).attr('disabled', false); }, 2000);
}

function monthTotalDays(year, month) { return new Date(year, month, 0).getDate(); }
function monthWorkDays(year, month) {
    let days = new Array(new Date(year, month, 0).getDate())
    let tdays = 0;
    $.each(days, function (index, value) {
        if ([0, 5, 6].indexOf(
            new Date(year, month - 1, index + 1).getDay()
        ) === -1)

            tdays += 1;
    });
    return tdays;
}

function monthWeekEndsDays(year, month) { return (monthTotalDays(year, month) - monthWorkDays(year, month)); }
function yearWorkDays(year) {
    return new Array(12)
        .fill(1)
        .reduce((pv, cv, index) => pv + monthWorkDays(year, index), 0);
}


function EnableClicked(button) {
    $(button).attr('disabled', false);
}

function ServerJsonDateFormat(jsonDate) {
    var regex = /-?\d+/;
    var newDate = regex.exec(jsonDate);
    var dateOriginal = new Date(parseInt(newDate[0]));

    return dateOriginal;
}
function JsonDateToDate(value) { //To Parse Date from the Returned Parsed Date
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    return new Date(parseFloat(results[1]));
}
function Date_ddMMMYYYY(date) {
    formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
}

function JsonDateToString(value) { //To Parse Date from the Returned Parsed Date
    var dt = JsonDateToDate(value);
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
}

function JsonDateToDDMYYYY(value) { //To Parse Date from the Returned Parsed Date
    var dt = JsonDateToDate(value);
    return dt.getDate() + "-" + GetMonthName((dt.getMonth() + 1)) + "-" + dt.getFullYear();
}


function GetMonthName(monthNumber) {
    return monthCollection[monthNumber - 1];
}

function GetQuarterName(qtrNumber) {
    var qtr = ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'];
    return qtr[qtrNumber - 1];
}


function ClearModalControl(elementName, isClass) {
    var eltname = (isClass == true ? "." : "#") + elementName;
    var allInputs = $(eltname).find(':input');
    if (allInputs != null && allInputs.length > 0) {
        allInputs.each(function (index, obj) {
            if (obj.type === "text" || obj.type === "number" || obj.type === "textarea" || obj.type === "hidden" || obj.type === "month")
                obj.value = "";
            else if (obj.type === "select-one" || obj.type === "select")
                $(obj).find('option:first').prop('selected', 'selected').trigger("change");
            else if (obj.type === "checkbox")
                obj.check = false;
        });
    }

    var allGrid = $(eltname).find('.pq-grid');
    if (allGrid != null && allGrid.length > 0) {
        allGrid.each(function (index, obj) {
            ClearParamGrid(obj.id);
        });
    }

}

function SetScrollPosition(controlID) {
    $('html, body').animate({
        scrollTop: ($("#" + controlID).offset().top - 50)
    }, 2000);
}
function enforce_maxlength(event) {
    var t = event.target;
    if (t.type === "number" || t.type === "text") {
        if (t.hasAttribute('allowNegative'))
            return true;

        if (t.hasAttribute('maxlength')) {
            t.value = t.value.slice(0, t.getAttribute('maxlength'));
        }
        if (t.hasAttribute('min')) {
            var minVal = t.getAttribute('min');
            if (parseInt(t.value) < parseInt(minVal)) {
                t.value = minVal;
                return false;
            }
        }
        if (t.hasAttribute('max')) {
            var maxVal = t.getAttribute('max');
            if (parseInt(t.value) > parseInt(maxVal)) {
                t.value = maxVal;
                return false;
            }
        }
    }
}

// Global Listener for anything with an maxlength attribute.
// I put the listener on the body, put it on whatever.
document.body.addEventListener('input', enforce_maxlength);

function ClearAllControl(elementName, isclass) {
    var eltname = (isclass == true ? "." : "#") + elementName;
    //var eltname =  "#" + elementName;
    var allInputs = $(eltname).find(':input');
    if (allInputs != null && allInputs.length > 0) {
        allInputs.each(function (index, obj) {
            if (obj.type === "text" || obj.type === "number" || obj.type === "textarea" || obj.type === "hidden" || obj.type === "month")
                obj.value = "";
            else if (obj.type === "select-one" || obj.type === "select") {
                $(obj).find('option:first').prop('selected', 'selected').trigger("change");
            }
            //else if (obj.type === "month")
            //    obj.val('');
            else if (obj.type === "checkbox")
                obj.checked = false;
        });
    }

    var allGrid = $(eltname).find('.pq-grid');
    if (allGrid != null && allGrid.length > 0) {
        allGrid.each(function (index, obj) {
            ClearParamGrid(obj.id);
        });
    }

}

function ClearAllControlSkip(elementName, skiplist) {
    if (skiplist.length > 0) {
        var eltname = "#" + elementName;

        var allTextInputs = $(eltname).find(':input');
        if (allTextInputs != null && allTextInputs.length > 0) {
            allTextInputs.each(function (index, obj) {
                if (jQuery.inArray(obj.id, skiplist) === -1) {
                    if (obj.type === "text" ||
                        obj.type === "number" ||
                        obj.type === "textarea" || obj.type === "hidden" || obj.type === "month")
                        obj.value = "";
                    else if (obj.type === "select-one" || obj.type === "select")
                        $(obj).find('option:first').prop('selected', 'selected').trigger("change");
                    else if (obj.type === "checkbox")
                        obj.check = false;
                }
            });
        }

        var allGrid = $(eltname).find('.pq-grid');
        if (allGrid != null && allGrid.length > 0) {
            allGrid.each(function (index, obj) {
                if (jQuery.inArray(obj.id, skiplist) === -1)
                    ClearParamGrid(obj.id);
            });
        }
    }

}

function restrictSpecialChar(code, name) {
    if (/^[a-zA-Z0-9- ]*$/.test(code, name) === false)
        ShowAlert("warning", "Charecter not allowed !!");
}


function isNullOrWhitespace(input) {
    if ((jQuery.trim(input)).length === 0) {
        ShowAlert("warning", "Standard Name is missing !!");
        return true;
    }
    else
        return false;
}

function showAlertOnBlank(input, alertMessage) {
    if (typeof input === "object") {
        input = input.val();
    }

    if (input !== undefined && jQuery.trim(input).length === 0) {
        ShowAlert("warning", alertMessage);
        return false;
    }
    else
        return true;
}

AddAntiForgeryToken = function (data) {
    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    return data;
};

function ajaxCall(url, headers, params, type, ajxSuccessFn, ajxFailFn, showLoading, loadingSectionIds, timeOut) {
    timeOut = timeOut === "" || timeOut === "undefined" || timeOut === null ? 6000 : timeOut;
    type = type.toUpperCase() !== "GET" && type.toUpperCase() !== "POST" && type.toUpperCase() !== "PUT" && type.toUpperCase() !== "DELETE" ? "POST" : type;
    $.ajax({
        headers: headers,
        type: type.toUpperCase(),
        contentType: 'application/json;charset=utf-8"',
        cache: false,
        url: url,
        data: params,
        beforeSend: function () {
            if (showLoading) {
                ShowLoading(loadingSectionIds);
            }
        },
        success: function (result) {
            if (result.success == true) {
                if (typeof ajxSuccessFn === 'function') {
                    var successFn = partial(ajxSuccessFn, result);
                    successFn();
                }
            }
            else if (result.success == false) {
                if (typeof ajxFailFn === 'function') {
                    var errorFn = partial(ajxFailFn, result);
                    errorFn();
                }
            }
            else {
                if (typeof ajxSuccessFn === 'function') {
                    var successFn = partial(ajxSuccessFn, result);
                    successFn();
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (typeof ajxFailFn === 'function') {
                var errorFn = partial(ajxFailFn, xhr, thrownError);
                errorFn();
            }
        },
        timeout: timeOut
    }).always(function (xhr, status) {
        if (showLoading) {
            HideLoading(loadingSectionIds);
        }
    });
}

function partial(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    return function () {
        var new_args = Array.prototype.slice.call(arguments);
        args = args.concat(new_args);
        return fn.apply(window, args);
    };
}
$p = partial;


function price_to_number(v) {
    if (!v) { return 0; }
    v = v.split(',').join('');
    return Number(v.replace(/[^0-9.]/g, ""));
}

function number_to_price(v) {
    if (v == 0) { return '0,00'; }
    v = parseFloat(v);
    v = v.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    //v = v.split('.').join('*').split(',').join('.').split('*').join(',');
    return v;
}

function isInteger(n) {
    return ((typeof n === 'number') && (n % 1 === 0));
}

function isFloat(n) {
    return ((typeof n === 'number') && (n % 1 !== 0));
}

function isNumber(n) {
    return (typeof n === 'number');
}

function ShowAlert(type, message) {
    //type = 'warning', 'info', 'success', 'error';
    Lobibox.alert(type,
        {
            msg: message
        });
}

function ConfirmMessage(message) {
    var lobibox = Lobibox.confirm({
        msg: message
    });

    return lobibox;
}

function ShowProgress(title, message) {
    Lobibox.progress({
        title: title,
        label: message,
        onShow: function ($this) {
            var i = 0;
            var inter = setInterval(function () {
                if (i > 100) {
                    inter = clearInterval(inter);
                }
                i = i + 0.1;
                $this.setProgress(i);
            }, 10);
        }
    });
}

//type = 'warning', 'info', 'success', 'error';
function Notify(title, type, message) {
    Lobibox.notify(type, {
        title: title,
        msg: message,
        sound: false,
        delay: false,
    });
}

function Notify(title, type, message, delay) {
    Lobibox.notify(type, {
        title: title,
        msg: message,
        sound: false,
        delay: delay,
    });
}


function DrawPieChart(data, options, chartDivSection) {
    var chart = new google.visualization.PieChart(document.getElementById(chartDivSection));
    chart.draw(data, options);
}

function DrawBarChart(data, options, chartDivSection) {
    var chart = new google.charts.Bar(document.getElementById(chartDivSection));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function SelectDropdownByText(controlID, searchString, waitTimeSpan = 0) {
    setTimeout(function () {
        $("#" + controlID).find("option:contains('" + searchString + "')").each(function () {
            if ($(this).text() == searchString) {
                $(this).prop("selected", "selected").trigger("change");
            }
        });
    }, waitTimeSpan);
}

function SelectDropdownByValue(controlID, searchString) {
    setTimeout(function () {
        $("#" + controlID).find("option:contains('" + searchString + "')").each(function () {
            if ($(this).val() == searchString) {
                $(this).prop("selected", "selected").trigger("change");
            }
        });
    }, waitTimeSpan);

    
}

function LoadDropDownData(controlID,data,dValue,dText ){           
    var id = "#"+controlID 
    var option = id+" option"; 
    $(option).remove();
    $(id ).append($("<option></option>").val(0).html("--Select--"));
    $.each(data, function (key, value) {  
        $(id).append($("<option></option>").val(value[dValue]).html(value[dText]));
    });        
} 

function ShowLoading(divIDs) {
    if (divIDs != undefined && divIDs.length > 0) {
        $.each(divIDs, function (index, value) {
            var tempNewObject = value + '_loadingDiv';
            $('#' + value).append('<div id="' + tempNewObject + '" class="loadingDiv"><div class="loader">Loading...</div></div>');
        });
    }
}
function HideLoading(divIDs) {
    if (divIDs != undefined && divIDs.length > 0) {
        $.each(divIDs, function (index, value) {
            $("#" + value + "_loadingDiv").remove();
        });
    }
}
function ajaxCallFailed(response, customMessage) {
    if (customMessage === undefined || customMessage.length === 0) customMessage = response;
    ShowAlert('error', customMessage + "<br />please contact your system administrator for assistance regarding this error");
}

var gridDefaultOptions = [];
gridDefaultOptions = {
    height: 400,
    width: 'auto',
    maxWidth: '100%',
    minWidth: 800,
    sortable: true,
    autofill: true,
    numberCell: { show: true },
    hoverMode: 'row',
    showTop: true,
    showTitle: true,
    showBottom: true,
    resizable: true,
    scrollModel: { autoFit: true },
    filterModel: { on: true, mode: "AND", header: true },
    draggable: false,
    hwrap: false,
    wrap: false,
    editable: true,
    columnBorders: true,
    menuIcon: true,
    selectionModel: { type: 'row', mode: 'single', cbHeader: false },
    pageModel: { type: "local" },
}

/*** PQ Grid Related *********/
function IsNullOrUndefined(object) {
    if (typeof (object) !== "undefined" && object)
        return false;
    else
        return true;
}

function ClearParamGrid(gridName) {
    var gr = $("#" + gridName);
    if (gr != undefined) {
        gr.pqGrid("option", "dataModel.data", []);
        gr.pqGrid("refresh");
        gr.pqGrid("refreshDataAndView");
    }
}
function ClearParamGridByObject(grid) {
    if (grid != null && grid != undefined) {
        grid.pqGrid("option", "dataModel.data", []);
        grid.pqGrid("refreshDataAndView");
    }
}

function ClosePopupWindow(WindowName) {
    var popupWindow = $("#" + WindowName);
    if (popupWindow != undefined && popupWindow != null)
        popupWindow.dialog('close');
}


function RefreshGridAfterResize(elementName, isClass) {
    var eltname = "";
    if (isClass) eltname = "." + elementName;
    else eltname = "#" + elementName;
    var allGrid = $(eltname).find('.pq-grid');
    if (allGrid != null && allGrid.length > 0) {
        allGrid.each(function (index, obj) {
            var gr = $("#" + obj.id);
            if (gr != undefined) {
                gr.pqGrid('refresh');
            }
        });
    }
}

function CollapsePqGrid(grid) {
    $(".pq-slider-icon .ui-icon-circle-triangle-n", grid).click();
}
function ExpandPqGrid(grid) {
    $(".pq-slider-icon .ui-icon-circle-triangle-s", grid).click();
}
function PqGridRefreshClick(grid) {
    $(".pq-grid-footer .ui-icon-refresh", grid).click();
}
function TogglePqGridFullSize(grid) {
    $(".pq-slider-icon .ui-icon", grid).click();
}
function ToggleGroupPqGrid(elementName) {
    var ss = $("div[data-indx='" + elementName + "']").find(".pq-group-toggle");
    ss.click();
}
function RemoveGroupPqGrid(elementName) {
    var ss = $("div[data-indx='" + elementName + "']").find(".pq-group-remove");
    ss.click();

}



function PqGridLoadData(gridName, data) {
    var grid = $("#" + gridName).pqGrid('getInstance').grid;
    grid.option("dataModel.data", data);
    grid.refreshDataAndView();
}

function PqGridLoadData(gridName, data, loadOption) {
    var grid = $("#" + gridName).pqGrid('getInstance').grid;
    grid.option("dataModel.data", data);
    grid.refreshDataAndView();

    if (typeof loadOption === 'function') {
        loadOption(grid);
    }
}

function pqGridStringFilter_Contain() {
    return { type: "textbox", condition: 'contain', listener: 'keyup' };
}
function pqGridStringFilter_Begin() {
    return { type: "textbox", condition: 'begin', listener: 'keyup' };
}
function pqGridNumberFilter_Between() {
    return { type: "textbox", condition: 'between', listener: 'keyup' };
}
function pqGridcommentRender(ui) {
     
    if (this.attr({ rowIndx: ui.rowIndx, dataIndx: ui.dataIndx, attr: 'title' }).attr) {
        if (ui.column.align == 'right') {
            return { cls: 'pq-comment pq-comment-left' };
        }
        else {
            return { cls: 'pq-comment' };
        }
    }
}

//var pqGridStringFilter_Begin = { type: "textbox", condition: 'begin', listener: 'keyup' };
//var pqGridStringFilter_Contain = { type: 'textbox', condition: 'contain', listener: 'keyup' };
//var pqGridNumberFilter_Between = { type: 'textbox', condition: "between", listener: 'keyup' };

var gridDateTimeEditor = function (ui) {
    var $cell = ui.$cell,
        rowData = ui.rowData,
        dataIndx = ui.dataIndx,
        cls = ui.cls,
        dc = $.trim(rowData[dataIndx]);
    $cell.css('padding', '0');
    var $inp = $("<input type='text' id='" +
        dataIndx +
        "' name='" +
        dataIndx +
        "' class='" +
        cls +
        "' style='position: relative; z-index: 100;border: 3px solid rgba(0,0,0,0);'/>")
        .appendTo($cell)
        .val(dc)
        .datetimepicker({
            format: 'dd-M-yyyy'


        });
    window.setTimeout(function () {
        var dc = $.trim(ui.column.render(ui));
        $inp.val(dc);
    },
        0);
};

function pqDatePicker(ui) {
    var $this = ui.$editor;
    $this
        //.css({ zIndex: 3, position: "relative" })
        .datepicker({
            yearRange: "-25:+0", //25 years prior to present.
            changeYear: true,
            changeMonth: true,
            "format": "dd-M-yyyy",
            //showButtonPanel: true,
            onClose: function (evt, ui) {
                $(this).focus();
            }
        });
    //default From date
    $this.filter(".pq-from").datepicker("option", "defaultDate", new Date("01/01/1996"));
    //default To date
    $this.filter(".pq-to").datepicker("option", "defaultDate", new Date("12/31/1998"));
}


function convertToNumberingScheme(number) {
    var baseChar = ("A").charCodeAt(0),
        letters = "";
    do {
        number -= 1;
        letters = String.fromCharCode(baseChar + (number % 26)) + letters;
        number = (number / 26) >> 0; // quick `floor`
    } while (number > 0);

    return letters;
}

function ChangeDataUrl(url) {
    var grid = $("#BudgetSearchgrid_col").pqGrid('getInstance').grid;
    grid.option("dataModel.url", url);
    grid.refreshDataAndView();
};
/***********************************************************/

(function (window) {
    'use strict';
    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    window.classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

})(window);

jQuery.fn.serializeObject = function () {
    var arrayData, objectData;
    arrayData = this.serializeArray();
    objectData = {};

    $.each(arrayData, function () {
        var value;

        if (this.value != null) {
            value = this.value;
        } else {
            value = '';
        }

        if (objectData[this.name] != null) {
            if (!objectData[this.name].push) {
                objectData[this.name] = [objectData[this.name]];
            }

            objectData[this.name].push(value);
        } else {
            objectData[this.name] = value;
        }
    });

    return objectData;
};

$.fn.serializeControls = function () {
    var data = {};

    function buildInputObject(arr, val) {
        if (arr.length < 1)
            return val;
        var objkey = arr[0];
        if (objkey.slice(-1) == "]") {
            objkey = objkey.slice(0, -1);
        }
        var result = {};
        if (arr.length == 1) {
            result[objkey] = val;
        } else {
            arr.shift();
            var nestedVal = buildInputObject(arr, val);
            result[objkey] = nestedVal;
        }
        return result;
    }

    $.each(this.serializeArray(), function () {
        var val = this.value;
        var c = this.name.split("[");
        var a = buildInputObject(c, val);
        $.extend(true, data, a);
    });

    return data;
}


$.fn.SetControlsValueFromJson = function (jsonData) {
    $.each(this.serializeArray(), function () {
        var val = this.value;
        if (jsonData.hasOwnProperty(this.name)) val = jsonData[this.name];
        var c = this.name.split("[");
        if (c.length === 1) {
            if (String(val).indexOf("/Date") != -1) $('input[name="' + this.name + '"]').val(JsonDateToDDMYYYY(val));
            else {
                var control = $('[name*="' + this.name + '"]');
                if (control != undefined && (control[0].type === "select" || control[0].type === "select-one"))
                    $('select[name*="' + this.name + '"]').val(val).trigger("change");
                else $('input[name*="' + this.name + '"]').val(val);
            }
          
        }
    });
}

function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function JsonToTable(jsonData, showBorder, showIndexColumn) {
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    if (showBorder) table.className = "mb-0 table table-bordered";

    // EXTRACT VALUE FOR HTML HEADER. 
    var col = [];
    //for (var i = 0; i < jsonData.length; i++) {
    //    for (var key in jsonData[i]) {
    //        if (col.indexOf(key) === -1) {
    //            col.push(key);
    //        }
    //    }
    //}

    if (showIndexColumn) col.push("#");
    $.each(jsonData, function (index, value) {
        for (var key in value) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    });

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    var count = 1; var colStartPos = 0;
    if (showIndexColumn) colStartPos = 1;
    for (var i = 0; i < jsonData.length; i++) {
        tr = table.insertRow(-1);

        if (showIndexColumn) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = count;
        }

        for (var j = colStartPos; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonData[i][col[j]];
            count++;
        }

    }

    return table;
}

function getRandomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function ChartBackgroundColorDataset(dataFieldCollection, multistack = false) {
    var dataset = [];
    var color = Chart.helpers.color;
    if (multistack) {
        var j = 0;
        $.each(dataFieldCollection, function (val, datafield) {
            $.each(datafield, function (i, fieldName) {
                var colorCode = chartColorCollection[j];
                dataset.push({
                    label: fieldName,
                    stack : val,
                    backgroundColor: color(colorCode).alpha(0.7).rgbString(),
                    borderColor: colorCode,
                    borderWidth: 1,
                    data: []
                });
                j = j + 1;
            })
        });
    }
    else {
        $.each(dataFieldCollection, function (i, val) {
            var colorCode = chartColorCollection[i];
            dataset.push({
                label: val,
                backgroundColor: color(colorCode).alpha(0.7).rgbString(),
                borderColor: colorCode,
                borderWidth: 1,
                data: []
            });
        })
    }

    return dataset;
}
function ChartDataSetCreation(dataset, data, legendFieldName) {
    var legends = [];
    if (data != undefined && data.length > 0) {
        $.each(dataset, function (i, set) {
            for (var j = 0; j < data.length; j++) {
                if (jQuery.inArray(data[j][legendFieldName], legends) === -1) legends.push(data[j][legendFieldName]);
                set.data.push(data[j][set.label])
            }
        });
    }
    return { chartDataset: dataset, chartLegends: legends };
}
function BarChartOptions(title) {
    return {
        title: {
            display: ((title !== undefined && title.length > 0) ? true : false),
            text: title
        },
        tooltips: {
            mode: 'index',
            intersect: false
        },
        
        maintainAspectRatio: false,
        responsive: true
    };
}

function JsonDatToLineChartDataSet(jsonData, dataFieldCollection, title, multistack = false) {
    var dataset = [];
    dataset = ChartBackgroundColorDataset(dataFieldCollection, multistack);
    var ChartData = ChartDataSetCreation(dataset, jsonData);

    return {
        chartLegends: ChartData.chartLegends, chartDataSet: ChartData.chartDataset,
        options: BarChartOptions(title)
    }
}
function JsonDatToStackChartDataSet(jsonData, dataFieldCollection, legendFieldName, title, multistack = false) {
    var dataset = [];
    dataset = ChartBackgroundColorDataset(dataFieldCollection, multistack);
    var ChartData = ChartDataSetCreation(dataset, jsonData, legendFieldName);

    return {
        chartLegends: ChartData.chartLegends, chartDataSet: ChartData.chartDataset,
        options: BarChartOptions(title)
    }
}

function JsonDataToDoughnutChartDataSet(jsonData, title, multistack = false){
    var dataset =[] , legends = [];
    var color = Chart.helpers.color;
    var doughnutData = []; var doughnutLabels = []; var doughnutBackgroundColor =[];    
    if (jsonData != undefined && jsonData.length > 0) {
        $.each(jsonData, function (i, set) { 
            var colorCode = chartColorCollection[i];
            doughnutData.push(jsonData[i].value);
            doughnutLabels.push(jsonData[i].label);
            doughnutBackgroundColor.push(color(colorCode).alpha(0.7).rgbString());            
        })
    }

    dataset.push ({
        data:doughnutData,
        backgroundColor:doughnutBackgroundColor
    });

    return {
        chartDataSet: dataset,labels :doughnutLabels,
        options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
         }
    }

}

//Chart.defaults.global.defaultFontFamily = 'Verdhana';
//Chart.defaults.global.defaultFontSize="11"; 
//Chart.plugins.unregister(ChartDataLabels);
//Chart.Chart.pluginService.register({
//    beforeDraw: function (chart) {
//        if (chart.config.centerText && chart.config.centerText.display !== null &&
//            typeof chart.config.centerText.display !== 'undefined' &&
//            chart.config.centerText.display) {
//            drawCenterText(chart, chart.config.centerText.fontColor, chart.config.centerText.isHalfPie);
//        }
//    },
//    //afterDraw: function (chart) {
//    //     
//    //    if (chart.data.datasets.length === 0) {
//    //        var ctx = chart.chart.ctx;
//    //        var width = chart.chart.width;
//    //        var height = chart.chart.height
//    //        chart.clear();

//    //        ctx.save();
//    //        ctx.textAlign = 'center';
//    //        ctx.textBaseline = 'middle';
//    //        ctx.font = "20px";
//    //        if (chart.options != undefined && chart.options.title != undefined && chart.options.title.text != undefined) ctx.fillText(chart.options.title.text, width / 2, 18);
//    //        ctx.fillText('No data to display', width / 2, height / 2);
//    //        ctx.restore();
//    //    }
//    //}
//});
function drawCenterText(chart, textcolor, isHalfPie) {
    var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

    ctx.restore();
    //var fontSize = (height / 125).toFixed(2);
    //ctx.font = fontSize + "em sans-serif";
    ctx.font = "22px sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillStyle = textcolor;

    var text = chart.config.centerText.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2 + (isHalfPie?50 :20);

    ctx.fillText(text, textX, textY);
    ctx.save();
}

function ValidateInputControl_Require(mainControlId, isClass) {
     
    var isPassed = true; var message = "";
    var eltname = (isClass == true ? "." : "#") + mainControlId;
    var allInputs = $(eltname).find(':input.required');
    if (allInputs != null && allInputs.length > 0) {
        allInputs.each(function (index, obj) {
            if (obj.type === "text" || obj.type === "number" || obj.type === "select-one" || obj.type === "select" || obj.type === "textarea" || obj.type === "checkbox") {
                var input = $(this);
                var is_val = input.val();
                if ((obj.type === "select-one" || obj.type === "select") & is_val === "0") is_val = null 

                if (is_val) { input.removeClass("invalid").addClass("valid"); }
                else {
                    input.removeClass("valid");
                    input.addClass("invalid");
                    isPassed = false;
                    if (input.attr("failMsg") === undefined || input.attr("failMsg").length === 0) {
                        if (message.toLowerCase().indexOf("required field missing value") < 0) message = message + " required field missing value (highlighted in red) <br />";
                    }
                    else message = message + input.attr("failMsg") + "<br />";
                }
            }
        });
    }

    return { passsed: isPassed, messsage: message };
}

function PrintElem(elem, title) {

    var print = 'div.' + elem;
    var headElements = '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>';
    var options = {
        popTitle: title, mode: "iframe", popClose: true, extraCssTags: "@page { size: landscape; size: 25cm 35.7cm; margin: 15mm 5mm 5mm 5mm; } body{zoom:80%;}", retainAttr: ['class', 'id', 'style','on'], extraHead: headElements };
    $(print).printArea(options);
    

    //Option 2

    //var divToPrint = $("#DSREntryForm").html;
    ////var divToPrint = $(vsr).html;
    //newWin = window.open('', '', 'height=625,width=1025');
    //newWin.document.write('<html><head><title></title>');
    //newWin.document.write("<link href=\"../../Content/bootstrap.min.css\" rel=\"stylesheet\"><link href=\"../../Content/sb-admin-2.css\" rel=\"stylesheet\"><link href=\"../../Content/Site.css\" rel=\"stylesheet\">")
    //newWin.document.write('</head><body >');
    //newWin.document.write(divToPrint);
    //newWin.print();
    //newWin.close();

    //Option 3
    //var el = $("#" + elem);
    //var width = $(el).outerWidth();
    //var height = $(el).outerHeight();
    //let mywindow = window.open('', 'PRINT', 'height=650,width=1200,top=100,left=150');

    //mywindow.document.write('<html><head><title></title>');
    //mywindow.document.write('</head><body >');
    //mywindow.document.write(document.getElementById(elem).innerHTML);
    //mywindow.document.write('</body></html>');

    //mywindow.document.close(); // necessary for IE >= 10
    //mywindow.focus(); // necessary for IE >= 10*/

    //mywindow.print();
    //mywindow.close();

    //return true;
    
    //Option 4
    //var el = $("#" + elem);
    //var width = $(el).outerWidth();
    //var height = $(el).outerHeight();
    //var mywindow = window.open('', 'PRINT', 'height='+ height +',width='+width);
    ////var mywindow = window.open('', 'PRINT', 'height=650,width=1200');

    //mywindow.document.write('<html><head><title>DDDDDDDDDDD</title>');
    //mywindow.document.write("<style rel='stylesheet'> body{zoom:80%} </style>")
    //mywindow.document.write('</head><body >');
    //mywindow.document.write(document.getElementById(elem).innerHTML);
    //mywindow.document.write('</body></html>');

    //mywindow.document.close(); // necessary for IE >= 10
    //mywindow.focus(); // necessary for IE >= 10*/


    //setTimeout(function () {
    //    mywindow.print();
    //    mywindow.close();
    //}, 1000);
    //return true;
}

function goFullScreen(elmentID) {

    var elem = document.getElementById(elmentID);

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    }
    else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function exitFullScreen() {

    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }

}

function printDiv(elment) {
    var divContents = document.getElementById(elment).innerHTML;
    var a = window.open('', '', 'height=500, width=500');
    a.document.write('<html>');
    a.document.write('<body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
} 

function PrintElem_PDF(elem, title, fileName) {
    alert();
    var doc = new jsPDF();
    doc.fromHTML('<html><head><title>' + title + '</title></head><body>' + document.getElementById(elem).innerHTML + '</body></html>');
    doc.save(fileName + '.pdf');
}