// Datos de las peleas con las imágenes actualizadas
const fights = [
    {
        id: 1,
        title: "Peso Pluma - Título",
        fighter1: {
            name: "Ilia Topuria",
            rank: "C",
            country: "Georgia",
            odds: "-238",
            image: "img/TOPURIA_ILIA_L_BELT_02-17.png"
        },
        fighter2: {
            name: "Max Holloway",
            rank: "#2",
            country: "Estados Unidos",
            odds: "+195",
            image: "img/HOLLOWAY_MAX_R_04-13.png"
        }
    },
    {
        id: 2,
        title: "Peso Medio",
        fighter1: {
            name: "Robert Whittaker",
            rank: "#3",
            country: "Australia",
            odds: "+210",
            image: "img/WHITTAKER_ROBERT_L_06-22.png"
        },
        fighter2: {
            name: "Khamzat Chimaev",
            rank: "#13",
            country: "Emiratos Árabes Unidos",
            odds: "-258",
            image: "img/CHIMAEV_KHAMZAT_R_10-30.png"
        }
    },
    {
        id: 3,
        title: "Peso Semipesado",
        fighter1: {
            name: "Magomed Ankalaev",
            rank: "#1",
            country: "Rusia",
            odds: "-380",
            image: "img/ANKALAEV_MAGOMED_L_01-13.png"
        },
        fighter2: {
            name: "Aleksandar Rakić",
            rank: "#5",
            country: "Serbia",
            odds: "+300",
            image: "img/RAKIC_ALEKSANDAR_R_04-13.png"
        }
    },
    {
        id: 4,
        title: "Peso Pluma",
        fighter1: {
            name: "Lerone Murphy",
            rank: "#12",
            country: "Inglaterra",
            odds: "-270",
            image: "img/MURPHY_LERONE_L_05-18.png"
        },
        fighter2: {
            name: "Dan Ige",
            rank: "#14",
            country: "Estados Unidos",
            odds: "+220",
            image: "img/IGE_DAN_R_09-23.png"
        }
    },
    {
        id: 5,
        title: "Peso Medio",
        fighter1: {
            name: "Shara Magomedov",
            country: "Rusia",
            odds: "-155",
            image: "img/MAGOMEDOV_SHARA_L_08-03.png"
        },
        fighter2: {
            name: "Armen Petrosyan",
            country: "Armenia",
            odds: "+130",
            image: "img/PETROSYAN_ARMEN_R_02-10.png"
        }
    }
];

// Estado de las selecciones del usuario
let userSelections = {};

// Generar las tarjetas de combates
function generateFightCards() {
    const container = document.getElementById('fightsContainer');
    fights.forEach(fight => {
        const fightCard = `
            <div class="fight-card">
                <h2>${fight.title}</h2>
                <div class="fighters">
                    <div class="fighter" onclick="selectFighter(${fight.id}, '${fight.fighter1.name}')">
                        <div><strong>${fight.fighter1.rank}</strong></div>
                        <img src="${fight.fighter1.image}" alt="${fight.fighter1.name}">
                        <h3>${fight.fighter1.name}</h3>
                        <p>${fight.fighter1.country}</p>
                        <p>Posibilidades: ${fight.fighter1.odds}</p>
                    </div>
                    <div class="fighter" onclick="selectFighter(${fight.id}, '${fight.fighter2.name}')">
                        <div><strong>${fight.fighter2.rank}</strong></div>
                        <img src="${fight.fighter2.image}" alt="${fight.fighter2.name}">
                        <h3>${fight.fighter2.name}</h3>
                        <p>${fight.fighter2.country}</p>
                        <p>Posibilidades: ${fight.fighter2.odds}</p>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += fightCard;
    });
}

// Mostrar toast
function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Seleccionar un peleador
function selectFighter(fightId, fighterName) {
    userSelections[fightId] = fighterName;
    
    // Actualizar visualización
    const fightCard = document.querySelectorAll('.fight-card')[fightId - 1];
    const fighters = fightCard.querySelectorAll('.fighter');
    
    fighters.forEach(fighter => {
        const name = fighter.querySelector('h3').textContent;
        if (name === fighterName) {
            fighter.classList.add('selected');
        } else {
            fighter.classList.remove('selected');
        }
    });
}

// Validar que todos los combates hayan sido seleccionados
function validateSelections() {
    if (Object.keys(userSelections).length !== fights.length) {
        showToast('Por favor, selecciona un ganador para cada combate', 'error');
        return false;
    }
    return true;
}

// Guardar selecciones y preparar el envío
document.getElementById('ufcForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value.trim();
    const userEmail = document.getElementById('userEmail').value.trim();

    if (!userName || !userEmail) {
        showToast('Por favor, completa tu nombre y email', 'error');
        return;
    }

    if (!validateSelections()) {
        return;
    }

    // Formatear las selecciones
    let selectionsText = '';
    fights.forEach(fight => {
        selectionsText += `${fight.title}: ${userSelections[fight.id]}\n`;
    });

    // Poner las predicciones en el campo oculto
    document.getElementById('predictions').value = selectionsText;

    // Ahora enviará el formulario con las predicciones a Formspree
    this.submit();
});

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    generateFightCards();
});
