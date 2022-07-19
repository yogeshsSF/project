var tableData = [
    {
        'firstName': 'Yogesh',
        'middleName': '',
        'lastName': 'Saini',
        'email': 'yogesh.s.8399@gmail.com',
        'phnNo': '9812346211',
        'role': 0,
        'address': 'hisar, haryana'
    },
    {
        'firstName': 'Atul',
        'middleName': 'kumar',
        'lastName': 'Saini',
        'email': 'atul.s.8399@gmail.com',
        'phnNo': '9812346211',
        'role': 1,
        'address': 'hansi, haryana'
    },
    {
        'firstName': 'Rahul',
        'middleName': 'singh',
        'lastName': 'Sura',
        'email': 'rahul.s.8399@gmail.com',
        'phnNo': '9812346211',
        'role': 2,
        'address': 'sonepat, haryana'
    }
];
var role;
(function (role) {
    role[role["SuperAdmin"] = 0] = "SuperAdmin";
    role[role["Admin"] = 1] = "Admin";
    role[role["Subscriber"] = 2] = "Subscriber";
})(role || (role = {}));
;
function padTo2Digits(num) {
    return num.toString();
}
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function padTo2Digits(num) {
    return num.toString();
}
function FormatDateTime(template, id) {
    return function (_) {
        var date = new Date();
        var body = ([
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
            ' ' +
            [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds()),
            ].join(':'));
        
        const h_id = document.getElementById(id);
        if (h_id) {
            h_id.innerHTML = template+body+'</h3>';
        }
    };
}
Employee = __decorate([
    FormatDateTime('<h3> Formatted Date & time is : ', 'date_time'),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Number, Object, Object])
], Employee);
;
// function DateTime(template: string, id: string) {
//     return function (_: Function) {
//         var body = function formatDate() {
//             const date = new Date();
//             return (
//                 [
//                     date.getFullYear(),
//                     padTo2Digits(date.getMonth() + 1),
//                     padTo2Digits(date.getDate()),
//                 ].join('-') +
//                 ' ' +
//                 [
//                     padTo2Digits(date.getHours()),
//                     padTo2Digits(date.getMinutes()),
//                     padTo2Digits(date.getSeconds()),
//                 ].join(':')
//             );
//         }
//         const h_id = document.getElementById(id);
//         if (h_id) {
//             h_id.innerHTML = template+'<b>'+body+'</b>';
//         }
//     }
// }
//@DateTime('<h3> Date & time is <h3>', 'date_time')
var Employee = /** @class */ (function () {
    function Employee(f, m, l, a, r, e, p) {
        this.Fname = f;
        this.Lname = l;
        this.Mname = m;
        this.Address = a;
        this.Email = e;
        this.PhoneNo = p;
        this.employeeRole = '';
        if (r === role.SuperAdmin)
            this.employeeRole = 'engineer';
        if (r === role.Admin)
            this.employeeRole = 'doctor';
        if (r === role.Subscriber)
            this.employeeRole = 'pilot';
    }
    Employee.prototype.getFname = function () {
        return this.Fname;
    };
    Employee.prototype.getMname = function () {
        return this.Mname;
    };
    Employee.prototype.getLname = function () {
        return this.Lname;
    };
    Employee.prototype.getAddress = function () {
        return this.Address;
    };
    return Employee;
}());
;
var objArray = [];
for (var i = 0; i < tableData.length; i++) {
    var js = tableData[i];
    var obj = new Employee(js.firstName, js.middleName, js.lastName, js.address, js.role, js.email, js.phnNo);
    objArray.push(obj);
}
function getThis(name) {
    return name;
}
//console.log(objArray.length);
var tableDl = document.querySelector('table');
var tableEd = document.querySelector('table');
var tableSv = document.querySelector('table');
var tableCl = document.querySelector('table');
function loading() {
    console.log('hello');
    var id1 = document.getElementById("myButton").value;
    if (id1 !== null) {
        id1 = "Refresh Data";
    }
    var text = "<thead><th> First Name</th><th> Middle Name</th><th> Last Name</th><th>Email</th><th> Phone No.</th><th> Role</th><th> Address</th><th> Options</th></thead><tbody id='tableBody'>    </tbody>";
    for (var i in objArray) {
        var row = "<tr><td>" + objArray[i].getFname() + "</td><td>" + objArray[i].getMname() + "</td><td>" + objArray[i].getLname() + "</td><td>" + objArray[i].Email + "</td><td>" + objArray[i].PhoneNo + "</td><td>"
            + objArray[i].employeeRole + "</td><td>" + objArray[i].getAddress() + "</td><td><span id='optionPart'><button class='editBtn'>Edit</button><button class='deleteBtn'>Delete</button></span></td></tr>";
        text += row;
    }
    var id2 = document.getElementById("mainTable");
    if (id2 != null) {
        id2.innerHTML = text;
    }
    //console.log(text);
}
function onDeleteRow(e) {
    if (!e.target.classList.contains('deleteBtn')) {
        return;
    }
    var btn = e.target;
    btn.closest("tr").remove();
}
var editTB = [];
function onEditRow(e) {
    if (!e.target.classList.contains('editBtn')) {
        return;
    }
    //alert("Please select the cell that you want to edit");
    var row = e.target.parentElement.parentElement.parentElement;
    var row_i = row.rowIndex;
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.rows[row_i].focus();
    for (var i = 0; i < row.childElementCount - 1; i++) {
        var tg = row.cells[i];
        editmode(tg, i);
    }
    var buttonTxt = '<button class="saveBtn">Save</button><button class="cancelBtn">Cancel</button>';
    e.target.parentElement.innerHTML = buttonTxt;
    //e.target.closest("tr");
    //console.log(document.getElementById("mainTable").rows[0].cells.length);
    // var tableRC= document.querySelector('table');
    // tableRC.addEventListener('click',onRowClick);
}
function onSaveRow(e) {
    if (!e.target.classList.contains('saveBtn')) {
        return;
    }
    var row = e.target.parentElement.parentElement.parentElement;
    var row_i = row.rowIndex;
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.rows[row_i].focus();
    for (var i = 0; i < row.childElementCount - 1; i++) {
        editdone(editTB[i].elem, true, editTB[i].data);
    }
    editTB.splice(0, editTB.length);
    var buttonTxt = '<button class="editBtn">Edit</button><button class="deleteBtn">Delete</button>';
    e.target.parentElement.innerHTML = buttonTxt;
}
function onCancelRow(e) {
    if (!e.target.classList.contains('cancelBtn')) {
        return;
    }
    var row = e.target.parentElement.parentElement.parentElement;
    var row_i = row.rowIndex;
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.rows[row_i].focus();
    for (var i = 0; i < row.childElementCount - 1; i++) {
        editdone(editTB[i].elem, false, editTB[i].data);
    }
    editTB.splice(0, editTB.length);
    var buttonTxt = '<button class="editBtn">Edit</button><button class="deleteBtn">Delete</button>';
    e.target.parentElement.innerHTML = buttonTxt;
}
// function onRowClick(e){
//   let target = event.target.closest('td');
//   //if (!table.contains(target)) return;
//   if (target.nodeName == 'TD') {
//     //if (editTB) return;
//     editmode(target);
//   }
// }
//var editTB;
function editmode(td, i) {
    editTB[i] = {
        elem: td,
        data: td.innerHTML
    };
    td.classList.add('edit-td');
    var textArea = document.createElement('textarea');
    //textArea.style.width = td.clientWidth + 'px';
    //textArea.style.height = td.clientHeight + 'px';
    textArea.className = 'edit-area';
    textArea.value = td.innerHTML;
    td.innerHTML = '';
    td.appendChild(textArea);
    //textArea.focus();
}
function editdone(td, isOk, dt) {
    if (isOk) {
        td.innerHTML = td.firstChild.value;
    }
    else {
        td.innerHTML = dt;
    }
    td.classList.remove('edit-td');
}
tableDl === null || tableDl === void 0 ? void 0 : tableDl.addEventListener('click', onDeleteRow);
tableEd === null || tableEd === void 0 ? void 0 : tableEd.addEventListener('click', onEditRow);
tableSv === null || tableSv === void 0 ? void 0 : tableSv.addEventListener('click', onSaveRow);
tableCl === null || tableCl === void 0 ? void 0 : tableCl.addEventListener('click', onCancelRow);
