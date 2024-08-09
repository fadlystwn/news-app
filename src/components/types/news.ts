export interface News {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    imageUrl: string | null;
    headline: string | null;
    author?: string;
}
