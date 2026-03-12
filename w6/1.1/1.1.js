let students = [];

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tbody = document.getElementById("tableBody");
const stats = document.getElementById("stats");

function getRank(score){
    if(score > 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";
}

function addStudent(){

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if(name === "" || isNaN(score) || score < 0 || score > 10){
        alert("Dữ liệu không hợp lệ!");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    nameInput.value="";
    scoreInput.value="";
    nameInput.focus();

    renderTable();
}

function renderTable(){

    tbody.innerHTML="";

    students.forEach((s,index)=>{

        let tr = document.createElement("tr");

        let scoreClass = s.score < 5 ? "low-score" : "";

        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${s.name}</td>
        <td class="${scoreClass}">${s.score}</td>
        <td>${getRank(s.score)}</td>
        <td>
            <button class="delete-btn" data-index="${index}">Xóa</button>
        </td>
        `;

        tbody.appendChild(tr);

    });

    updateStats();
}

function updateStats(){

    let total = students.length;
    let avg = 0;

    if(total>0){
        let sum = students.reduce((a,b)=>a + b.score ,0);
        avg = (sum/total).toFixed(2);
    }

    stats.innerText = `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;
}

tbody.addEventListener("click",function(e){

    if(e.target.classList.contains("delete-btn")){

        let index = e.target.dataset.index;

        students.splice(index,1);

        renderTable();
    }

});

addBtn.addEventListener("click",addStudent);

scoreInput.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        addStudent();
    }
});