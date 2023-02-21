interface NavItemType {
    name: string;
    show: "pc" | "mobile" | "all"
    route: string;
    icon: any;
    onClick?: () => void;
}

export default NavItemType;