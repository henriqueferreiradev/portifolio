const openProjectButton = document.querySelector(".button-proj")
const closeProjectButton = document.querySelector(".fechar_modal")
const filtra = document.querySelector('.button_filter')
const modal = document.querySelector('.modal')
document.addEventListener('DOMContentLoaded', () => {
    loadProjetos(null);
    loadSkills();
});

window.addEventListener('scroll', function () {
    const botaoAoTopo = document.querySelector('.botao-retorno')

    if (window.scrollY > 100) {
        botaoAoTopo.classList.add('mostrar')
    }
    else {
        botaoAoTopo.classList.remove('mostrar')
    }
})
//dá loading nos projetos a partir do json
async function loadProjetos(categoria) {
    const projectsCard = document.getElementById('card_area');

    projectsCard.innerHTML = "";

    try {
        const resposta = await fetch('./projects.json');
        const projects = await resposta.json();



        gerarBotoesCategoria(projects, categoria);

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

            const categoria = document.createElement('p');
            categoria.classList.add('card_categoria');
            categoria.textContent = project.categoria;


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
            cardProj.appendChild(categoria)

            projectsCard.appendChild(cardProj);
        });

    }
    catch (error) {
        console.error("Erro ao carregar as skills:", error)
    }
}

//abre o  modal
function abrirModalProject(project) {
    const projectsContainer = document.getElementById('modal')
    const nameProject = document.querySelector(".modal_title")
    const descriptionProject = document.querySelector(".modal_description")
    const repoButton = document.querySelector(".repo")
    const testButton = document.querySelector(".teste")
    const linkedinButton = document.querySelector(".linkedin")
    const modalGallery = document.querySelector(".modal_gallery")
    const skillsList = document.querySelector(".modal_skills");

    if (!nameProject || !descriptionProject || !repoButton || !testButton || !linkedinButton || !modalGallery || !skillsList) {
        console.error("Algum elemento do modal não foi encontrado!");
        return;
    }

    nameProject.textContent = project.name;
    descriptionProject.textContent = project.description;
    skillsList.innerHTML = ""; // Limpa a lista antes de adicionar os itens

    project.lang.forEach(lang => {
        const listItem = document.createElement("li");
        listItem.classList.add('modal_card');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('modal_card2');

        const skillName = document.createElement('p');
        skillName.classList.add('modal_card_title');
        skillName.textContent = lang.name;

        const skillImg = document.createElement('img');
        skillImg.classList.add('modal_card_img');
        skillImg.src = lang.image;
        skillImg.alt = `Logo do ${lang.name}`;

        cardDiv.appendChild(skillName);
        cardDiv.appendChild(skillImg);
        listItem.appendChild(cardDiv);

        skillsList.appendChild(listItem); // Adiciona os itens na UL
    });

    project.links.forEach(link => {
        repoButton.href = link.repositorio
        testButton.href = link.teste
        linkedinButton.href = link.linkedin
    });

    Object.values(project.gallery[0]).forEach(image => {
        const galleryImage = document.createElement("img")
        galleryImage.classList.add('gallery_img')
        galleryImage.src = image
        modalGallery.appendChild(galleryImage)
    });

    abrirModal();
    closeProjectButton.addEventListener('click', fecharModal);
}




function gerarBotoesCategoria(projects, categoriaSelecionada) {
    const filtroContainer = document.getElementById("filtro_area");
    if (!filtroContainer) {
        console.error("Elemento filtro_area não encontrado.");
        return;
    }

    // Se os botões já existem, apenas atualiza o estado de "active"
    const botoesExistentes = filtroContainer.querySelectorAll("button");
    if (botoesExistentes.length > 0) {
        botoesExistentes.forEach(botao => {
            if (botao.textContent === categoriaSelecionada || (categoriaSelecionada === null && botao.textContent === "Todos")) {
                botao.classList.add("active");
            } else {
                botao.classList.remove("active");
            }
        });
        return; // Evita recriar os botões desnecessariamente
    }

    filtroContainer.innerHTML = ""; // Só limpa se for a primeira vez

    const categorias = [...new Set(projects.map(project => project.categoria))];

    // Cria o botão "Todos"
    const botaoTodos = document.createElement('button');
    botaoTodos.textContent = "Todos";
    botaoTodos.classList.add('button');
    if (categoriaSelecionada === null) botaoTodos.classList.add("active");

    botaoTodos.addEventListener('click', () => {
        loadProjetos(null);
    });

    filtroContainer.appendChild(botaoTodos);

    // Cria os botões de categorias específicas
    categorias.forEach(categoria => {
        const botao = document.createElement('button');
        botao.textContent = categoria;
        botao.classList.add('button');

        if (categoriaSelecionada === categoria) botao.classList.add("active");

        botao.addEventListener('click', () => {
            loadProjetos(categoria);
        });

        filtroContainer.appendChild(botao);
    });
}


//dá loading nas skills a partir do json
async function loadSkills() {
    const skillsContainer = document.getElementById('skills-container')
    try {
        const resposta = await fetch('./language.json');
        const skills = await resposta.json();

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

function baixarPDF() {
    const elemento = document.querySelector('.curriculo'); // Define o que será convertido
    const options = {
        margin: [0, 5, 0, 5],
        filename: 'Curriculo_Henrique_Monteiro.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    html2pdf()
}


