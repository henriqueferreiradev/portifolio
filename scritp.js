const openProjectButton = document.querySelector(".button-proj")
const closeProjectButton = document.querySelector(".fechar_modal")
const filtra = document.querySelector('.button_filter')
const modal = document.querySelector('.modal')
document.addEventListener('DOMContentLoaded', loadProjetos)
document.addEventListener('DOMContentLoaded', loadSkills)



//dá loading nos projetos a partir do json
async function loadProjetos(categoria = null) {
    const projectsCard = document.getElementById('card_area');
     
    projectsCard.innerHTML = "";

    try {
        const resposta = await fetch('./projects.json');
        const projects = await resposta.json();
        console.log(projects);


        gerarBotoesCategoria(projects);

        const projetosFiltrados = categoria
            ? projects.filter(proj => proj.categoria === categoria)
            : projects
        
            projetosFiltrados.forEach(project => {

            const cardProj = document.createElement('div');
            cardProj.classList.add('card_proj');

            const titleDiv = document.createElement("div");
            titleDiv.classList.add('card_proj-title');

            const nameItem = document.createElement('p');
            nameItem.classList.add("title_proj");
            nameItem.textContent = project.name;

            titleDiv.appendChild(nameItem);

            const projectImg = document.createElement('img');
            projectImg.classList.add('card_proj-img');
            projectImg.src = project.background;
            projectImg.alt = `Logo do ${project.name}`;

            const cardProjQuad = document.createElement('div');
            cardProjQuad.classList.add('card_proj-quad');

            const cardDateDiv = document.createElement('div');
            cardDateDiv.classList.add('card_proj-date');

            const projectData = document.createElement('p');
            projectData.textContent = project.data;

            cardDateDiv.appendChild(projectData);

            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('card_proj-button');

            const viewButton = document.createElement('button');
            viewButton.classList.add("button", "button-proj", "download-button");
            viewButton.textContent = "Ver mais...";
            viewButton.addEventListener('click', () => abrirModalProject(project));

            buttonDiv.appendChild(viewButton);
            cardProjQuad.appendChild(cardDateDiv);
            cardProjQuad.appendChild(buttonDiv);

            cardProj.appendChild(projectImg);
            cardProj.appendChild(titleDiv);
            cardProj.appendChild(cardProjQuad);

            projectsCard.appendChild(cardProj);
        });

    }
    catch (error) {
        console.error("Erro ao carregar as skills:", error)
    }
}

//abre o  modal
function abrirModalProject(project) {
    const projectsContainer = document.getElementById('modal_skills-container')
    const nameProject = document.querySelector(".modal_title")
    const descriptionProject = document.querySelector(".modal_description")
    const repoButton = document.querySelector(".repo")
    const testButton = document.querySelector(".teste")
    const linkedinButton = document.querySelector(".linkedin")
    const modalGallery = document.querySelector(".modal_gallery")

    projectsContainer.innerHTML = ""
    modalGallery.innerHTML = ""

    project.lang.forEach(lang => {
        const listItem = document.createElement("li");
        listItem.classList.add('modal_card');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('modal_card2');

        const skillName = document.createElement('p')
        skillName.classList.add('modal_card_title')
        skillName.textContent = lang.name

        const skillImg = document.createElement('img')
        skillImg.classList.add('modal_card_img')
        skillImg.src = lang.image;
        skillImg.alt = ` logo do ${skillName}`

        nameProject.textContent = project.name
        descriptionProject.textContent = project.description



        cardDiv.appendChild(skillName);
        cardDiv.appendChild(skillImg);
        listItem.appendChild(cardDiv);
        projectsContainer.appendChild(listItem);

    }),
        project.links.forEach(link => {
            repoButton.href = link.repositorio
            testButton.href = link.teste
            linkedinButton.href = link.linkedin
        }),

        Object.values(project.gallery[0]).forEach(image => {

            const galleryImage = document.createElement("img")
            galleryImage.classList.add('gallery_img')
            galleryImage.src = image
            modalGallery.appendChild(galleryImage)



        })
    abrirModal()
    closeProjectButton.addEventListener('click', fecharModal)
}
 



function gerarBotoesCategoria(projects) {
    const filtroContainer = document.getElementById("filtro_area");
    filtroContainer.innerHTML = "";

    categorias = [...new Set(projects.map(project => project.categoria))]
    const botaoTodos = document.createElement('button')
    botaoTodos.textContent= "Todos";
    botaoTodos.classList.add('button','download_button', 'active')
    botaoTodos.addEventListener('click', () => {
        document.querySelectorAll(".download_button").forEach(btn => btn.classList.remove("active"));
        botaoTodos.classList.add("active");
         
        loadProjetos(null);
    });
    filtroContainer.appendChild(botaoTodos)

    categorias.forEach(categoria => {
        const botao = document.createElement('button')
        botao.textContent = categoria
        botao.classList.add('button','download_button')
        botao.addEventListener('click', () => {
        document.querySelectorAll(".download_button").forEach(btn => btn.classList.remove("active"));
        botao.classList.add("active");
      
        loadProjetos(categoria);
    });
        filtroContainer.appendChild(botao)
    })

}

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

function abrirModal() {
    modal.classList.add('ativo')
}
function playerVideo() {

}
function fecharModal() {
    modal.classList.remove('ativo')
}
function abrirCurriculo() {

}





