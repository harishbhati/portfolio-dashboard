import { useEffect, useState, useRef  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSkills, clearAllErrors, getAllSkills, resetSkillSlice } from "../store/slices/skillSlice";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import Loader from "./Loader";

const AddSkill = () => {
    const [title, setTitle] = useState("");
    const [proficiency, setProficiency] = useState("");
    const [skillIcon, setSkillIcon] = useState(null);

    const dispatch = useDispatch();
     const fileRef = useRef(null);
    const {error, message, loading} = useSelector((state) => state.skill)
    const resetForm = () => {
        setTitle("");
        setProficiency("");
        setSkillIcon("");
        if (fileRef.current) fileRef.current.value = "";
    }
   const handleSkill = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("proficiency", proficiency);
        formData.append("skillIcon", skillIcon);

        dispatch(addSkills(formData));
    };

    useEffect(() => {
        dispatch(getAllSkills())
    }, [dispatch]);

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearAllErrors())
        }
        if(message){
            toast.success(message)
            // Clear form fields after successful add
           setTimeout(resetForm, 0);
           dispatch(resetSkillSlice());
           dispatch(getAllSkills())
        }
    }, [error, message, dispatch])
    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Timeline</h2>

            <form className="w-full" onSubmit={handleSkill}>
                <div className="mb-5">
                    <label
                        htmlFor="title"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Title
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
                        htmlFor="proficiency"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Proficiency
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={proficiency}
                        onChange={(e) => setProficiency(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="skillIcon"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Skill Icon
                    </label>
                    <input
                        type="file"
                        id="skillIcon"
                        ref={fileRef}
                        onChange={(e) => setSkillIcon(e.target.files[0])}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                
                {loading ? (
                <Loader content={"Adding Skill..."} />
                ) : (
                <Button
                    type="submit"
                    className="w-full text-sm font-medium rounded-base py-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                >
                    Add Skill
                </Button>
                )}
            </form>
        </div>
    )
}

export default AddSkill;