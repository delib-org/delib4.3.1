import YouTube from 'react-youtube';
import { GoogleLogin } from "@react-oauth/google";
import axios from 'axios';

const HomeIntro = () => {

    const handleGoogleLogin = async (credentialResponse: any) => {
        try {
          if (credentialResponse) {
            const { credential } = credentialResponse;
            console.log(credential)
            if (credential) {
              const { data } = await axios.post("/api/users/login", { credential });
              console.log(data)
            //   if (!data) throw new Error("mising data on axios");
            //   const { user, error } = data;
            //   if (error) throw error;
            //   if (!user) throw new Error("no user in data");
            //   const { value } = UserSchema.validate(user);
            //   if (value) {
                // dispatch(setLogin(value));
            //   }
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div className="page">
      <header>
        <h1>דליב - יוצרים הסכמות ביחד</h1>
        <a href='http://www.delib.org' target='_blank' rel='noreferrer'><h2>מבית המכון לדמוקרטיה דיונית</h2></a>
        <YouTube videoId="p6JoKmMJi_c" />
      </header>
      <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.error("Login Failed");
            }}
          />
    </div>
  );
};

export default HomeIntro;
