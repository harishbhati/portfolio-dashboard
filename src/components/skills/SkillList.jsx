import { Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSkill, getAllSkills } from "../../store/slices/skillSlice";
import { useEffect, useState } from "react";

const SkillList = ({data, isLoading, error}) => {
    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState(false); // track delete in progress
    const skillList = data?.skill || [];

    useEffect(() => {
        dispatch(getAllSkills());
    }, [dispatch]);

    const handleDelete = async (id) => {
       setDeleting(true); // start delete
       await dispatch(deleteSkill(id));
        await dispatch(getAllSkills());
        setDeleting(false); // finish delete
    };
    if (isLoading || deleting) return <p>Loading...</p>;
    if(error) return <p>{error}</p>
    if (!Array.isArray(skillList) || skillList.length === 0) return <p>No skills found</p>;
    return(
        <section className="grid grid-cols-3 gap-8">
            {skillList.map(skillItem =>{
                const skillValue = skillItem.proficiency.endsWith('%') ? skillItem.proficiency : `${skillItem.proficiency}%`;
                return(
                    <div key={skillItem._id} className="bg-white block p-6 rounded-base shadow-xs w-full">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center justify-between mb-6 gap-3">
                                <h3 className="text-md font-semibold">{skillItem.title}</h3>
                                <img src={skillItem?.skillIcon?.url} alt={skillItem?.title} className="w-8 h-8"/>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link className="text-blue-800">
                                    <Pencil className="w-[18px] h-[18px]" />
                                </Link>
                               <button
                                    className="text-blue-800"
                                    onClick={() => handleDelete(skillItem._id)}
                                >
                                    <Trash2 className="w-[18px] h-[18px]" />
                                </button>
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full">
                            <div className="text-xs bg-blue-400 font-medium text-white text-center p-0.5 leading-none rounded-full h-4 flex items-center justify-center" style={{width:skillValue}}>{skillValue}</div>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}

export default SkillList;