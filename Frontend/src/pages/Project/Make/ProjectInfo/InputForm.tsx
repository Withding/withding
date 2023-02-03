import { css } from "@emotion/react";
import React, { useContext } from "react";
import TitleInput from "../../../../components/common/LimitTextInput";
import SelectCategory from "./SelectCategory";
import Amount from "./TargetAmount";
import BestImage from "./BestImage";
import Duration from "./Duration";
import ProjectMakeContext from "@/store/ProjectMakeContext";
import SectionStyle from "../SectionStyle";


/**
 * 프로젝트 생성 정보를 입력받는 폼 컴포넌트
 * @returns 
 */
function InputForm() {
    const { values, onChangeValue } = useContext(ProjectMakeContext);
    return (
        <form css={SectionStyle}>
            <TitleInput
                onChangeValue={onChangeValue}
                label={"프로젝트 제목"}
                input={{
                    type: "text",
                    placeholder: "프로젝트 제목을 입력해주세요",
                    name: "title",
                    value: values.title,
                    onChange: onChangeValue,
                    maxLength: 40,
                }}
            />
            <BestImage
                value={values.preViewImage}
                onChangeValue={onChangeValue}
            />
            <SelectCategory
                value={values.category}
                onChangeValue={onChangeValue}
            />
            <Amount
                value={values.targetAmount}
                onChangeValue={onChangeValue}
            />
            <Duration
                values={{
                    startDate: values.startDate,
                    endDate: values.endDate,
                }}
                onChangeValue={onChangeValue}
            />
        </form>
    );
}


export default InputForm;