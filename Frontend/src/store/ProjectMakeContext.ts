import React from "react";
import ProjectMakeContextProps from "@/types/ProjectMakeContextProps";

const ProjectMakeContext = React.createContext<ProjectMakeContextProps>({
    project: -1,
    values: {
        title: "",
        category: -1,
        targetAmount: 0,
        startDate: "",
        endDate: "",
        content: "",
    },
    onChangeValue: () => {},
    onChangeContent: () => {}
});

export default ProjectMakeContext;