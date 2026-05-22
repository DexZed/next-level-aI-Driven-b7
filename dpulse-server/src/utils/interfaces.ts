export interface User{
    id:string,
    name:string,
    email:string,
    password:string,
    role:'contributor'|'maintainer'
    created_at:Date,
    updated_at:Date
}

export interface Issue {
    id:string,
    title:string,
    description:string,
    type:'bug'|'feature_request',
    status:'open'|'in_progress'|'resolved',
    reporter_id:string,
    created_at:Date,
    updated_at:Date

}
export interface ApiResponse {
    success:boolean,
    message:string,
    data:any
}