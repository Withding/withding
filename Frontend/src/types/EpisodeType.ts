import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

interface EpisodeType {
    step: number;
    component: EmotionJSX.Element;
    nextButtonValue: string;
    name: string;
    clickEvent?: () => void;
} 

export default EpisodeType;