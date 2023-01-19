import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

interface EpisodeType {
    step: number;
    component: EmotionJSX.Element;
    nextButtonValue: string;
    name: string;
} 

export default EpisodeType;