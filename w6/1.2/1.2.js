let students = [];

let filteredStudents = [];

let sortAsc = true;

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");

const searchInput = document.getElementById("search");
const filterRank = document.getElementById("filterRank");
const sortScore = document.getElementById("sortScore");

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
alert("Dữ liệu không hợp lệ");
return;
}

students.push({
name:name,
score:score
});

nameInput.value="";
scoreInput.value="";

applyFilters();

}

function applyFilters(){

let keyword = searchInput.value.toLowerCase();

let rank = filterRank.value;

filteredStudents = students.filter(s=>{

let matchName = s.name.toLowerCase().includes(keyword);

let matchRank = rank === "all" || getRank(s.score) === rank;

return matchName && matchRank;

});

filteredStudents.sort((a,b)=>{

return sortAsc ? a.score - b.score : b.score - a.score;

});

renderTable();

}

function renderTable(){

tbody.innerHTML="";

if(filteredStudents.length === 0){

tbody.innerHTML = `<tr><td colspan="5">Không có kết quả</td></tr>`;

return;

}

filteredStudents.forEach((s,index)=>{

let tr = document.createElement("tr");

let scoreClass = s.score < 5 ? "low-score" : "";

tr.innerHTML = `
<td>${index+1}</td>
<td>${s.name}</td>
<td class="${scoreClass}">${s.score}</td>
<td>${getRank(s.score)}</td>
<td><button class="delete-btn" data-name="${s.name}">Xóa</button></td>
`;

tbody.appendChild(tr);

});

updateStats();

}

function updateStats(){

let total = students.length;

let avg = 0;

if(total>0){

let sum = students.reduce((a,b)=>a + b.score,0);

avg = (sum/total).toFixed(2);

}

stats.innerText = `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;

}

tbody.addEventListener("click",function(e){

if(e.target.classList.contains("delete-btn")){

let name = e.target.dataset.name;

students = students.filter(s=>s.name !== name);

applyFilters();

}

});

searchInput.addEventListener("input",applyFilters);

filterRank.addEventListener("change",applyFilters);

sortScore.addEventListener("click",function(){

sortAsc = !sortAsc;

applyFilters();

});

addBtn.addEventListener("click",addStudent);

scoreInput.addEventListener("keypress",function(e){

if(e.key === "Enter") addStudent();

});