
import { useNavigate } from "react-router-dom";

import "./not-found.styles.css";

export const NotFound = () => {
const navigate = useNavigate()
  const moveToHomePage = ()=>{
   navigate('/')
  }

  return (
    <div className="not-found">
      <h1>
        Страница не существует, вернитесь на главную страницу.
      </h1>
      <button onClick={moveToHomePage} children='Вернуться на грувную'/>
    </div>
  );
};
