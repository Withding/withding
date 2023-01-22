import React, { useContext, useMemo } from "react";
import LabelInput from "@/components/common/LabelInput";
import ProjectMakeContext from "@/store/ProjectMakeContext";

/**
 * 프로젝트 제목을 적는 컴포넌트
 * @returns 
 */
function TitleInput() {
    const { values, onChangeValue } = useContext(ProjectMakeContext);
    const { title } = values;
    const MAX_LENGTH = useMemo(() => 40, []);
    return (
        <section>
            <LabelInput
                label={"프로젝트 제목"}
                input={{
                    type: "text",
                    placeholder: "프로젝트 제목을 입력해주세요",
                    value: title,
                    name: "title",
                    onChange: onChangeValue,
                    maxLength: MAX_LENGTH,
                }}
            />
            <span className="sub-description">{`${MAX_LENGTH - title.length}자 남음`}</span>
        </section>
    );
}

export default TitleInput;