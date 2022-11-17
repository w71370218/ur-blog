import styles from '../../styles/PostList.module.css'
import Project from "./Project"
import project_list from "../../public/project_list"

const ProjectList = () => {
    const projects = project_list;
    for (let project of projects) {
        project.description = project.description.replace(/!\[](.+)/g, ' ')
            .replace(/<.+\/>/g, ' ')
            .substring(0, 300);
    }
    return (
        <div className={`${styles['post-list']} p-1 p-md-5 pt-5`} >
            {projects.map(project => (
                <div key={project.id} >
                    <Project project={project} />
                </div>
            ))
            }
        </div >
    )
}

export default ProjectList;