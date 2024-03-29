import { css } from "@emotion/react";
import * as React from "react";
import Header from "./components/header/Header";
import GlobalStyle from "./GlobalStyle";
import { Routes, Route, Navigate } from "react-router-dom";

const Main = React.lazy(() => import("./pages/Main/Index"));
const Signin = React.lazy(() => import("./pages/Signin/Index"));
const Signup = React.lazy(() => import("./pages/Signup/Index"));
const Oauth = React.lazy(() => import("./pages/Oauth/Index"));
const MyPage = React.lazy(() => import("./pages/MyPage/Index"));
const Project = React.lazy(() => import("./pages/Project/Index"));
const Users = React.lazy(() => import("./pages/Users/Index"));

import { Suspense } from "react";
import Auth from "./components/auth/Auth";
import { QueryClient, QueryClientProvider } from "react-query";
import GuestRoute from "./components/common/permissionRoute/GuestRoute";
import PrivateRoute from "./components/common/permissionRoute/PrivateRoute";


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
                                <Route path="/signin/*"
                                    element={<GuestRoute RouteComponent={Signin} />}
                                />
                                <Route path="/signup/*"
                                    element={<GuestRoute RouteComponent={Signup} />}
                                />
                                <Route path="/oauth/*"
                                    element={<GuestRoute RouteComponent={Oauth} />}
                                />
                                <Route path="/funding" element={<div>funding</div>} />
                                <Route path="/commingsoon" element={<div>commingsoon</div>} />
                                <Route path="/mypage/*" element={
                                    <PrivateRoute RouteComponent={MyPage} path={"/mypage"} />
                                } />
                                <Route path="/users/*" element={<Users />} />
                                <Route path="/project/*" element={<Project />} />
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
        min-height: 50vh;
    }
    @media screen and (max-width: 1095px) {
        & > .content {
            padding-top: 4rem;
            padding-bottom: 4rem;
        }
    }
`;

export default App;