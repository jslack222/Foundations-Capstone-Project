
const submitAppt = document.querySelector("#submit");
const apptType = document.querySelector("#apptType");
const nameInput = document.querySelector("#nameInput");
const dateInput = document.querySelector("#dateInput");
const emailInput = document.querySelector("#emailInput");
const apptList = document.querySelector('#apptList')


function createAppt(evt) {
  evt.preventDefault();

  if (nameInput.value < 1) {
    alert("You must provide your name");
    return;
  }

  let apptObj = {
    type: apptType.value,
    name: nameInput.value,
    date: dateInput.value,
    email: emailInput.value,
  };
  console.log(apptObj);
  axios
    .post("http://localhost:5002/appointments", apptObj)
      .then((res) => {
        
    })
    .catch((err) => console.log(err));
}
function deleteCard(id) {
  axios
    .delete(`http://localhost:5002/appointments/${id}`)
    .then(() => getAppt())
    .catch((err) => console.log(err));
}
function getAppt() {
    apptList.innerHTML = ''
    axios.get('http://localhost:5002/appointments/')
        .then(res => {
            res.data.forEach(elem => {
                let apptCard = `<div class="appt-card">
                <h2>Thank you ${elem.name}, we will see you on
                ${elem.date} for ${elem.type}>/h2>
                <button onclick="deleteCard(${elem['appt_id']})">Delete</button>
                </div>`

                apptList.innerHTML += apptCard
        })
    })
}

deleteCard()
getAppt()
submitAppt.addEventListener("click", createAppt);
