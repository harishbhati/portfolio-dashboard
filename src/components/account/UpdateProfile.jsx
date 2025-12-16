import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/slices/userSlice";
import { toast } from "react-toastify";

const UpdateProfile = () => {
   const dispatch = useDispatch();
  const { user: reduxUser, loading, error, message } = useSelector(
    (state) => state.user
  );
    const user = reduxUser || JSON.parse(localStorage.getItem("user")) || null;

  // --- Local States ---
  const [formData, setFormData] = useState(() => ({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    aboutMe: user?.aboutMe || "",
    portfolio: user?.portfolio || "",
    githubURL: user?.githubURL || "",
    instaURL: user?.instaURL || "",
    facebookURL: user?.facebookURL || "",
    twitterURL: user?.twitterURL || "",
    linkedinURL: user?.linkedinURL || "",
    password: "", // never prefill password
  }));

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(() => user?.avtar?.url || "");
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState(() => user?.resume?.url?.split("/")?.pop() || "");

  //Update localStorage after successful update 
  useEffect(() => {
    if (message === "Profile updated successfully" && reduxUser) {
      localStorage.setItem("user", JSON.stringify(reduxUser));
    }
  }, [message, reduxUser]);


  // Handle input change
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Avatar Upload
  const avatarHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);

    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Resume Upload
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResume(file);
    setResumeName(file.name);
  };

  // Submit Form
  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append only fields with values
    Object.entries(formData).forEach(([key, value]) => {
     data.append(key, value);
    });

    if (avatar) data.append("avtar", avatar);
    if (resume) data.append("resume", resume);

    dispatch(updateProfile(data));
    
      if (message) toast.success(message);
      if (error) toast.error(error);
  };
    return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Profile</h2>

      <form
        onSubmit={submitHandler}
        className="space-y-6 bg-white p-6 shadow rounded-md"
      >
        {/* Fullname + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField name="fullname" label="Full Name" value={formData.fullname} onChange={changeHandler} />
          <InputField name="email" label="Email" value={formData.email} onChange={changeHandler} />
        </div>



        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <InputField name="phone" label="Phone Number" value={formData.phone} onChange={changeHandler} />
          <InputField name="githubURL" label="GitHub URL" value={formData.githubURL} onChange={changeHandler} />
          <InputField name="instaURL" label="Instagram URL" value={formData.instaURL} onChange={changeHandler} />
          <InputField name="facebookURL" label="Facebook URL" value={formData.facebookURL} onChange={changeHandler} />
          <InputField name="twitterURL" label="Twitter URL" value={formData.twitterURL} onChange={changeHandler} />
          <InputField name="linkedinURL" label="LinkedIn URL" value={formData.linkedinURL} onChange={changeHandler} />
        </div>
        

        {/* Portfolio */}
        <InputField name="portfolio" label="Portfolio URL" value={formData.portfolio} onChange={changeHandler} />
        
        {/* About Me */}
        <div className="w-full">
          <label className="label block">About Me</label>
          <textarea
            name="aboutMe"
            rows={3}
            value={formData.aboutMe}
            onChange={changeHandler}
            className="input resize-none w-full"
          ></textarea>
        </div>

        {/* Avatar Upload */}
        <div>
          <label className="label">Profile Avatar</label>
          <div className="flex items-center gap-4">
            <img
              src={avatarPreview}
              className="w-20 h-20 rounded-full object-cover border"
              alt="avatar"
            />
            <input type="file" accept="image/*" onChange={avatarHandler} />
          </div>
        </div>

        {/* Resume Upload */}
        <div>
          <label className="label">Resume</label>
          <div className="flex items-center gap-4">
            <input type="file" accept=".pdf,.jpg,.png" onChange={resumeHandler} />
            {resumeName && (
              <span className="text-sm text-gray-600">{resumeName}</span>
            )}
          </div>

          {user?.resume?.url && (
            <a
              href={user.resume.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline text-sm mt-1 inline-block"
            >
              View Current Resume
            </a>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

// --- Reusable Input Component ---
const InputField = ({ name, label, value, onChange }) => (
  <div className="w-full">
    <label className="label block">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="input w-full"
    />
  </div>
);

export default UpdateProfile;