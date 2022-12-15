import React from 'react';


const ProjectItem = ({project, deleteProject}) => {
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
            <td>
                <button onClick={() => deleteProject(project.id)} type="button" >Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Repo link</th>
                <th>Users</th>
                <th></th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
        </table>
    )
}


export default ProjectList;