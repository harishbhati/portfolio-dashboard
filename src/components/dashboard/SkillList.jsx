const SkillList = ({skill, isLoading}) => {
    if(!skill) return <p>Skill is empty</p>
    if(isLoading) return <p>Loading...</p>
    const widthValue = skill.proficiency.endsWith('%')
  ? skill.proficiency
  : `${skill.proficiency}%`;
    return(
        <div className="bg-white block p-6 rounded-base shadow-xs w-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-md font-semibold">{skill.title}</h3>
                <img src={skill?.skillIcon?.url} alt={skill?.title} className="w-12 h-12"/>
            </div>
            <div className="w-full bg-gray-100 rounded-full">
                <div className="text-xs bg-blue-400 font-medium text-white text-center p-0.5 leading-none rounded-full h-4 flex items-center justify-center" style={{ width: widthValue }}>{skill.proficiency?.includes('%') ? skill.proficiency : `${skill.proficiency}%`}</div>
            </div>
        </div>
    )
}

export default SkillList;