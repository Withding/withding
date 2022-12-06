import { css, Global } from "@emotion/react";
import * as React from "react";
function GlobalStyle() {
    return (
        <Global
            styles={style}
        />
    );
}

const style = css`
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }

    body {
        line-height: 1;
    }

    ol,
    ul {
        list-style: none;
    }

    blockquote,
    q {
        quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }



    
    :root {
        --primary-700: #101c4c;
        --primary-600: #182a72;
        --primary-500: #203898;
        --primary-400: #2946be;
        --primary-300: #a9b5e5;
        --primary-200: #e1e7ff;
        --primary-100: #f4f5fb;
        --black: #141721;
        --deepgrey: #343742;
        --grey-500: #525561;
        --grey-400: #8d909d;
        --grey-300: #b9bcc1;
        --grey-200: #dcdee1;
        --grey-100: #f5f6f6;
        --white: #ffffff;
        --green-400: #44c46d;
        --green-300: #81C784;
        --yellow: #fede03;
        --orange: #ffa100;
        --coral: #ff5268;
        --red-400: #fc2b38;
        --minus-margin-android: 0px -16px;
        --minus-margin-ios: 0px -24px;
        --minus-margin-undefined: 0px -24px;
        --padding-android: 0px 16px;
        --padding-ios: 0px 24px;
        --padding-undefined: 0px 24px;
        --main-padding: 0px 48px;
    }
    .notosanskr * {
        font-family: 'Noto Sans KR', sans-serif;
    }

    * {
        box-sizing: border-box;
    }

    body {
        background-color: none;
        font-size: 16px;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: var(--grey-200);
    }
`;

export default GlobalStyle;