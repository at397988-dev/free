let startTime = null;
let currentRow = null;

let totalWork = 0;

/* Load Saved Data */

window.onload = function(){

    const savedData =
    JSON.parse(localStorage.getItem("attendanceData"));

    if(savedData){

        document.getElementById("tableBody").innerHTML =
        savedData.table;

        totalWork = savedData.total;

        document.getElementById("totalWork").innerText =
        totalWork.toFixed(2);
    }
}

/* Save Data */

function saveData(){

    const data = {

        table:
        document.getElementById("tableBody").innerHTML,

        total:
        totalWork
    };

    localStorage.setItem(
        "attendanceData",
        JSON.stringify(data)
    );
}

/* 出勤 */

function startWork(){

    const company =
    document.getElementById("company").value;

    const code =
    document.getElementById("code").value;

    const employee =
    document.getElementById("employee").value;

    if(company === "" || code === "" || employee === ""){

        alert("Please fill all fields");

        return;
    }

    startTime = new Date();

    const date =
    startTime.toLocaleDateString();

    const start =
    startTime.toLocaleTimeString();

    const tbody =
    document.getElementById("tableBody");

    currentRow = tbody.insertRow();

    currentRow.innerHTML = `
        <td>${date}</td>
        <td>${company}</td>
        <td>${code}</td>
        <td>${employee}</td>
        <td>${start}</td>
        <td>-</td>
        <td>-</td>
    `;

    saveData();
}

/* 退勤 */

function endWork(){

    if(startTime === null){

        alert("First click 出勤");

        return;
    }

    const endTime = new Date();

    const end =
    endTime.toLocaleTimeString();

    const workHour =
    ((endTime - startTime) / (1000 * 60 * 60)).toFixed(2);

    totalWork += parseFloat(workHour);

    document.getElementById("totalWork").innerText =
    totalWork.toFixed(2);

    currentRow.cells[5].innerText = end;

    currentRow.cells[6].innerText =
    workHour + " hrs";

    startTime = null;

    saveData();
}