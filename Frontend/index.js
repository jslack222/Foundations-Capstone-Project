
const submitAppt = document.querySelector("#submit");
const apptType = document.querySelector("#apptType");
const nameInput = document.querySelector("#nameInput");
const dateInput = document.querySelector("#dateInput");
const emailInput = document.querySelector("#emailInput");
const apptList = document.querySelector('#apptList')
const getApptBtn = document.querySelector('#getAppt')



function createAppt(evt) {
  evt.preventDefault();

  if (nameInput.value < 1) {
    alert("You must provide your name to continue");
    return;
  }
  if (dateInput.value < 1) {
    alert('Date field is required')
    return
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
      .then(() => {
        nameInput.value = ''
        getAppt()
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
                let apptCard = `<h3>Your Scheduled!<h3><div class="appt-card">
                <h2>Thank you ${elem.name}, we will see you on
                ${elem.date} for ${elem.type}</h2>
                <button id= "delete" onclick="deleteCard(${elem["appt_id"]})"><img src="/images/delete.png" /></button>
                </div><style> h2 {background-color: white} h2{font-size: 2vh} 
                h2 {display: inline-block} h2 {justify-content: center}
                h2{padding: 4vh 4vh 4vh 4vh} h2 {border-radius: 20px} button img {height: 4vh} h3 {color: white} h2 {color: black} 
                #delete {background-color: transparent} #delete {border: none} h3 {margin: 4vh 4vh} 
                }
                ; <style>`;

                apptList.innerHTML += apptCard
        })
    })
}




submitAppt.addEventListener("click", createAppt);
getApptBtn.addEventListener('click', getAppt)
