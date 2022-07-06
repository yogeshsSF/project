var tableData = [
    {
      'firstName': 'Yogesh',
      'middleName': '',
      'lastName': 'Saini',
      'email': 'yogesh.s.8399@gmail.com',
      'phnNo': '9812346211',
      'role': 'engineer',
      'address': 'hisar, haryana'
    },
    {
      'firstName': 'Atul',
      'middleName': 'kumar',
      'lastName': 'Saini',
      'email': 'atul.s.8399@gmail.com',
      'phnNo': '9812346211',
      'role': 'doctor',
      'address': 'hansi, haryana'
    },
    {
      'firstName': 'Rahul',
      'middleName': 'singh',
      'lastName': 'Sura',
      'email': 'rahul.s.8399@gmail.com',
      'phnNo': '9812346211',
      'role': 'pilot',
      'address': 'sonepat, haryana'
    }
  ]

  const tableDl = document.querySelector('table');
  const tableEd = document.querySelector('table');
  const tableSv = document.querySelector('table');
  const tableCl = document.querySelector('table');



  function loading() {

    var elem = document.getElementById("myButton").value = "Refresh Data";


    var text = "<thead><th> First Name</th><th> Middle Name</th><th> Last Name</th><th>Email</th><th> Phone No.</th><th> Role</th><th> Address</th><th> Options</th></thead><tbody id='tableBody'>    </tbody>";
    for (var i in tableData) {

      let row = "<tr><td>" + tableData[i].firstName + "</td><td>" + tableData[i].middleName + "</td><td>" + tableData[i].lastName + "</td><td>" + tableData[i].email + "</td><td>" + tableData[i].phnNo + "</td><td>"
         + tableData[i].role + "</td><td>" + tableData[i].address + "</td><td><span id='optionPart'><button class='editBtn'>Edit</button><button class='deleteBtn'>Delete</button></span></td></tr>";
      text += row;

    }
    document.getElementById("mainTable").innerHTML = text;

  }

  function onDeleteRow(e) {

    if (!e.target.classList.contains('deleteBtn')) {
      return;
    }
    const btn = e.target;
    btn.closest("tr").remove();
  }

  var editTB = [];
  function onEditRow(e) {

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


  function onSaveRow(e) {

    if (!e.target.classList.contains('saveBtn')) {
      return;
    }
    let row = e.target.parentElement.parentElement.parentElement;
    let row_i = row.rowIndex;
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.rows[row_i].focus();
    for (let i = 0; i < row.childElementCount - 1; i++) {
      editdone(editTB[i].elem, true);
    }
    editTB.splice(0, editTB.length);

    var buttonTxt = '<button class="editBtn">Edit</button><button class="deleteBtn">Delete</button>';
    e.target.parentElement.innerHTML = buttonTxt;
  }


  function onCancelRow(e) {

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

  function editmode(td, i) {
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

  function editdone(td, isOk, dt) {
    if (isOk) {
      td.innerHTML = td.firstChild.value;
    } else {
      td.innerHTML = dt;
    }
    td.classList.remove('edit-td');
  }

  tableDl.addEventListener('click', onDeleteRow);
  tableEd.addEventListener('click', onEditRow);
  tableSv.addEventListener('click', onSaveRow);
  tableCl.addEventListener('click', onCancelRow);