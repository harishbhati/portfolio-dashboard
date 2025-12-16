import { Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { addProject, clearAllProjectErrors, getAllProjects, resetProjectSlice } from "../store/slices/projectSlice";
import { toast } from "react-toastify";

const AddProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [gitRepoLink, setGitRepoLink] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [technology, setTechnology] = useState("");
    const [deployed, setDeployed] = useState(false);
    const [projectBanner, setProjectBanner] = useState(null);

    const dispatch = useDispatch();
    const {loading, error, message} = useSelector((state) => state.project)
    const fileRef = useRef(null);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setGitRepoLink("");
        setProjectLink("");
        setTechnology("");
        setDeployed(false);
        setProjectBanner("");

        if (fileRef.current) fileRef.current.value = "";

    }
    const handlProject = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('gitRepoLink', gitRepoLink);
        formData.append('projectLink', projectLink);
        formData.append('technology', technology);
        formData.append('deployed', deployed ? "true": "false");
        formData.append('projectBanner', projectBanner);
        dispatch(addProject(formData));
    }

    useEffect(() => {
        dispatch(getAllProjects());
    }, [dispatch])

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearAllProjectErrors())
        }
        if(message){
            toast.success(message)
           // Clear form fields after successful add
            setTimeout(resetForm, 0);
            dispatch(resetProjectSlice());
            dispatch(getAllProjects())
        }
    })
    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Timeline</h2>

            <form className="w-full" onSubmit={handlProject}>
                <div className="mb-5">
                    <label
                        htmlFor="title"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Project Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="description"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Project Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="gitRepoLink"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        GitRepo Link
                    </label>
                    <input
                        type="text"
                        id="gitRepoLink"
                        value={gitRepoLink}
                        onChange={(e) => setGitRepoLink(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="projectLink"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Project Link
                    </label>
                    <input
                        type="text"
                        id="projectLink"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="technology"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Technology
                    </label>
                    <input
                        type="text"
                        id="technology"
                        value={technology}
                        onChange={(e) => setTechnology(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                <div className="flex items-center mb-5">
                    <input id="deployed" type="checkbox" value={deployed} onChange={(e) => setDeployed(e.target.checked)} class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                    <label for="deployed" classname="select-none ms-2 text-sm font-medium text-heading">Deployed</label>
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="projectBanner"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Project Banner
                    </label>
                    <input
                        type="file"
                        id="projectBanner"
                        ref={fileRef}
                        onChange={(e) => setProjectBanner(e.target.files[0])}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                
                {loading ? (
                <Loader content={"Adding Project..."} />
                ) : (
                <Button
                    type="submit"
                    className="w-full text-sm font-medium rounded-base py-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                >
                    Add Project
                </Button>
                )}
            </form>
        </div>
    )
}

export default AddProject;