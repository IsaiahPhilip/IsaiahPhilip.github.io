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
        title: "This Website",
        description: "Personal website to showcase projects and resume, while expanding my front-end development skills.",
        longer_description: "As you can tell I am currently working on this website. I want to make a personal website that showcases my projects and resume in a way unique to my skills. I expect to update the project section frequently so I made a json object to hold each project.",
        complete: true,
        tools: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/IsaiahPhilip/IsaiahPhilip.github.io",
        startdate: "October 2024",
        // enddate: "October 2024"
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
    },
    {
        title: "Blender Comic",
        description: "Created digital, mixed media comic",
        longer_description: "Created a digital comic using pen and ink drawings for characters, blender to build and render backgrounds, and photoshop for paneling",
        executibleLink: "comic.html",
        complete: true,
        tools: ["Photoshop", "Blender"],
        startdate: "January 2025",
        enddate: "March 2025"
    },
    {
        title: "CH1MP",
        description: "Developed a 2D side-scrolling action game for the Game Boy Advance using C",
        longer_description: "Implemented core gameplay systems including collision detection, gravity physics, animation handling, parallax scrolling, and basic enemy AI",
        executibleLink: "https://gbagt.org/gallery/player.html?project=CH1MP",
        githubLink: "https://github.com/IsaiahPhilip/gbafinal",
        complete: true,
        tools: ["C", "Aseprite"],
        startdate: "March 2025",
        enddate: "April 2025"
    },
    {
        title: "ShotViz",
        description: "Codeveloped and designed interactive basketball analytics webapp",
        longer_description: "Codeveloped and designed interactive webapp capable of returning shooting average at a given position on a basketball court based on user input. Codewise, I mainly worked in frontend with React, CSS, and JS. Design-wise I used figma to create the basketball court w/ vector art",
        complete: true,
        githubLink: "https://github.com/IsaiahPhilip/Hackylitics2025",
        executibleLink: "",
        tools: ["React", "Axios", "Figma"],
        startdate: "February 2025",
        // enddate: "February 2025",
    }
];

const workExperiences = [
    {
        title: "Research Assistant - Georgia Institute of Technology (Whiteley Lab)",
        company: "",
        description: "",
        longer_description: "At Georgia Tech’s Whiteley Lab, I co-led the development of a Python-based GUI application that allows researchers to browse, filter, and manage genome data from thousands of Pseudomonas Aeruginosa samples. I also automated the parsing and mapping of genome data using Bash scripts on the PACE high-performance computing cluster. Currently, I'm building the lab’s official website using Framer to improve public engagement and accessibility of our research.",
        complete: false,
        tools: ["Python", "Bash", "Git", "PACE"],
        startdate: "February 2025"
    },
    {
        title: "Research Assistant - Georgia State University",
        company: "",
        description: "",
        longer_description: "I created a browser-based 2D physics simulator designed to support student understanding in introductory physics courses. In addition to developing the tool, I presented our work through an academic poster that detailed the simulator’s technical design, educational goals, and interactive features. The project strengthened my front-end development skills and understanding of educational technology.",
        complete: true,
        tools: ["HTML", "Canvas", "CSS", "JavaScript"],
        startdate: "November 2022",
        enddate: "December 2023"
    },
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

        // Check if either project is ongoing (no end date)
        if (!a.complete && b.complete) {
            return -1; // a is ongoing, b is not, so a comes first
        }
        if (a.complete && !b.complete) {
            return 1; // b is ongoing, a is not, so b comes first
        }

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

document.addEventListener('DOMContentLoaded', () => {
    const workContainer = document.getElementById('work-container');

    workExperiences.forEach(work => {
        const workElement = document.createElement('div');
        workElement.classList.add('work');

        let end;
        if (work.complete) {
            end = work.enddate;
        } else {
            end = "present";
        }

        workElement.innerHTML = `
            <div class="work-header">
                <h3>${work.title}</h3>
                <span class="work-company">${work.company}</span>
                <span class="work-dates">
                    ${work.startdate} ${end ? `- ${end}` : ''}
                </span>
            </div>
            <p>${work.description}</p>
            <div class="longer-description" style="display: none;">
                <p>${work.longer_description}</p>
                <p><strong>Tools:</strong> ${work.tools.join(', ')}</p>
            </div>
            <button class="show-more">
                &#x25BC; <span class="show-more-text">Show More</span> &#x25BC;
            </button>
        `;

        const showMoreButton = workElement.querySelector('.show-more');
        const longerDescription = workElement.querySelector('.longer-description');

        showMoreButton.addEventListener('click', () => {
            if (longerDescription.style.display === 'none') {
                longerDescription.style.display = 'block';
                showMoreButton.innerHTML = '&#x25B2; <span class="show-more-text">Show Less</span> &#x25B2;';
            } else {
                longerDescription.style.display = 'none';
                showMoreButton.innerHTML = '&#x25BC; <span class="show-more-text">Show More</span> &#x25BC;';
            }
        });

        workContainer.appendChild(workElement);
    });
});

const carouselStates = {};

function showArtImage(carouselNum, index) {
    const carousel = document.querySelector(`.art-carousel[data-carousel="${carouselNum}"]`);
    const images = carousel.querySelectorAll('.carousel-image');
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
    carouselStates[carouselNum] = index;
}

window.prevArtImage = function(carouselNum) {
    const carousel = document.querySelector(`.art-carousel[data-carousel="${carouselNum}"]`);
    const images = carousel.querySelectorAll('.carousel-image');
    let idx = carouselStates[carouselNum] ?? 0;
    idx = (idx - 1 + images.length) % images.length;
    showArtImage(carouselNum, idx);
};

window.nextArtImage = function(carouselNum) {
    const carousel = document.querySelector(`.art-carousel[data-carousel="${carouselNum}"]`);
    const images = carousel.querySelectorAll('.carousel-image');
    let idx = carouselStates[carouselNum] ?? 0;
    idx = (idx + 1) % images.length;
    showArtImage(carouselNum, idx);
};

document.addEventListener('DOMContentLoaded', () => {
    fetch('art-manifest.json')
        .then(response => response.json())
        .then(data => {
            const galleryContainer = document.getElementById('gallery-container');
            let carouselNum = 1;
            for (const [series, images] of Object.entries(data)) {
                const carousel = document.createElement('div');
                carousel.className = 'art-carousel';
                carousel.dataset.carousel = carouselNum;

                images.forEach((imgSrc, idx) => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = `${series} Image ${idx + 1}`;
                    img.className = 'carousel-image' + (idx === 0 ? ' active' : '');
                    carousel.appendChild(img);
                });

                carousel.innerHTML += `
                    <button class="carousel-button prev" onclick="prevArtImage(${carouselNum})">&#10094;</button>
                    <button class="carousel-button next" onclick="nextArtImage(${carouselNum})">&#10095;</button>
                    <p class="carousel-caption">${series}</p>
                `;

                galleryContainer.appendChild(carousel);
                carouselNum++;
            }

            // Initialize carousel states
            document.querySelectorAll('.art-carousel').forEach((carousel) => {
                carouselStates[carousel.dataset.carousel] = 0;
                showArtImage(carousel.dataset.carousel, 0);
            });
        });
});

document.addEventListener('DOMContentLoaded', () => {
    let currentImageIndex = 0;
    const aboutImageContainer = document.getElementById('about-image');
    const images = aboutImageContainer.querySelectorAll('.carousel-image');
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