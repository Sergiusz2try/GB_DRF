import React from 'react';


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repo_link}
            </td>
            <td>
                {project.users}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Repo link</th>
                <th>Users</th>
            </tr>
            {projects.map((project_) => <ProjectItem project={project_} />)}
        </table>
    )
}


export default ProjectList;