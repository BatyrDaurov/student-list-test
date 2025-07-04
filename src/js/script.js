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
              <tr>
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
  });
