import { css } from "@emotion/react";

const SectionStyle = css`
width: 100%;
section {
    margin-bottom: 2rem;
}
label {
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
        font-size: 1.2rem;
        color: var(--grey-500);
    }
    input {
        margin-top: 0.5rem;
        min-height: 48px;
        padding: 0 1rem;
        font-size: 1rem;
    }
}

.sub-description {
    font-size: 0.8rem;
    color: var(--grey-400); 
}
`;

export default SectionStyle;