import React from "react";
import ProjectMakeContextProps from "@/types/ProjectMakeContextProps";

const ProjectMakeContext = React.createContext<ProjectMakeContextProps>({
    values: {
        title: "",
        category: "",
        targetAmount: 0,
        startDate: "",
        endDate: "",
    },
    onChangeValue: () => {}
});

export default ProjectMakeContext;