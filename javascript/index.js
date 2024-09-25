let apiKey = "Bearer e901e02b-beb7-413b-8ddc-916d7aaee0da"

function getPromo() {
    fetch('http://146.59.242.125:3009/promos', {
        method: 'GET',
        headers: {
            "authorization": apiKey,
            "Content-type": "application/json"
        }
    }).then((response) => {
        response.json().then((data) => {
            console.log(data);
            const promoDiv = document.getElementById('sectionPromo');
            promoDiv.innerHTML = ""
            data.forEach(promo => {
                displayPromo(promo)
            });
        })
    })
}

// Fonction pour ajouter la promo en page d'accueil
function addPromo() {
    let promos = {
        name: document.querySelector("#name").value,
        startDate: document.querySelector("#startDate").value,
        endDate: document.querySelector("#endDate").value,
    };
    console.log(startDate);
    fetch('http://146.59.242.125:3009/promos', {
        method: 'POST',
        headers: {
            "authorization": apiKey,
            "Content-type": "application/json"
        },
        body: JSON.stringify(promos)
    }).then((response) => {
        response.json().then((data) => {
            console.log(data);
            getPromo()
        });
    });
}

// Fonction pour afficher la promotion dans sectionPromo
function displayPromo(promos) {
    console.log(promos);
    const promoDiv = document.getElementById('sectionPromo');

    const nameElement = document.createElement('p');
    const startDateElement = document.createElement('p');
    const endDateElement = document.createElement('p');
    const buttonDelete = document.createElement('button');
    const buttonEdit = document.createElement('button');

    buttonDelete.classList.add("buttonDelete");
    buttonEdit.classList.add("buttonEdit");

    buttonDelete.addEventListener('click', () => {
        removeDisplayedPromo(promos._id)
    });

    buttonEdit.addEventListener('click', () => {
        window.location.href = `editPromo.html?id=${promos._id}`;
    });

    const container = document.createElement('div')
    nameElement.innerText = `Nom: ${promos.name}`;
    let startDate = new Date(promos.startDate).toLocaleDateString();
    let endDate = new Date(promos.endDate).toLocaleDateString();
    startDateElement.textContent = `Date de début: ${startDate}`;
    endDateElement.textContent = `Date de fin: ${endDate}`;
    buttonDelete.textContent = "Delete Promo ";
    buttonEdit.textContent = "Edit Promo";

    container.appendChild(nameElement);
    container.appendChild(startDateElement);
    container.appendChild(endDateElement);
    container.appendChild(buttonDelete);
    container.appendChild(buttonEdit);

    promoDiv.appendChild(container);
}
getPromo()


// Fonction pour supprimer une promotion affichée
function removeDisplayedPromo(id) {

    fetch('http://146.59.242.125:3009/promos/' + id, {
        method: 'DELETE',
        headers: {
            "authorization": apiKey,
            "Content-type": "application/json"
        },
    }).then((response) => {
        response.json().then((data) => {
            getPromo()

        })
    })
}

const btnSend = document.getElementById('btnSend');
btnSend.addEventListener('click', addPromo);

// const btnPut = document.getElementById('btnPut')
// btnSend.addEventListener('click',)

