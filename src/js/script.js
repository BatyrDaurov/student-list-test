/* Нахожу таблицу студентов */
const html = document.querySelector("#data");

/* отправляю запрос на бэк */
const data = fetch("https://admissioncampaign-l2u0.onrender.com/api/students")
  .then((res) => res.json()) /* форматирую в json */
  .then((data) => {
    html.innerHTML = ""; /* очищаю все внутри таблицы */
    data.forEach((student) => {
      /* итерируюсь по массиву студентов (по тому что отформатировали then((res) => res.json())) */
      const str = `
              <tr class="link-to-student" data-studentid="${student.id}">
                <td>${student.surname} ${student.name} ${student.patronymic}</td>
                <td>${student.city}</td>
                <td>${student.birthDay}</td>
                <td>${student.department}</td>
                <td>${student.certificatePoints}</td>
              </tr>
            `; /* записываю каждого данные каждого студента в строку */

      /* добавляю строку в html */
      html.innerHTML += str;
    });
  })
  .then(() =>
    /* чтоб при клике на студента открывалась его страница */
    document.querySelectorAll(".link-to-student").forEach((student) => {
      student.addEventListener("click", () => {
        location.href = `${document.URL.split("/")[0]}//${
          document.location.host
        }/student/${student.getAttribute("data-studentid")}`;
      });
    })
  );

/* забираю каждый html элемент формы */
const formData = {
  fio: document.getElementById("fio"),
  city: document.getElementById("city"),
  department: document.getElementById("department"),
  birthdate: document.getElementById("birthdate"),
  grade: document.getElementById("grade"),
};
const formElement = document.getElementById("form-student");
const formButton = document.getElementById("add-form-button");

formButton.addEventListener("click", (event) => {
  event.preventDefault(); // чтоб страница не перезагружалась при нажатии на кнопку

  /* Базовая валидация данных */
  if (formData.fio.value.split(" ").length !== 3) {
    alert("Невалидное имя");
    return;
  } else if (formData.city.value.length < 3) {
    alert("Невалидный город");
    return;
  } else if (formData.department.value.length < 3) {
    alert("Невалидный отдел");
    return;
  } else if (formData.grade.value <= 2 || formData.grade.value > 5) {
    alert("Невалидная оценка");
    return;
  } else if (!formData.birthdate.value) {
    alert("Невалидная дата");
    return;
  }

  /*
  какие поля отправлять на бэк, посмотрел на сайте бэка
  https://admissioncampaign-l2u0.onrender.com/swagger-ui/index.html#/student-controller/create
  */
  const data = {
    surname: formData.fio.value.split(" ")[0].trim(),
    name: formData.fio.value.split(" ")[1].trim(),
    patronymic: formData.fio.value.split(" ")[2].trim(),
    city: formData.city.value.trim(),
    birthDay: formData.birthdate.value.trim(),
    group: "ИС-31",
    department: formData.department.value.trim(),
    certificatePoints: formData.grade.value.trim(),
  };

  /* отправляем на бэк */
  fetch("https://admissioncampaign-l2u0.onrender.com/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => location.reload());
});
