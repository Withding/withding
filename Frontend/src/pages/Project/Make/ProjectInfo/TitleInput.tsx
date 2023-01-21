import React from "react";
import LabelInput from "@/components/common/LabelInput";

function TitleInput() {
    return (
        <section>
            <LabelInput
                label={"프로젝트 제목"}
                input={{
                    type: "text",
                    placeholder: "프로젝트 제목을 입력해주세요",
                    maxLength: 40,
                }}
            />
            <span className="sub-description">{`${40}자 남음`}</span>
        </section>
    );
}

export default TitleInput;