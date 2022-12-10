export type Article = {
    id: number;
    context: string;
    article_image: string;
    created_at: Date;
    updated_at: Date;
    //ユーザ情報
    create_user_id: number;
    create_user_name: string;
    user_image: string;
};