import { useDispatch, useSelector } from "react-redux";
import About from "./dashboard/about";
import ProjectCompleted from "./dashboard/ProjectCompled";
import { useEffect } from "react";
import { getAllProjects } from "../store/slices/projectSlice";
import SkillsCard from "./dashboard/SkillsCard";
import { getAllSkills } from "../store/slices/skillSlice";
import ProjectList from "./dashboard/ProjectList";
import SkillList from "./dashboard/SkillList";
import SoftwareApplicationList from "./dashboard/SoftwareApplicationList";
import { getAllApplication } from './../store/slices/applicationSlice';
import TimelineList from "./dashboard/TimelineList";
import { getAllTimeline } from "../store/slices/timelineSlice";
import { Link } from "react-router-dom";
import { getUser } from "../store/slices/userSlice";


const Dashboard = () => {
   const { user, loading: userLoading } = useSelector((state) => state.user);
   const { projects, loading: projectLoading, error } = useSelector((state) => state.project);
   const { skills, loading: skillLoading } = useSelector((state) => state.skill);
   const { applications, loading:applicationLoading } = useSelector((state) => state.application);
   const {timelines, loading: timelineLoading } = useSelector((state) => state.timeline);

   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getUser())
      dispatch(getAllProjects());
      dispatch(getAllSkills());
      dispatch(getAllApplication());
      dispatch(getAllTimeline());
   }, [dispatch]);
   const skillList = Array.isArray(skills?.skill) ? skills.skill : [];

   //skill list sort
   const sortSkillList = [...skillList].sort((a,b) => a.title.localeCompare(b.title));

   //Top 5 skills set
   const topSkills = sortSkillList.slice(0,6);
    return (
        <section>
            <section className="grid grid-cols-3 gap-5">
                <About user={user} isLoading={userLoading}/>
                <ProjectCompleted projects={projects} isLoading={projectLoading} error={error} />
                <SkillsCard skills={skills} isLoading={skillLoading} />
            </section>
            <section className="mt-12">
                <h3 className="mb-3 text-2xl font-semibold">Projects</h3>
                {projects?.project?.length > 0 ? (
                    <ProjectList projects={projects} isLiading={projectLoading}/>
                ) : (
                    <p>No project found</p>
                )
            }
            </section>
            <section className="mt-12">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-2xl font-semibold">Skills</h3>
                    <Link to="/manage/skills" className="text-blue-800">View All</Link>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    {topSkills?.length > 0 ? (
                        topSkills.map(skill => {
                            return (
                                <SkillList key={skill._id} skill={skill} isLoading={skillLoading} />
                            )
                        })
                    ) : (
                         <p>No skills found</p>
                    )}
                </div>
            </section>
            <section className="grid grid-cols-2 gap-5 mt-12">
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className="mb-3 text-2xl font-semibold">Software Application</h3>
                        <Link to="/manage/software" className="text-blue-800">View All</Link>
                    </div>
                    {applications?.softwareApplication?.length > 0 ? (
                        <SoftwareApplicationList data={applications} isLoading={applicationLoading} />
                    ) : (
                        <p>No application found</p>
                    )
                }
                </div>
                <div>
                    <h3 className="mb-3 text-2xl font-semibold">Timeline List</h3>
                    {timelines?.timeline?.length > 0 ? (
                        <TimelineList data={timelines} isLoading={timelineLoading}  />
                    ): (
                        <p>No timeline found</p> 
                        )
                    }
                </div>
            </section>
        </section>
    )
}

export default Dashboard;