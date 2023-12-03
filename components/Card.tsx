import React from "react";
import { ProviderProps } from "../utils/interfaces";

const Card: React.FC<ProviderProps> = ({ children }) => {
  return (
    <div className="group p-3 border-slate-400 border hover:shadow-md hover:shadow-slate-400 cursor-pointer transition-shadow duration-200 m-3 rounded-lg">
      {children}
    </div>
  );
};

export default Card;
