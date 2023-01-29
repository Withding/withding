import { Editor } from "@toast-ui/react-editor";
import React, { useCallback, useContext, useMemo } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { css } from "@emotion/react";
import ProjectMakeContext from "@/store/ProjectMakeContext";
import uploadImage from "@/utils/RequestApis/projectmake/uploadIamge";

/**
 * 프로젝트 상세 내용을 입력하는 컴포넌트
 * @returns 
 */
function InputForm() {
    const { values, onChangeContent } = useContext(ProjectMakeContext);
    const editorRef = React.useRef<Editor>(null);
    const onChange = useCallback(() => {
        const content = editorRef.current?.getInstance().getHTML() ?? "";
        onChangeContent(content);
    }, [onChangeContent]);
    const MAX_LENGTH = useMemo(() => 1000, []);
    return (
        <form css={style}>
            <Editor
                initialValue={values.content}
                height="600px"
                initialEditType="wysiwyg"
                previewStyle="vertical"
                ref={editorRef}
                onChange={onChange}
                hooks={{
                    addImageBlobHook: async (blob: Blob, callback: (url: string) => void) => {
                        const response = await uploadImage(blob);
                        const { preview } = response;
                        callback(preview);
                    }
                }}
            />
            <p className="left">
                {`${MAX_LENGTH - (editorRef.current?.getInstance().getHTML() ?? "").length}자 남음`}
            </p>
        </form>
    );
}

const style = css`
    button {
        min-height: unset;
    }
    p.left {
        color: var(--grey-400);
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }
`;

export default InputForm;