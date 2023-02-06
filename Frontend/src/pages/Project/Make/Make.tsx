import ProcedureNavigator from "@/components/common/Procedure/ProcedureNavigator";
import React, { useCallback, useState } from "react";
import Wrapper from "../Wrapper";
import useStepParam from "@/hooks/useStepParam";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import EpisodeType from "@/types/EpisodeType";
import ButtonController from "../ButtonController";
import MainHeader from "../MainHeader";
import ProjectMakeContext from "@/store/ProjectMakeContext";
import ProjectMakeValues from "@/types/ProjectMakeValues";
import ProjectDetailContent from "./ProjectDetailContent/ProjectDetailContent";
import useProjectParam from "@/hooks/useProjectParam";
import { useMutation } from "react-query";
import generateProjectContent from "@/utils/RequestApis/projectmake/generateProjectContent";
import generateProjectInfo from "@/utils/RequestApis/projectmake/generateProjectInfo";
import Product from "@/types/Product";
import addProduct from "@/utils/RequestApis/projectmake/addProduct";
import Products from "./Product/Products";
import deleteThumbnail from "@/utils/RequestApis/projectmake/deleteThumbnail";
/**
 * /project/make 페이지 컴포넌트
 * @returns 
 */

const PRODUCT_INIT = {
    description: "",
    price: 0,
    shippingPrice: -1,
    shippingDay: "",
    inventory: 0,
    name: "",
    image: null
};
function Make() {
    const step = useStepParam();
    const project = useProjectParam();

    // 프로젝트 정보 임시 저장 요청
    const { mutate: projectInfoMutate } = useMutation(generateProjectInfo);
    // 프로젝트 상세 내용 임시 저장 요청
    const { mutate: projectContentMutate } = useMutation(generateProjectContent);
    // 프로젝트 아이템 추가 요청
    const { mutate: addProductMutate } = useMutation(addProduct, {
        onSuccess: () => {
            setProduct(PRODUCT_INIT);
        }
    });
    // 프로젝트 썸네일 이미지 삭제 요청
    const { mutate: deleteThumbnailMutate } = useMutation(deleteThumbnail, {
        onSuccess: () => {
            setValues({ ...values, preViewImage: null });
        }
    });

    const [values, setValues] = useState<ProjectMakeValues>({
        title: "",
        category: -1,
        targetAmount: 0,
        startDate: "",
        endDate: "",
        content: "",
        preViewImage: null
    });

    const [product, setProduct] = useState<Product>(PRODUCT_INIT);


    const generateInfo = useCallback(() => {
        projectInfoMutate({ project, values });
    }, [project, projectInfoMutate, values]);

    const generateProjectContext = useCallback(() => {
        projectContentMutate({ content: values.content, project });
    }, [project, projectContentMutate, values.content]);

    const thumbnailImageDeleteHandler = useCallback(() => {
        deleteThumbnailMutate(project);
    }, [deleteThumbnailMutate, project]);

    const episode: EpisodeType[] = [
        {
            step: 1,
            component: <ProjectInfo />,
            nextButtonValue: "다음",
            name: "프로젝트 정보 입력",
            clickEvent: generateInfo
        },
        {
            step: 2,
            component: <ProjectDetailContent />,
            nextButtonValue: "다음",
            name: "프로젝트 상세 내용 입력",
            clickEvent: generateProjectContext
        },
        {
            step: 3,
            component: <Products />,
            nextButtonValue: "다음",
            name: "상품 등록"
        },
    ];
    const render = episode.find((item) => item.step === step);// step에 해당하는 컴포넌트를 렌더링  


    const onChangeStep1ValuesHandler = useCallback((value: ProjectMakeValues) => {
        setValues(() => value);
    }, []);

    const onChangeContent = useCallback((content: string) => {
        setValues({
            ...values,
            content: content
        });
    }, [values]);

    const addProductHandler = useCallback((e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        addProductMutate({ project, values: product });
    }, [addProductMutate, product, project]);

    const onChangeValue = useCallback(
        (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
            const { name, value } = e.target;
            if (name === "bestImage") {
                const { files } = (e.target as HTMLInputElement);
                const file = files?.[0];
                setValues({
                    ...values,
                    bestImage: file
                });
                return;
            }
            setValues({
                ...values,
                [name]: value
            });
        }, [values]);

    const onChangeProductValue =
        useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
            const { name, value } = e.target;
            setProduct({
                ...product,
                [name]: value
            });
        }, [product]);

    return (
        <Wrapper>
            <ProjectMakeContext.Provider value={{
                project,
                values,
                onChangeValue,
                onChangeContent,
                onChangeStep1Values: onChangeStep1ValuesHandler,
                onDeleteThumbnail: thumbnailImageDeleteHandler,
                product: {
                    values: product,
                    onChangeValue: onChangeProductValue,
                    addProduct: addProductHandler
                }
            }}>
                <ProcedureNavigator
                    list={episode}
                    path={`/project/make?project=${project}&step=`}
                    currnet={step}
                />
                <main>
                    <MainHeader
                        progressBar={{
                            now: step,
                            max: episode.length,
                            height: 3
                        }}
                        leftPage={`${episode.length - step}`}
                    />
                    {render?.component}
                    <ButtonController
                        className="button"
                        step={step}
                        lastStep={episode.length}
                        path={`/project/make?project=${project}&step=`}
                        nextButtonValue={render?.nextButtonValue}
                        onClick={render?.clickEvent}
                    />
                </main>
            </ProjectMakeContext.Provider>
        </Wrapper>
    );
}

export default Make;