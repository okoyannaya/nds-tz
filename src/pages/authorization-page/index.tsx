import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLazyGetTokenQuery } from "@containers/redux/api/auth.api";
import { useAppDispatch } from "@containers/redux/hooks";
import { setLoading } from "@containers/redux/slice/nds.slice";
import { Howl } from "howler";

import "./auth-page.styles.css";

export const AuthorizationPage = () => {
  const [sound, setSound] = useState<Howl | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [getToken] = useLazyGetTokenQuery();

  const handleAuthorization = () => {
    sound?.play()
    dispatch(setLoading(true));
    getToken()
      .unwrap()
      .then((res) => {
       setTimeout(()=>{
        localStorage.setItem("access_token", res);
        navigate("/");
        toast.success("AUTHORIZATION COMPLETED SUCCESSFULLY");
       }, 1000)
      })
      .catch(() => {
        toast.error("Auth response error");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    const ahh = new Howl({
      src: ['src/pages/authorization-page/ahhh.mp3'], 
      volume: 0.5, 
    });
    setSound(ahh);

 return () => {
      ahh.unload();
      setSound(null)
    };
  }, []);

  return (
    <div className="auth_page">
      <h1>Страница авторизации</h1>
      <button onClick={handleAuthorization}>Авторизоваться</button>
    </div>
  );
};
