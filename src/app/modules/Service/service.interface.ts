export interface TService {
    name: string;
    title: string;
    shortTitle: string;
    video: string;
    image: string;
    description: string;
    shortDescription: string;
    price: number;
    duration: number;
    isDeleted: boolean;
}

export type TCloudinaryFileUpload =
    | 'video'
    | 'auto'
    | 'image'
    | 'raw'
    | undefined;
