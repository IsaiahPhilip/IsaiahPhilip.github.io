document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-image');
            const description = item.querySelector('.gallery-description').textContent;
            modal.style.display = 'block';
            modalImage.src = img.src;
            modalCaption.textContent = description;
        });
    });

    window.closeModal = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});

document.addEventListener('DOMContentLoaded', () => {
    let currentImageIndex = 0;
    const images = document.querySelectorAll('.carousel-image');
    images[currentImageIndex].classList.add('active');

    window.prevImage = function() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        images[currentImageIndex].classList.add('active');
    };

    window.nextImage = function() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    };
});

// Define the projects data structure
// should add functionality to have other external links (ie. project websites and associated presentations)
// also should add functionality so that only one-two rows should should be displayed at a time, with a button to show more
const projects = [
    {
        title: "Animation Lab",
        description: "Pygame Application to test 2-D character animations.",
        longer_description: "I want to make a simple application that allows me to test 2-D character animations. I want to be able to load in a sprite sheet and then be able to play the animation. I also want to be able to change the speed of the animation and the size of the sprite. I want to be able to load in multiple sprite sheets and switch between them. I also want to be able to change the background color and the size of the window.",
        tools: ["Python", "Pygame"],
        complete: false,
        githubLink: "https://github.com/IsaiahPhilip/Animation-Lab",
        startdate: "July 2024"
    },
    {
        title: "This Website",
        description: "Personal website to showcase projects and resume, while expanding my front-end development skills.",
        longer_description: "As you can tell I am currently working on this website. I want to make a personal website that showcases my projects and resume in a way unique to my skills. I expect to update the project section frequently so I made a json object to hold each project.",
        complete: false,
        tools: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/IsaiahPhilip/IsaiahPhilip.github.io",
        startdate: "October 2024"
    },
    {
        title: "Spotify Wrapped App",
        description: "Codeveloped an android application that generates a 'Spotify Wrap' based on user's listening history.",
        complete: true,
        longer_description: "",
        tools: ["Java", "XML", "Firebase"],
        startdate: "March 2024",
        enddate: "April 2024"
    },
    {
        title: "2-D Kinematic Motion",
        description: "Demonstrative 2-Dimensional kinematics simulator to assist Introductory Physics students",
        longer_description: "",
        complete: true,
        tools: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/IsaiahPhilip/IsaiahPhilip.github.io",
        executibleLink: "https://isaiahphilip.github.io/2D-Motion-Web-App/",
        startdate: "January 2023",
        enddate: "December 2023"
    },
    {
        title: "Gaming For Electric Power Grids",
        description: "Designing 3D and 2D assets for an electric power grid simulation game",
        longer_description: "",
        complete: false,
        tools: ["Unity", "Aseprite"],
        startdate: "August 2024"
    }
];

let show_clicked = false;
let sfx_clicks = 0;
let labelText = '';

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    const clickSound = document.getElementById('click-sound');

    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    projects.sort((a, b) => {
        const dateA = new Date(a.enddate || a.startdate);
        const dateB = new Date(b.enddate || b.startdate);
        return dateB - dateA;
    });

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        
        let end;
        if(project.complete) {
            end = project.enddate;
        } else {
            end = "present";
        }


        projectElement.innerHTML = `
            <div class="project-header">
                <h3>${project.title}</h3>
                <span class="project-dates">
                    ${project.startdate} ${end ? `- ${end}` : ''}
                </span>
            </div>
            <p>${project.description}</p>
            <div class="longer-description" style="display: none;">
                <p>${project.longer_description}</p>
                <p><strong>Tools:</strong> ${project.tools.join(', ')}</p>
                <div class="project-links">
                    ${project.githubLink ? `
                    <a href="${project.githubLink}" target="_blank">
                        <img src="images/github_img.png" alt="GitHub Link" style="width: 30px; height: 30px; padding:10px;">
                    </a>` : ''}
                    ${project.executibleLink ? `
                    <a href="${project.executibleLink}" target="_blank" class="button">
                        <img src="images/play.png" alt="Run Link" style="width: 30px; height: 30px; padding:10px;">
                    </a>` : ''}
                </div>
            </div>
            <button class="show-more">
                &#x25BC; <span class="show-more-text">Show More</span> &#x25BC;
            </button>
            
        `;

        const showMoreButton = projectElement.querySelector('.show-more');
        const longerDescription = projectElement.querySelector('.longer-description');

        showMoreButton.addEventListener('click', () => {
            const toggleSoundCheckbox = document.getElementById('toggle-sound');
            const toggleSoundLabel = document.getElementById('toggle-sound-label');
            if(!show_clicked) {
                toggleSoundLabel.style.display = 'inline'; // Reveal the toggle sound feature
                show_clicked = true;
            }
            if (longerDescription.style.display === 'none') {
                console.log(toggleSoundCheckbox.checked, show_clicked);
                if (show_clicked && toggleSoundCheckbox.checked) {
                    sfx_clicks++;
                    console.log(sfx_clicks);
                    if(sfx_clicks==1){
                        toggleSoundLabel.innerHTML = '<input type="checkbox" id="toggle-sound"> huh... maybe try again?';
                        toggleSoundCheckbox.checked = false;
                    }
                    if(sfx_clicks==2){
                        toggleSoundLabel.innerHTML = '<input type="checkbox" id="toggle-sound"> hmmm';
                        toggleSoundCheckbox.checked = false;
                    }
                    if(sfx_clicks==3){
                        toggleSoundLabel.innerHTML = '<input type="checkbox" id="toggle-sound"> guess your going to have to live with it';
                        toggleSoundCheckbox.checked = false;
                    }
                    if(sfx_clicks==4){
                        toggleSoundLabel.innerHTML = '<input type="checkbox" id="toggle-sound"> is it that bad?';
                        toggleSoundCheckbox.checked = false;
                    }
                    if(sfx_clicks==5){
                        toggleSoundLabel.innerHTML = '<input type="checkbox" id="toggle-sound"> sorry...';
                        toggleSoundCheckbox.checked = false;
                    }
                    if(sfx_clicks>5){
                        toggleSoundCheckbox.checked = false;
                    }
                    clickSound.play(); // Play the sound if checkbox is checked
                } else {
                    clickSound.play(); // Play the sound if checkbox is not checked
                }
                longerDescription.style.display = 'block';
                showMoreButton.innerHTML = '&#x25B2; <span class="show-more-text">Show Less</span> &#x25B2;'; // Up chevron
            } else {
                longerDescription.style.display = 'none';
                showMoreButton.innerHTML = '&#x25BC; <span class="show-more-text">Show More</span> &#x25BC;'; // Down chevron
            }
        });

        projectsContainer.appendChild(projectElement);
    });
});