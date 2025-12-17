import { Link } from "react-router-dom";
import ProjectCardSkeleton from "../skeleton/ProjectCardSkeleton";

const ProjectCompleted = ({projects, isLoading, error}) => {
    if(isLoading) return <ProjectCardSkeleton />
    if(!projects) return <p>The Project list are empty.</p>
    if (error) return <p>{error}</p>
    return(
        <div className="bg-white block p-6 rounded-base shadow-xs w-full">
            <h3 className="mb-6 text-xl font-semibold">Project Completed</h3>
            <h4 className="mb-3 text-2xl font-semibold">{projects?.project?.length}</h4>
            <Link to='/manage/projects' className="inline-block text-sm font-medium rounded-base py-2.5 px-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-md">
                Manage Project
            </Link>
        </div>
    )
}

export default ProjectCompleted;