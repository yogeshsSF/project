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
]

enum role { SuperAdmin = 0, Admin = 1, Subscriber = 2 };

interface Name <T>{
    Fname: T;
    Mname: T;
    Lname: T;

    getFname(): T;
    getMname(): T;
    getLname(): T;

}

interface Address<T> {
    Address: T;
    getAddress(): T;
}

function padTo2Digits(num: number) {
    return num.toString();
}

function FormatDateTime(template: string, id: string) {
    return function (_: Function) {
        var body = function formatDate() {
            const date = new Date();
            return (
                [
                    date.getFullYear(),
                    padTo2Digits(date.getMonth() + 1),
                    padTo2Digits(date.getDate()),
                ].join('-') +
                ' ' +
                [
                    padTo2Digits(date.getHours()),
                    padTo2Digits(date.getMinutes()),
                    padTo2Digits(date.getSeconds()),
                ].join(':')
            );
        }
        const h_id = document.getElementById(id);
        if (h_id) {
            h_id.innerHTML = template+body+'</h3>';
        }
    }

}


@FormatDateTime('<h3> Date & time is : ', 'date_time')



class Employee<T> implements Name<T>, Address<T> {
    Fname: T;
    Mname: T;
    Lname: T;
    Address: T;
    employeeRole: string;
    Email: T;
    PhoneNo: T;

    constructor(f: T, m: T, l: T, a: T, r: number, e: T, p: T) {
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
    getFname() {
        return this.Fname;
    }
    getMname() {
        return this.Mname;
    }
    getLname() {
        return this.Lname;
    }
    getAddress() {
        return this.Address;
    }
};
var objArray: Employee<string>[] = [];
for (let i = 0; i < tableData.length; i++) {
    let js = tableData[i];
    let obj = new Employee(js.firstName, js.middleName, js.lastName, js.address, js.role, js.email, js.phnNo);
    objArray.push(obj);
}

function getThis<T>(name: T): T {
    return name;
}

//console.log(objArray.length);

const tableDl = document.querySelector('table');
const tableEd = document.querySelector('table');
const tableSv = document.querySelector('table');
const tableCl = document.querySelector('table');

function loading(): void {
    console.log('hello');

    var id1 = (<HTMLInputElement>document.getElementById("myButton")).value;
    if (id1 !== null) {
        id1 = "Refresh Data"

    }


    var text = "<thead><th> First Name</th><th> Middle Name</th><th> Last Name</th><th>Email</th><th> Phone No.</th><th> Role</th><th> Address</th><th> Options</th></thead><tbody id='tableBody'>    </tbody>";
    for (var i in objArray) {

        let row = "<tr><td>" + objArray[i].getFname() + "</td><td>" + objArray[i].getMname() + "</td><td>" + objArray[i].getLname() + "</td><td>" + objArray[i].Email + "</td><td>" + objArray[i].PhoneNo + "</td><td>"
            + objArray[i].employeeRole + "</td><td>" + objArray[i].getAddress() + "</td><td><span id='optionPart'><button class='editBtn'>Edit</button><button class='deleteBtn'>Delete</button></span></td></tr>";
        text += row;

    }

    var id2 = document.getElementById("mainTable");
    if (id2 != null) {
        id2.innerHTML = text;

    }
    //console.log(text);

}
function onDeleteRow(e:any) {

    if (!e.target.classList.contains('deleteBtn')) {
        return;
    }
    const btn = e.target;
    btn.closest("tr").remove();
}

var editTB: any[] = [];
function onEditRow(e:any): void {

    if (!e.target.classList.contains('editBtn')) {
        return;
    }
    //alert("Please select the cell that you want to edit");

    let row = e.target.parentElement.parentElement.parentElement;
    let row_i = row.rowIndex;
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.rows[row_i].focus();
    for (let i = 0; i < row.childElementCount - 1; i++) {
        let tg = row.cells[i];
        editmode(tg, i);
    }

    var buttonTxt = '<button class="saveBtn">Save</button><button class="cancelBtn">Cancel</button>';
    e.target.parentElement.innerHTML = buttonTxt;

    //e.target.closest("tr");
    //console.log(document.getElementById("mainTable").rows[0].cells.length);
    // var tableRC= document.querySelector('table');
    // tableRC.addEventListener('click',onRowClick);
}


function onSaveRow(e:any): void {

    if (!e.target.classList.contains('saveBtn')) {
        return;
    }
    let row = e.target.parentElement.parentElement.parentElement;
    let row_i = row.rowIndex;
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.rows[row_i].focus();
    for (let i = 0; i < row.childElementCount - 1; i++) {
        editdone(editTB[i].elem, true, editTB[i].data);
    }
    editTB.splice(0, editTB.length);

    var buttonTxt = '<button class="editBtn">Edit</button><button class="deleteBtn">Delete</button>';
    e.target.parentElement.innerHTML = buttonTxt;
}


function onCancelRow(e:any): void {

    if (!e.target.classList.contains('cancelBtn')) {
        return;
    }
    let row = e.target.parentElement.parentElement.parentElement;
    let row_i = row.rowIndex;
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.rows[row_i].focus();

    for (let i = 0; i < row.childElementCount - 1; i++) {
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

function editmode(td:any, i:any): void {
    editTB[i] = {
        elem: td,
        data: td.innerHTML
    };
    td.classList.add('edit-td');
    let textArea = document.createElement('textarea');
    //textArea.style.width = td.clientWidth + 'px';
    //textArea.style.height = td.clientHeight + 'px';
    textArea.className = 'edit-area';
    textArea.value = td.innerHTML;
    td.innerHTML = '';
    td.appendChild(textArea);
    //textArea.focus();
}

function editdone(td:any, isOk:any, dt:any): void {
    if (isOk) {
        td.innerHTML = td.firstChild.value;
    } else {
        td.innerHTML = dt;
    }
    td.classList.remove('edit-td');
}

tableDl?.addEventListener('click', onDeleteRow);
tableEd?.addEventListener('click', onEditRow);
tableSv?.addEventListener('click', onSaveRow);
tableCl?.addEventListener('click', onCancelRow);