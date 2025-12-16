import { useSelector } from "react-redux";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);  
    const data = user || JSON.parse(localStorage.getItem("user")) || {};

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      
      {/* Avatar + Name Section */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={data?.avtar?.url}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full object-cover shadow"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{data?.fullname}</h2>
          <p className="text-gray-500">{data?.email}</p>
        </div>
      </div>

      {/* Profile Details */}
      <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Profile Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500 text-sm">Full Name</p>
          <p className="text-gray-800 font-medium">{data?.fullname}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Email</p>
          <p className="text-gray-800 font-medium">{data.email}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Phone</p>
          <p className="text-gray-800 font-medium">{data?.phone}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Portfolio</p>
          <p className="text-blue-600 underline wrap-break-word">{data?.portfolio}</p>
        </div>

        <div>
            <p className="text-gray-500 text-sm">Github</p>
            {data.githubURL ? (
                <p className="text-blue-600 underline wrap-break-word">
                {data?.githubURL}
                </p>
            ) : (
                <p className="text-gray-400 italic">
                No Github URL added
                </p>
            )}
        </div>

        <div>
          <p className="text-gray-500 text-sm">Instagram</p>
          {data.instagramURL ? (
            <p className="text-blue-600 underline wrap-break-word">{data?.instaURL}</p>
          ):(
            <p className="text-gray-400 italic">
                No Instagram URL added
                </p>
          )}
        </div>

        <div>
          <p className="text-gray-500 text-sm">Facebook</p>
          {data.facebookURL ? (
            
          <p className="text-blue-600 underline wrap-break-word">{data?.facebookURL}</p>
          ):(
            <p className="text-gray-400 italic">
                No Facebook URL added
            </p>
          )}
        </div>

        <div>
          <p className="text-gray-500 text-sm">Twitter</p>
          {data.twitterURL ? (
          <p className="text-blue-600 underline wrap-break-word">{data?.twitterURL}</p>
          ):(
            <p className="text-gray-400 italic">
                No Twitter URL added
            </p>
          )}
        </div>

        <div>
          <p className="text-gray-500 text-sm">LinkedIn</p>
          {data.linkedinURL ? (
          <p className="text-blue-600 underline wrap-break-word">{data?.linkedinURL}</p>
          ):(
            <p className="text-gray-400 italic">
                No LinkedIn URL added
            </p>
          )}
        </div>

      </div>

      {/* About Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-3">
          About Me
        </h3>
        <p className="text-gray-600 leading-relaxed">{data?.aboutMe}</p>
      </div>

      {/* Resume */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-3">
          Resume
        </h3>
        <a
          href={data?.resume?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          View Resume
        </a>
      </div>

    </div>
  );
};

export default Profile;
