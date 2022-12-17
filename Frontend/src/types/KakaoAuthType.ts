interface KakaoAuthType {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    id_token: string;
    scope: string;
    refresh_token_expires_in: number;
}

export default KakaoAuthType;