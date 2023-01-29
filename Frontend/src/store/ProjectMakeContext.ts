import React from "react";
import ProjectMakeContextProps from "@/types/ProjectMakeContextProps";

const ProjectMakeContext = React.createContext<ProjectMakeContextProps>({
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