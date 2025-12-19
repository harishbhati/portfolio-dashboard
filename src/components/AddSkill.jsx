import { useEffect, useState, useRef  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSkills, updateSkill, clearAllErrors, getAllSkills, resetSkillSlice } from "../store/slices/skillSlice";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";

const AddSkill = () => {
    const [title, setTitle] = useState("");
    const [proficiency, setProficiency] = useState("");
    const [skillIcon, setSkillIcon] = useState(null);

    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const {error, message, loading, skills} = useSelector((state) => state.skill)
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
        if (skillIcon instanceof File) {
            formData.append("skillIcon", skillIcon);
        }

        if (isEditMode) {
            dispatch(updateSkill(id, formData));   // UPDATE
        } else {
            dispatch(addSkills(formData));         // ADD
        }
    };

    useEffect(() => {
        dispatch(getAllSkills())
    }, [dispatch]);

     // 🔹 Prefill data
  useEffect(() => {
  if (!isEditMode || skills?.length === 0) return;
  const skill = skills?.find((s) => s._id === id);
  if (skill) {
    setTitle(skill.title || "");
    setProficiency(skill.proficiency || "");
  }
}, [id, skills, isEditMode]);

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearAllErrors())
        }
        if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());

      if (isEditMode) {
        navigate("/manage/skills");
      } else {
        setTimeout(resetForm, 0);
      }
    }
    }, [error, message, dispatch, navigate, isEditMode])
    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {isEditMode ? "Edit Timeline" : "Add New Timeline"}
            </h2>

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
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) setSkillIcon(file);
                        }}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                    />
                </div>
                
                {loading ? (
                <Loader content={isEditMode ? "Updating Skill..." : "Adding Skill..."} />
                ) : (
                <Button
                    type="submit"
                    className="w-full text-sm font-medium rounded-base py-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                >
                    {isEditMode ? 'Update Skill' : 'Add Skill'}
                </Button>
                )}
            </form>
        </div>
    )
}

export default AddSkill;