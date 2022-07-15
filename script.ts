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

enum role { engineer = 0, doctor = 1, pilot = 2 };

interface Name {
    Fname: string;
    Mname: string;
    Lname: string;

    getFname(): string;
    getMname(): string;
    getLname(): string;

}

interface Address {
    Address: string;
    getAddress(): string;
}

class Employee implements Name, Address {
    Fname: string;
    Mname: string;
    Lname: string;
    Address: string;
    employeeRole: string;
    Email: string;
    PhoneNo: string;

    constructor(f: string, m: string, l: string, a: string, r: number, e: string, p: string) {
        this.Fname = f;
        this.Lname = l;
        this.Mname = m;
        this.Address = a;
        this.Email = e;
        this.PhoneNo = p;
        if (r === role.engineer)
            this.employeeRole = 'engineer';
        if (r === role.doctor)
            this.employeeRole = 'doctor';
        if (r === role.pilot)
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
var objArray: Employee[] = [];
for (let i = 0; i < tableData.length; i++) {
    let js = tableData[i];
    let obj = new Employee(js.firstName, js.middleName, js.lastName, js.address, js.role, js.email, js.phnNo);
    objArray.push(obj);
}

//console.log(objArray.length);

const tableDl = document.querySelector('table');
const tableEd = document.querySelector('table');
const tableSv = document.querySelector('table');
const tableCl = document.querySelector('table');

function loading(): void {
    console.log('hello');

    var id1 = (<HTMLInputElement>document.getElementById("myButton")).value;
    if (id1 != null) {
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
function onDeleteRow(e) {

    if (!e.target.classList.contains('deleteBtn')) {
        return;
    }
    const btn = e.target;
    btn.closest("tr").remove();
}

var editTB: any[] = [];
function onEditRow(e): void {

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


function onSaveRow(e): void {

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


function onCancelRow(e): void {

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

function editmode(td, i): void {
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

function editdone(td, isOk, dt): void {
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