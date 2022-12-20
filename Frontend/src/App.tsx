import { css } from "@emotion/react";
import * as React from "react";
import Header from "./components/header/Header";
import GlobalStyle from "./GlobalStyle";
import { Routes, Route, Navigate } from "react-router-dom";

const Main = React.lazy(() => import("./pages/Main/Index"));
const Signin = React.lazy(() => import("./pages/Signin/Index"));
const Signup = React.lazy(() => import("./pages/Signup/Signup"));
const Oauth = React.lazy(() => import("./pages/Oauth/Index"));

import { Suspense } from "react";
import Auth from "./components/auth/Auth";
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            useErrorBoundary: true,
            retry: 0,
            refetchOnWindowFocus: false,

        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Auth>
                <div
                    className="container"
                    css={defaultStyle}
                >
                    <GlobalStyle />
                    <Header />
                    <div className="content">
                        <Suspense fallback={<div>loading</div>}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/main" />} />
                                <Route path="/main" element={<Main />} />
                                <Route path="/signin/*" element={<Signin />} />
                                <Route path="/signup/*" element={<Signup />} />
                                <Route path="/oauth/*" element={<Oauth />} />
                                <Route path="/funding" element={<div>funding</div>} />
                                <Route path="/commingsoon" element={<div>commingsoon</div>} />
                            </Routes>
                        </Suspense>

                    </div>
                </div>
            </Auth >
        </QueryClientProvider>
    );
}

const defaultStyle = css`
    width: 100%;
    min-height: 100vh;
    & > .content {
        display: flex;
        justify-content: center;
    }
    @media screen and (max-width: 1095px) {
        & > .content {
            padding-bottom: 4rem;
        }
    }
`;

export default App;