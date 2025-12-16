import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SkillList from "../components/skills/SkillList";
import { useEffect } from "react";
import { getAllSkills } from "../store/slices/skillSlice";

const ManageSkills = () => {
    const dispatch = useDispatch();
    const {skills, loading: skillLoading, error} = useSelector((state) => state.skill);

    useEffect(() => {
        dispatch(getAllSkills());
    }, [dispatch])
    return (
        <section className="h-dvh bg-gray-100">
            <header className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-6 justify-between">
                <h2 className="font-semibold text-2xl">Manage Skills</h2>
                <Link to='/' className="inline-block text-sm font-medium rounded-base py-2.5 px-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-md">
                    Return to Dashboard
                </Link>
            </header>
            <main className="p-8">
                <SkillList data={skills} isLoading={skillLoading} error={error} />
            </main>
       </section>
    )
}

export default ManageSkills;