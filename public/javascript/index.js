const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {

  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI
      .getFullList()
      .then(response => {

        let text = ''
        response.data.forEach(elm => text +=
          `<div class="character-info">
        <div class="name">"${elm.name}"</div>
        <div class="occupation">${elm.occupation}"</div>
        <div class="cartoon">${elm.cartoon}"</div>
        <div class=""weapon">${elm.weapon}"</div>
      </div>`)
        document.querySelector('.characters-container').innerHTML = text
        document.querySelector('#fetch-all').classList.add("active")
        setTimeout(() => {
          document.querySelector('#fetch-one').classList.remove("active")
        }, 200);

      })
      .catch(err => console.log('ERROR', err))
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const id = document.querySelector('#getOne').value

    charactersAPI
      .getOneRegister(id)
      .then(response => {

        if (response.data) {

          let text = ''
          response.data
          text +=
            `<div class="character-info">
            <div class="name">"${response.data.name}"</div>
            <div class="occupation">${response.data.occupation}"</div>
            <div class="cartoon">${response.data.cartoon}"</div>
            <div class=""weapon">${response.data.weapon}"</div>
            </div>`
          document.querySelector('.characters-container').innerHTML = text
          document.querySelector('#fetch-one').classList.add("active")
          setTimeout(() => {
            document.querySelector('#fetch-one').classList.remove("active")
          }, 200);

        } else {
          document.querySelector('#fetch-one').classList.add("error")
          setTimeout(() => {
            document.querySelector('#fetch-one').classList.remove("error")
          }, 200);
        }
        document.querySelector('#getOne').value = ""
      })
      .catch(err => console.log('ERROR', err))

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    const id = document.querySelector('#deleteOne').value

    charactersAPI
      .deleteOneRegister(id)
      //.then(result => console.log(result.data))
      .then(result => {
        console.log(result.data)
        document.querySelector('#delete-one').classList.add("error")
        setTimeout(() => {
          document.querySelector('#delete-one').classList.remove("error")
        }, 200);
        document.querySelector('#deleteOne').value = ""
      })
      .catch(err => console.log('ERROR', err))
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')
    const id = document.querySelector('#editCharacter').value

    const character = {
      id: inputs[0].value,
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }

    charactersAPI
      .updateOneRegister(id, character)
      .then(result => {
        console.log(result.data)
        document.querySelector('#fetch-one').classList.add("active")
        setTimeout(() => {
          document.querySelector('#fetch-one').classList.remove("active")
        }, 200);
      })
      .catch(err => console.log('ERROR', err))
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const inputs = document.querySelectorAll("#new-character-form input")

    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
      .createOneRegister(character)
      .then(result => console.log(result.data))
      .catch(err => console.log('ERROR', err))

  });
});
