
import ProjectMakeValues from "./ProjectMakeValues";
import React from "react";

interface ProjectMakeContextProps {
    values: ProjectMakeValues;
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default ProjectMakeContextProps;