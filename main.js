// Define the projects data structure
// should add functionality to have other external links (ie. project websites and associated presentations)
// also should add functionality so that only one-two rows should should be displayed at a time, with a button to show more
const projects = [
    {
        title: "Animation Lab",
        description: "Pygame Application to test 2-D character animations.",
        languages: ["Python", "Pygame"],
        githubLink: "https://github.com/IsaiahPhilip/Animation-Lab"
    },
    {
        title: "This Website",
        description: "Personal website to showcase projects and resume, while expanding my front-end development skills.",
        languages: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/IsaiahPhilip/IsaiahPhilip.github.io"
    },
    {
        title: "Spotify Wrapped App",
        description: "Codeveloped an android application that generates a 'Spotify Wrap' based on user's listening history.",
        languages: ["Java", "XML", "Firebase"],
        githubLink: "https://github.com/prajwalsaokar/2340Project2"
    },
    {
        title: "2-D Kinematic Motion",
        description: "Demonstrative 2-Dimensional kinematics simulator to assist Introductory Physics students",
        languages: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/IsaiahPhilip/IsaiahPhilip.github.io",
        executibleLink: "https://isaiahphilip.github.io/2D-Kinematic-Motion/",
    },
];

const predefinedColors = [
    '#FFC2B4', '#B4FFBE', '#B4D6FF', '#FFB4DE', '#DDB4FF', '#FFFEB4', '#BEFFBC', '#BCBCFF'
];

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
}

function createProjectItem(project) {
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';
    projectItem.style.backgroundColor = getRandomColor();

    const projectHeader = document.createElement('div');
    projectHeader.className = 'project-header';

    const projectTitle = document.createElement('h3');
    projectTitle.textContent = project.title;

    const projectLink = document.createElement('a');
    projectLink.href = project.githubLink;
    projectLink.target = "_blank";

    const githubImage = document.createElement('img');
    githubImage.src = 'images/github_img.png'; // Path to your image
    githubImage.alt = 'GitHub Link';
    githubImage.style.width = '30px'; // Adjust the size as needed
    githubImage.style.height = '30px'; // Adjust the size as needed
    githubImage.classList.add('transparent-white'); // Add the CSS class

    if(project.executibleLink !== undefined) {
        const execLink = document.createElement('a');
        execLink.href = project.executibleLink;
        execLink.target = "_blank";
        
        const playImage = document.createElement('img');
        playImage.src = 'images/play.jpg'; // Path to your image
        playImage.alt = 'Executable Link';
        playImage.style.width = '30px'; // Adjust the size as needed
        playImage.style.height = '30px'; // Adjust the size as needed
        playImage.style.marginRight = '10px'; // Adjust the size as needed
        playImage.classList.add('transparent-white'); // Add the CSS class
        projectLink.appendChild(playImage);
    }

    projectLink.appendChild(githubImage);
    
        
    projectItem.appendChild(projectTitle);
    projectItem.appendChild(projectLink);

    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.description;

    // const projectLanguages = document.createElement('p');
    // projectLanguages.textContent = `Languages: ${project.languages.join(', ')}`;

    projectItem.appendChild(projectHeader);
    projectItem.appendChild(projectDescription);
    // projectItem.appendChild(projectLanguages);

    return projectItem;
}

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects');
    projects.forEach(project => {
        const projectItem = createProjectItem(project);
        projectsContainer.appendChild(projectItem);
    });
});

