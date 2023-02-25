let tableData = [];

function createNewRow() {
  const tbody = document.querySelector("#myTable tbody");
  const newRow = document.createElement("tr");
  
  const idCell = document.createElement("td");
  idCell.textContent = getNextId();
  newRow.appendChild(idCell);
  
  const studentNameCell = createInputCell("student_name");
  newRow.appendChild(studentNameCell);
  
  const studentRollCell = createInputCell("student_roll");
  newRow.appendChild(studentRollCell);
  
  const subjectCell = createInputCell("subject");
  newRow.appendChild(subjectCell);
  
  const marksCell = createInputCell("marks");
  newRow.appendChild(marksCell);
  
  const markedByCell = createInputCell("markedBy", "email");
  newRow.appendChild(markedByCell);
  
  const deleteBtnCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    newRow.remove();
    tableData = tableData.filter(row => row.id !== parseInt(idCell.textContent));
    console.log(tableData);
  });
  deleteBtnCell.appendChild(deleteBtn);
  newRow.appendChild(deleteBtnCell);
  
  tbody.appendChild(newRow);
}

function createInputCell(key, type = "text") {
  const cell = document.createElement("td");
  const input = document.createElement("input");
  input.type = type;
  input.addEventListener("input", () => {
    updateTableData();
  });
  cell.appendChild(input);
  return cell;
}

function getNextId() {
  const maxId = tableData.reduce((acc, row) => {
    return row.id > acc ? row.id : acc;
  }, 0);
  return maxId + 1;
}

function updateTableData() {
  const tbody = document.querySelector("#myTable tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  tableData = rows.map(row => {
    return {
      id: parseInt(row.querySelector("td:first-child").textContent),
      student_name: row.querySelector("td:nth-child(2) input").value,
      student_roll: row.querySelector("td:nth-child(3) input").value,
      subject: row.querySelector("td:nth-child(4) input").value,
      marks: row.querySelector("td:nth-child(5) input").value,
      markedBy: row.querySelector("td:nth-child(6) input").value
    };
  });
}

function saveTableData() {
  console.log(tableData);
}

document.querySelector("#addRowBtn").addEventListener("click", createNewRow);
document.querySelector("#saveBtn").addEventListener("click", saveTableData);