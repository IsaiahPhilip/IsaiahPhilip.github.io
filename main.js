// Define the projects data structure
// should add functionality to have other external links (ie. project websites and associated presentations)
// also should add functionality so that only one-two rows should should be displayed at a time, with a button to show more
const projects = [
    {
        title: "Animation Lab",
        description: "Pygame Application to test 2-D character animations.",
        tools: ["Python", "Pygame"],
        complete: false,
        githubLink: "https://github.com/IsaiahPhilip/Animation-Lab",
        startdate: "July 2024"
    },
    {
        title: "This Website",
        description: "Personal website to showcase projects and resume, while expanding my front-end development skills.",
        complete: false,
        tools: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/IsaiahPhilip/IsaiahPhilip.github.io",
        startdate: "October 2024"
    },
    {
        title: "Spotify Wrapped App",
        description: "Codeveloped an android application that generates a 'Spotify Wrap' based on user's listening history.",
        complete: true,
        tools: ["Java", "XML", "Firebase"],
        startdate: "March 2024",
        enddate: "April 2024"
    },
    {
        title: "2-D Kinematic Motion",
        description: "Demonstrative 2-Dimensional kinematics simulator to assist Introductory Physics students",
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
        complete: false,
        tools: ["Unity", "Aseprite"],
        startdate: "August 2024"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');

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
            console.log('here');
            end = project.enddate;
        } else {
            console.log('there');
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
            <p><strong>Tools:</strong> ${project.tools.join(', ')}</p>
            <div class="project-links">
                ${project.githubLink ? `
                <a href="${project.githubLink}" target="_blank">
                    <img src="images/github_img.png" alt="GitHub Link" style="width: 24px; height: 24px;">
                </a>` : ''}
                ${project.executibleLink ? `
                <a href="${project.executibleLink}" target="_blank" class="button">
                    <img src="images/play.jpg" alt="Run Link" style="width: 24px; height: 24px;">
                </a>` : ''}
            </div>
        `;

        // if(!project.githubLink) {
        //     const github = document.getElementById('github');
        //     github.style.display = none;
        // }

        projectsContainer.appendChild(projectElement);
    });
});