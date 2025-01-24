//dá loading nas skills a partir do json
async function loadSkills() {
    const skillsContainer = document.getElementById('skills-container')
    try {
        const resposta = await fetch('./language.json');
        const skills = await resposta.json();
        console.log(skills);
        skills.forEach(skill => {
            const listItem = document.createElement("li");
            listItem.classList.add('card');

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card2');

            const skillName = document.createElement('p')
            skillName.classList.add('card_title')
            skillName.textContent = skill.name

            const skillImg = document.createElement('img')
            skillImg.classList.add('card_img')
            skillImg.src = skill.image;
            skillImg.alt = ` logo do ${skillName}`


            cardDiv.appendChild(skillName);
            cardDiv.appendChild(skillImg);
            listItem.appendChild(cardDiv);
            skillsContainer.appendChild(listItem);

        });

    }
    catch (error) {
        console.error("Erro ao carregar as skills:", error)
    }
}

//config particles.js
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80, // Número de partículas
            density: {
                enable: true,
                value_area: 800, // Área onde partículas são distribuídas
            },
        },
        color: {
            value: "#00ff75", // Cor das partículas
        },
        shape: {
            type: "circle", // Formato: "circle", "edge", "triangle", "polygon", "star"
            stroke: {
                width: 0,
                color: "#000000",
            },
            polygon: {
                nb_sides: 5, // Número de lados (se polygon for usado)
            },
        },
        opacity: {
            value: 0.5,
            random: false,
        },
        size: {
            value: 3,
            random: true,
        },
        line_linked: {
            enable: true,
            distance: 150, // Distância máxima para conectar partículas
            color: "#00ff75",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none", // Direção: "none", "top", "top-right", "right", etc.
            random: false,
            straight: false,
            out_mode: "out", // Comportamento: "out", "bounce", etc.
            bounce: false,
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse", // "grab", "bubble", "repulse"
            },
            onclick: {
                enable: true,
                mode: "push", // "push", "remove", "bubble", "repulse"
            },
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: {
                distance: 200,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true,
});

 


loadSkills();


