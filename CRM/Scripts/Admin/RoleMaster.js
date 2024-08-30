var tempMenuId = 0;
var ChildMenuSelections = [];
var tempRoleId = 0;
$(document).ready(function () {
    GetAllRoles();
    GetAllParentMenu();
});
//*************************************************Role Details GRid********************************************************// 
var RoleGridDATA = { location: "local" };
var RoleGridCOL = [
    {
        title: "Role", dataIndx: "RoleName", dataType: "string", width: '100%', editable: false,
        filter: { type: 'textbox', condition: 'contain', listeners: ['keyup'] }
    }
];

var setRoleGrid = {
    width: 'auto',
    height: 250,
    sortable: false,
    numberCell: { show: true },
    hoverMode: 'cell',
    showTop: true,
    resizable: true,
    scrollModel: { autoFit: true },
    draggable: false,
    wrap: false,
    editable: false,
    filterModel: { on: true, mode: "AND", header: true },
    selectionModel: { type: 'row', subtype: 'incr', cbHeader: true, cbAll: true },
    colModel: RoleGridCOL,
    dataModel: RoleGridDATA,
    rowClick: function (evt, ui) {
        if (ui.rowData) {
            var data = ui.rowData;
            ClearFormData();
            tempRoleId = data.RoleId;
            $("#roleName").val(data.RoleName);
            LoadMenuAccessforRole(tempRoleId)
        }
    }
}

var $RoleDetailsGrid = $("#RoleDetailsGrid").pqGrid(setRoleGrid);

//*****************************************Role Details GRid Ends***********************************************// 

/*********************************************************** Grid Parent Section **********************************************************/
var colParentGrid = [
    //{
    //    //custom title.    
    //    title: "",
    //    dataIndx: "Status",
    //    maxWidth: 25,
    //    minWidth: 25,
    //    menuIcon: false,
    //    //type: 'checkBoxSelection', cls: 'ui-state-default', sortable: false, editor: false,
    //    //dataType: 'bool',
    //    //cb: {
    //    //    all: false, //header checkbox to affect checkboxes on all pages.
    //    //    header: true //for header checkbox.

    //    //},
    //},
    {
        title: "Menu Name", dataIndx: "MenuName", dataType: "string", width: 80, editable: false,

    },
]

var ParentMenugridOptions = gridDefaultOptions
ParentMenugridOptions.height = 300;
ParentMenugridOptions.showTop = false;
ParentMenugridOptions.showBottom = false;
ParentMenugridOptions.title = 'Menu';
ParentMenugridOptions.colModel = colParentGrid;
ParentMenugridOptions.rowClick = function (evt, ui) {
    if (ui.rowData) {
        var data = ui.rowData;
        tempMenuId = data.MenuId;
        GetAllChildMenu();
    }
}

ParentMenugridOptions.dataModel = { location: 'local', sorting: "local", };

$("#ParentMenuGrid").pqGrid(ParentMenugridOptions);
/**** Grid Section End here *****/

/** Get All Roles & Display *****/
function GetAllRoles() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();//{ "__RequestVerificationToken": antiForgeryToken },
    ajaxCall("/Admin/Admin/GetRole", { "__RequestVerificationToken": antiForgeryToken }, {}, "GET", LoadRoles, function (response) { ajaxCallFailed(response); }, true, ["RoleDetailsGrid"]);
}

function LoadRoles(response) {
    if (response.success == true) {
        $("#RoleDetailsGrid").pqGrid("hideLoading");
        $("#RoleDetailsGrid").pqGrid("option", "dataModel.data", response.data);
        $("#RoleDetailsGrid").pqGrid("refreshDataAndView");
    }
}

/*************************************************** End *****************************************************/

/**** All Parent Menu ****/
function GetAllParentMenu() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();//{ "__RequestVerificationToken": antiForgeryToken },
    ajaxCall("/Admin/Admin/GetParentMenu", { "__RequestVerificationToken": antiForgeryToken }, {}, "GET", LoadParentMenu, function (response) { ajaxCallFailed(response, response.message); }, true, ["ParentMenuGrid"]);
}
function LoadParentMenu(response) {
    if (response.length > 0) {
        $("#ParentMenuGrid").pqGrid("option", "dataModel.data", response);
        $("#ParentMenuGrid").pqGrid("refreshDataAndView");
        PqGridRefreshClick($("#ParentMenuGrid"));

    }
    else
        ShowAlert("error", response.message);
}
/******* End ********/

/****************************************************** Start - Child Menu Grid **************************************************/
var colChildGrid = [
    { dataIndx: "ParentMenuId", title: "", editable: false, hidden: true },
    { dataIndx: "ChildMenuId", title: "", editable: false, hidden: true },
    {
        //custom title.    
        title: "",
        dataIndx: "State",
        maxWidth: 25,
        minWidth: 25,
        menuIcon: false,
        type: 'checkBoxSelection', cls: 'ui-state-default', sortable: false, editor: true,
        dataType: 'bool',
        cb: {
            all: false, //header checkbox to affect checkboxes on all pages.
            header: true //for header checkbox.
        },
    },
    {
        title: "Menu Name", dataIndx: "ChildMenuName", dataType: "string", width: 80, editable: false,

    },
]

var ChildMenugridOptions = {
    width: 'auto',
    maxWidth: '100%',
    autofill: true,
    numberCell: { show: true },
    hoverMode: 'row',
    showTop: false,
    showTitle: false,
    showBottom: false,
    scrollModel: { autoFit: true },
    filterModel: { on: true, mode: "AND", header: false },
    draggable: false,
    hwrap: false,
    wrap: false,
    editable: true,
    columnBorders: true,
    menuIcon: true,
    selectionModel: { type: 'cell', mode: 'single', cbHeader: false },
    pageModel: { type: "local" }
}
ChildMenugridOptions.height = 300;
ChildMenugridOptions.title = 'Menu';
ChildMenugridOptions.colModel = colChildGrid;
ChildMenugridOptions.check = function (evt, ui) {
    if (ui.rowData) {
        if (ui.rowData.State == true) {
            if (jQuery.inArray(ui.rowData.ChildMenuId, ChildMenuSelections) == -1) ChildMenuSelections.push(ui.rowData.ChildMenuId);
        }
        else ChildMenuSelections.splice($.inArray(ui.rowData.ChildMenuId, ChildMenuSelections), 1);
    }
}
ChildMenugridOptions.dataModel = { location: 'local', sorting: "local", };

$("#ChildMenuGrid").pqGrid(ChildMenugridOptions);
/******************************************************* End - Child Menu Grid ************************************************** */



/***** Start - Child Menu *****/
function GetAllChildMenu() {
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    ajaxCall("/Admin/Admin/GetChildMenu", { "__RequestVerificationToken": antiForgeryToken }, { PMenuId: tempMenuId }, "GET", LoadChildMenu, function (response) { ajaxCallFailed(response); }, true, ["ChildMenuGrid"]);
}

function LoadChildMenu(response) {
    $.each(response, function (index, value) {
        if (jQuery.inArray(value.ChildMenuId, ChildMenuSelections) > -1) { value.State = true; }
    });

    $("#ChildMenuGrid").pqGrid("hideLoading");
    $("#ChildMenuGrid").pqGrid("option", "dataModel.data", response);
    $("#ChildMenuGrid").pqGrid("refreshDataAndView");
}
/** End - Child Menu **/

/***** Start - Load Menu Access for ROle *****/
function LoadMenuAccessforRole(tempRoleId) {

    if (tempRoleId > 0) {
        ChildMenuSelections = [];
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        ajaxCall("/Admin/Admin/GetMenuRoleAccess", { "__RequestVerificationToken": antiForgeryToken }, { RoleId: tempRoleId }, "GET",
            LoadSuccess_RoleAccess, function (response) { ajaxCallFailed(response, response.message); }, true, ['SearchDetails_RoleAccess']);
    }
    else { ShowAlert("error", "Please select Role from list"); }
}

function LoadSuccess_RoleAccess(response) {
    if (response.length > 0) {
        if (response != undefined) {
            $.each(response, function (index, value) {
                if (value.MenuList != undefined && value.MenuList.length > 0) {
                    $.each(value.MenuList, function (j, child) {
                        if (jQuery.inArray(child.ChildMenuId, ChildMenuSelections) == -1) ChildMenuSelections.push(child.ChildMenuId);
                    });
                }
            });
        }
    }
    else
        ShowAlert("error", "Failed to save User access to Menu list");
}

/***** End -  Load Menu Access for Role */

/***** Start - Save Role Access ********/
function SaveRoleAccess() {
    if ($("#roleName").val() == "") {
        ShowAlert("error", "Please Enter Role!");
        return false;
    }
    let roleName = $("#roleName").val();
    var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    var menus = ChildMenuSelections.join(',')
    ajaxCall("/Admin/Admin/SaveMenuRole", { "__RequestVerificationToken": antiForgeryToken }, JSON.stringify({ 'roleId': tempRoleId, 'roleName': roleName, 'menuList': menus }), "POST",
        SaveSuccess_RoleAccess, function (response) { ajaxCallFailed(response, response.message); }, true, ['SearchDetails_RoleAccess']);

}

function SaveSuccess_RoleAccess(response) {
    if (response.success == true) {
        ShowAlert("success", "Role access to Menu list saved successfully");
        GetAllRoles();
        ClearFormData();
    }
    else
        ShowAlert("error", "Failed to save User access to Menu list");
}
/****** End - Role Access ************/
function ClearFormData() {
    ChildMenuSelections = [];
    ClearAllControlSkip('SearchDetails_RoleAccess', ["ParentMenuGrid"]);
    tempRoleId = 0;
}