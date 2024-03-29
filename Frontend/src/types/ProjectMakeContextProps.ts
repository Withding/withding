
import ProjectMakeValues from "./ProjectMakeValues";
import React from "react";

interface ProjectMakeContextProps {
    project: number;
    values: ProjectMakeValues;
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeContent: (content: string) => void;
    onChangeStep1Values: (values: ProjectMakeValues) => void;
    onDeleteThumbnail: () => void;
}

export default ProjectMakeContextProps;