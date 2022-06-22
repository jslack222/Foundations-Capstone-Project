
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
    .post("/appointments", apptObj)
      .then(() => {
        nameInput.value = ''
        getAppt()
    })
    .catch((err) => console.log(err));
}
function deleteCard(id) {
  axios
    .delete(`/appointments/${id}`)
    .then(() => getAppt())
    .catch((err) => console.log(err));
}
function getAppt() {
    apptList.innerHTML = ''
    axios.get('/appointments')
        .then(res => {
            res.data.forEach(elem => {
                let apptCard = `<h3 id = "title1">Your Scheduled!<h3><div class="appt-card">
                <h2>Thank you ${elem.name}, we will see you on
                ${elem.date} for ${elem.type}</h2>
                <button id= "delete" onclick="deleteCard(${elem["appt_id"]})"><img class="trash" src="/images/delete.png" /></button>
                </div><style> h2 {background-color: rgba(53, 206, 255, .6)} h2{font-size: 2vh} 
                h2 {display: inline-block} h2 {justify-content: center}
                h2{padding: 4vh 4vh 4vh 4vh} h2 {border-radius: 20px} button img {height: 4vh} h3 {color: white} h2 {color: white} 
                #delete {background-color: transparent} #delete {border: none} h3 {margin: 4vh 4vh} #delete:hover {cursor:pointer} 
                .appt-card {display: flex} .appt-card {justify-content: center} h3 {display: flex} h3 {justify-content: center}
                
                }
                ; <style>`;

              apptList.innerHTML += apptCard
              
            }) 
    })
}




submitAppt.addEventListener("click", createAppt);
getApptBtn.addEventListener('click', getAppt)
document.addEventListener('mouseover', (evt) => {
  if (evt.target && evt.target.classList == 'trash') {
    evt.target.src = "/images/redtrash.png"
  }
})
document.addEventListener("mouseout", (evt) => {
  if (evt.target && evt.target.classList == "trash") {
    evt.target.src = "/images/delete.png";
  }
});
