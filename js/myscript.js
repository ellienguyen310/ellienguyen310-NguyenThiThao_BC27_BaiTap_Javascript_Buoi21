var nhanviens = [];
var callBackFunc;

let tkAllowed = false;
let nameAllowed = false;
let mailAllowed = false;
let passwordAllowed = false;
let luongAllowed = false;
let giolamAllowed = false;
let chucvuAllowed = false;

let isAllowToSubmit = false;

let isNumber = false;

window.addEventListener("load", () => {
  validator();
  btnThemNV = document.getElementById("btnThemNV");
});

function addNhanVien() {
  var tknv = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var luongCB = +document.getElementById("luongCB").value;
  var chucvu = document.getElementById("chucvu").value;
  var gioLam = document.getElementById("gioLam").value;
  var nhanvien = new Nhanvien(
    tknv,
    name,
    email,
    password,
    datepicker,
    luongCB,
    chucvu,
    gioLam
  );
  nhanviens.push(nhanvien);
  if (
    tkAllowed &&
    nameAllowed &&
    mailAllowed &&
    passwordAllowed &&
    luongAllowed &&
    giolamAllowed &&
    chucvuAllowed
  ) {
    isAllowToSubmit = true;
    btnThemNV.classList.remove("warning-msg");
  }
  displayNV(nhanviens);
}

function displayNV(nhanviens) {
  console.log("tkAllowed : ", tkAllowed);
  console.log("isAllowToSubmit : ", isAllowToSubmit);
  var tableList = document.getElementById("tableDanhSach");
  var html = "";
  if (isAllowToSubmit) {
    for (let i = 0; i < nhanviens.length; i++) {
      var nhanvien = nhanviens[i];
      console.log("nhan vien array : ", nhanviens);
      html += `<tr>
        <td>${nhanvien.tknv}</td>
        <td>${nhanvien.name}</td>
        <td>${nhanvien.email}</td>
        <td>${nhanvien.datepicker}</td>
        <td>${nhanvien.chucvu}</td>
        <td>${nhanvien.calcSalary().toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}</td>
        <td>${nhanvien.calcRank()}</td>
        <td class="change-setting" style="cursor: pointer;
        width: 4vw;
        text-align: center;
        display: inline-flex;
        justify-content: space-between;
        border: none;
        align-items: center;
        height: 4vh;
        gap: 40%;
        padding: 0.75rem 13%;"><em class="fa fa-cog"></em><em class="fa fa-trash" onclick="deleteNv('${
          nhanvien.tknv
        }')"></em></td>
        </tr>`;
    }
    tableList.innerHTML = html;
    removeUserInput();
    tkAllowed = false;
    nameAllowed = false;
    mailAllowed = false;
    passwordAllowed = false;
    luongAllowed = false;
    giolamAllowed = false;
    chucvuAllowed = false;
    isAllowToSubmit = false;
  } else {
    btnThemNV.classList.add("warning-msg");
    nhanviens.splice(nhanviens.length - 1, 1);
    console.log("nhan vien array : ", nhanviens);
  }
}

function deleteNv(nhanvienTk) {
  console.log("succeed");
  let indexToSplice = -1;
  for (let i = 0; i < nhanviens.length; i++) {
    if (nhanviens[i].tknv === nhanvienTk) {
      console.log("nhanvienTk", nhanvienTk);
      console.log("nhanvien[i]", nhanviens[i].tknv);
      indexToSplice = i;
      break;
    }
  }
  if (indexToSplice !== -1) {
    nhanviens.splice(indexToSplice, 1);
    isAllowToSubmit = true;
    displayNV(nhanviens);
    isAllowToSubmit = false;
  }
}

let searchResultReturned = false;

let nvXuatSac = [];
let nvGioi = [];
let nvKha = [];
let nvTrungBinh = [];
function filterRanking() {
  for (let i = 0; i < nhanviens.length; i++) {
    if (nhanviens[i].calcRank().includes("Xuấ")) {
      console.log("nvXuatSac detected");
      nvXuatSac.push(nhanviens[i]);
    }
    if (nhanviens[i].calcRank().includes("Giỏ")) {
      console.log("nvGioi detected");
      nvGioi.push(nhanviens[i]);
    }
    if (nhanviens[i].calcRank().includes("Khá")) {
      console.log("nvKha detected");
      nvKha.push(nhanviens[i]);
    }
    if (nhanviens[i].calcRank().includes("Tru")) {
      console.log("nvTrungBinh detected");
      nvTrungBinh.push(nhanviens[i]);
    }
  }
  console.log("xuat sac :", nvXuatSac);
  console.log("gioi", nvGioi);
  console.log("kha", nvKha);
  console.log("tb", nvTrungBinh);
}

function searchNv() {
  let keyword = document.getElementById("searchName").value;
  filterRanking();

  if (keyword.includes("xu") || keyword.includes("Xu")) {
    isAllowToSubmit = true;
    displayNV(nvXuatSac);
    nvXuatSac = [];
    isAllowToSubmit = false;
  }
  if (keyword.includes("Gi") || keyword.includes("gi")) {
    isAllowToSubmit = true;
    displayNV(nvGioi);
    nvGioi = [];
    isAllowToSubmit = false;
  }
  if (keyword.includes("Kh") || keyword.includes("kh")) {
    isAllowToSubmit = true;
    displayNV(nvKha);
    nvKha = [];
    isAllowToSubmit = false;
  }
  if (keyword.includes("Tr") || keyword.includes("tr")) {
    isAllowToSubmit = true;
    displayNV(nvTrungBinh);
    nvTrungBinh = [];
    isAllowToSubmit = false;
  }
}

function removeUserInput() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";

  document
    .getElementById("tknv")
    .parentElement.classList.remove("input-allowed");
  document
    .getElementById("name")
    .parentElement.classList.remove("input-allowed");
  document
    .getElementById("email")
    .parentElement.classList.remove("input-allowed");
  document
    .getElementById("password")
    .parentElement.classList.remove("input-allowed");
  document
    .getElementById("datepicker")
    .parentElement.classList.remove("input-allowed");
  document
    .getElementById("luongCB")
    .parentElement.classList.remove("input-allowed");
  document
    .getElementById("chucvu")
    .parentElement.classList.remove("input-allowed2");
  document
    .getElementById("gioLam")
    .parentElement.classList.remove("input-allowed");
  document.getElementById("btnThemNV").classList.remove("warning-msg");
}

function validator() {
  let that = this;
  let formControl = document.getElementsByClassName("form-control");
  callBackFunc = function () {
    if (this.name === "tk") {
      that.tkValidator(this);
    }
    if (this.name === "name") {
      that.nameValidator(this);
    }
    if (this.name === "email") {
      that.mailValidator(this);
    }
    if (this.name === "password") {
      that.passwordValidator(this);
    }
    if (this.name === "luongCB") {
      that.luongValidator(this);
    }
    if (this.name === "gioLam") {
      that.gioLamValidator(this);
    }
    if (this.id === "chucvu") {
      that.chucvuValidator(this);
    }
  };
  for (let i = 0; i < formControl.length; i++) {
    formControl[i].onclick = callBackFunc;
  }
}

function tkValidator(dataInput) {
  dataInput.addEventListener("blur", () => {
    if (dataInput.value.length === 0) {
      dataInput.parentElement.classList.add("please-fill");
      dataInput.parentElement.classList.remove("character-46");
      dataInput.parentElement.classList.remove("input-allowed");
      tkAllowed = false;
      console.log("tkAllowed : ", tkAllowed);
    } else if (dataInput.value.length < 4 || dataInput.value.length > 6) {
      dataInput.parentElement.classList.add("character-46");
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("input-allowed");
      tkAllowed = false;
      console.log("tkAllowed : ", tkAllowed);
    } else {
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("character-46");
      dataInput.parentElement.classList.add("input-allowed");
      tkAllowed = true;
      console.log("tkAllowed : ", tkAllowed);
    }
  });
}

function nameValidator(dataInput) {
  dataInput.addEventListener("blur", () => {
    checkForNumbers(dataInput);
    if (dataInput.value.length === 0) {
      dataInput.parentElement.classList.add("please-fill");
      dataInput.parentElement.classList.remove("no-numbers");
      dataInput.parentElement.classList.remove("input-allowed");
      dataInput.parentElement.classList.remove("correct-your-name");
      nameAllowed = false;
      console.log("nameAllowed : ", nameAllowed);
    } else if (isNumber) {
      dataInput.parentElement.classList.add("no-numbers");
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("input-allowed");
      dataInput.parentElement.classList.remove("correct-your-name");
      nameAllowed = false;
      console.log("nameAllowed : ", nameAllowed);
    } else if (dataInput.value.length < 8) {
      dataInput.parentElement.classList.add("correct-your-name");
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("input-allowed");
      dataInput.parentElement.classList.remove("no-numbers");
      nameAllowed = false;
      console.log("nameAllowed : ", nameAllowed);
    } else {
      dataInput.parentElement.classList.add("input-allowed");
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("correct-your-name");
      dataInput.parentElement.classList.remove("no-numbers");
      nameAllowed = true;
      console.log("nameAllowed : ", nameAllowed);
    }
  });
}

function checkForNumbers(nameInput) {
  var allNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < allNumbers.length; i++) {
    if (nameInput.value.includes(allNumbers[i])) {
      isNumber = true;
      break;
    } else {
      isNumber = false;
    }
  }
}

function mailValidator(dataInput) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  dataInput.addEventListener("blur", () => {
    if (dataInput.value.length === 0) {
      dataInput.parentElement.classList.add("please-fill");
      dataInput.parentElement.classList.remove("wrong-mail-format");
      dataInput.parentElement.classList.remove("input-allowed");
      mailAllowed = false;
      console.log("mailAllowed : ", mailAllowed);
    } else if (!dataInput.value.match(mailformat)) {
      dataInput.parentElement.classList.add("wrong-mail-format");
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("input-allowed");
      mailAllowed = false;
      console.log("mailAllowed : ", mailAllowed);
    } else {
      dataInput.parentElement.classList.add("input-allowed");
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("wrong-mail-format");
      mailAllowed = true;
      console.log("mailAllowed : ", mailAllowed);
    }
  });
}

function passwordValidator(dataInput) {
  dataInput.addEventListener("blur", () => {
    if (dataInput.value.length === 0) {
      dataInput.parentElement.classList.add("please-fill");
      dataInput.parentElement.classList.remove("character-610");
      dataInput.parentElement.classList.remove("input-allowed");
      passwordAllowed = false;
      console.log("passwordAllowed : ", passwordAllowed);
    } else if (dataInput.value.length < 6 || dataInput.value.length > 10) {
      dataInput.parentElement.classList.add("character-610");
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("input-allowed");
      passwordAllowed = false;
      console.log("passwordAllowed : ", passwordAllowed);
    } else {
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("character-610");
      dataInput.parentElement.classList.add("input-allowed");
      passwordAllowed = true;
      console.log("passwordAllowed : ", passwordAllowed);
    }
  });
}

function chucvuValidator(dataInput) {
  dataInput.addEventListener("blur", () => {
    if (dataInput.value === "Chọn chức vụ") {
      dataInput.parentElement.classList.add("please-select");
      dataInput.parentElement.classList.remove("input-allowed2");
      chucvuAllowed = false;
      console.log("chucvuAllowed :", chucvuAllowed);
    } else {
      dataInput.parentElement.classList.add("input-allowed2");
      dataInput.parentElement.classList.remove("please-select");
      chucvuAllowed = true;
      console.log("chucvuAllowed :", chucvuAllowed);
    }
  });
}

function luongValidator(dataInput) {
  dataInput.addEventListener("blur", () => {
    if (dataInput.value.length === 0) {
      dataInput.parentElement.classList.add("please-fill");
      dataInput.parentElement.classList.remove("luong-limit");
      dataInput.parentElement.classList.remove("input-allowed");
      luongAllowed = false;
      console.log("luongAllowed : ", luongAllowed);
    } else if (dataInput.value < 1000000 || dataInput.value > 20000000) {
      dataInput.parentElement.classList.add("luong-limit");
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("input-allowed");
      luongAllowed = false;
      console.log("luongAllowed : ", luongAllowed);
    } else {
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("luong-limit");
      dataInput.parentElement.classList.add("input-allowed");
      luongAllowed = true;
      console.log("luongAllowed : ", luongAllowed);
    }
  });
}

function gioLamValidator(dataInput) {
  dataInput.addEventListener("blur", () => {
    if (dataInput.value.length === 0) {
      dataInput.parentElement.classList.add("please-fill");
      dataInput.parentElement.classList.remove("giolam-limit");
      dataInput.parentElement.classList.remove("input-allowed");
      giolamAllowed = false;
      console.log("giolamAllowed : ", giolamAllowed);
    } else if (dataInput.value < 80 || dataInput.value > 200) {
      dataInput.parentElement.classList.add("giolam-limit");
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("input-allowed");
      giolamAllowed = false;
      console.log("giolamAllowed : ", giolamAllowed);
    } else {
      dataInput.parentElement.classList.remove("please-fill");
      dataInput.parentElement.classList.remove("giolam-limit");
      dataInput.parentElement.classList.add("input-allowed");
      giolamAllowed = true;
      console.log("giolamAllowed : ", giolamAllowed);
    }
  });
}

function numberToVND(num) {
  let myX = 15000000;
  num = num.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return num;
}

class Nhanvien {
  constructor(
    tknv,
    name,
    email,
    password,
    datepicker,
    luongCB,
    chucvu,
    gioLam
  ) {
    this.tknv = tknv;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = luongCB;
    this.chucvu = chucvu;
    this.gioLam = gioLam;
  }
}

Nhanvien.prototype.calcSalary = function () {
  if (this.chucvu === "Sếp") {
    return this.luongCB * 3;
  }
  if (this.chucvu === "Trưởng phòng") {
    return this.luongCB * 2;
  }
  if (this.chucvu === "Nhân viên") {
    return this.luongCB * 1;
  }
};

Nhanvien.prototype.calcRank = function () {
  if (this.gioLam >= 192) {
    return "Xuất sắc";
  }
  if (this.gioLam >= 176 && this.gioLam < 192) {
    return "Giỏi";
  }
  if (this.gioLam >= 160 && this.gioLam < 176) {
    return "Khá";
  }
  if (this.gioLam < 160) {
    return "Trung bình";
  }
};
