import { useLocation } from "react-router-dom";

const Profile = () => {
  const { user } = useLocation().state;
  console.log("verified: ", user.verified);
  return (
    <>
      <h1>{user.first_name}</h1>
      <h1>{user.email}</h1>
    </>
  );
};

export default Profile;
