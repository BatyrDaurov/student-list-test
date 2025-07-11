const urlsudent = document.URL
const spliturl = urlsudent.split('/')
const studentId = spliturl[spliturl.length - 1]

const html = document.querySelector("#user-data");

/* отправляю запрос на бэк */
const data = fetch(`https://admissioncampaign-l2u0.onrender.com/api/students/${studentId}`)
  .then((res) => res.json()) /* форматирую в json */
  .then((data) => {
    html.innerHTML = ""; /* очищаю все внутри таблицы */
    
      /* итерируюсь по массиву студентов (по тому что отформатировали then((res) => res.json())) */
      const str = `
              <tr class="link-to-student" data-studentid="${data.id}">
                <td>${data.surname} ${data.name} ${data.patronymic}</td>
                <td>${data.city}</td>
                <td>${data.birthDay}</td>
                <td>${data.department}</td>
                <td>${data.certificatePoints}</td>
              </tr>
            `; /* записываю каждого данные каждого студента в строку */

      /* добавляю строку в html */
      html.innerHTML += str;
    });
  