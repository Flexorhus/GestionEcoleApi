const apiKey = "Bearer e901e02b-beb7-413b-8ddc-916d7aaee0da";
const promoId = new URLSearchParams(window.location.search).get('id');

const promoForm = document.getElementById('editPromoForm');
const studentsList = document.getElementById('studentsList');
const addStudentBtn = document.getElementById('addStudentBtn');
const saveBtn = document.getElementById('saveBtn');
const btnSend = document.getElementById('btnSend');

async function fetchPromoStudents(promoId) {
    try {
        const response = await fetch(`http://146.59.242.125:3009/promos/${promoId}`, {
            method: 'GET',
            headers: {
                "authorization": apiKey,
                "Content-type": "application/json"
            }
        });
        if (!response.ok) throw new Error('Erreur lors de la récupération des élèves de la promo');
        return await response.json();
    } catch (error) {

    }
}

async function addStudentToPromo(promoId, student) {
    try {
        const response = await fetch(`http://146.59.242.125:3009/promos/${promoId}/students`, {
            method: 'POST',
            headers: {
                "authorization": apiKey,
                "Content-type": "application/json"
            },
            body: JSON.stringify(student)
        });
        if (!response.ok) throw new Error('Erreur lors de l\'ajout de l\'élève à la promo');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function removeStudentFromPromo(promoId, studentId) {
    try {
        const response = await fetch(`http://146.59.242.125:3009/promos/${promoId}/students/${studentId}`, {
            method: 'DELETE',
            headers: {
                "authorization": apiKey,
                "Content-type": "application/json"
            }
        });
        if (!response.ok) throw new Error('Erreur lors de la suppression de l\'élève de la promo');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

function displayPromoData(promo) {
    document.getElementById('namePromo').value = promo.name;
}

function displayStudents(students) {
    studentsList.innerHTML = '';
    students.forEach((student) => {
        const studentListItem = document.createElement('p');
        studentListItem.textContent = `Prenom : ${student.firstName} Nom :  ${student.lastName} Age : ${student.age} ans`;
        studentsList.appendChild(studentListItem);
    });
}

async function initPromoForm() {
    const promo = await fetchPromoStudents(promoId);
    displayPromoData(promo);
    displayStudents(promo.students);
}



btnSend.addEventListener('click', async () => {
    await addStudentToPromo(promoId, {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value
    });
    initPromoForm();
});

const backButton = document.createElement('button');
backButton.textContent = 'Retour';
backButton.classList.add("backButton");
document.body.appendChild(backButton);
backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

initPromoForm();