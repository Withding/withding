import React from "react";

interface ProjectInfoComponentProps{
    value?: string | number | null;
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLSelectElement>) => void;
}

export default ProjectInfoComponentProps;