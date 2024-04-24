export interface TreeNode {
    Children?: TreeNode[] | null;
    Childs: number;
    CreatedAt: string;
    ID: number;
    PID: number;
    Shablon: string;
    Sort: number;
    Title: string;
    TypeID: number;
    URN: string;
    V: boolean;
}

export interface TSiteMapTree extends TreeNode {
    Children?: TreeNode[] | null;
}

export interface TSiteMapPage {
    Descr: string
    EditedAt: string
    Lng: string
    PageCSS: string
    PageHTML: string
    Robots: string
    SMID: number
    Shablon: string
    Title: string
}

export interface TSiteMapTypes {
    ID: number
    NodeType: string
}