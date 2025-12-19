import { Link } from "react-router-dom";
import ProjectCardSkeleton from "../skeleton/ProjectCardSkeleton";

const SkillsCard = ({skills, isLoading}) => {
    if(isLoading) return <ProjectCardSkeleton />
    if(!skills) return <p>The skill list is empty</p>
    return (
        <div className="bg-white block p-6 rounded-base shadow-xs w-full">
            <h3 className="mb-6 text-xl font-semibold">Skills</h3>
            <h4 className="mb-3 text-2xl font-semibold">{skills?.length}</h4>
            <Link to='/manage/skills' className="inline-block text-sm font-medium rounded-base py-2.5 px-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-md">
                Manage Skills
            </Link>
        </div>
    )
}

export default SkillsCard;