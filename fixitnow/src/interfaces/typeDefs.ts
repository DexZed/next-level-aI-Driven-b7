export interface User {
    id?:string,
    name:string,
    email:string,
    password_hash:string,
    role:"CUSTOMER"|"TECHNICIAN"|"ADMIN",
    created_at?:Date,
    updated_at?:Date
}

interface User {
    id?:string,
    name:string,
    email:string,
    password_hash:string,
    role:"CUSTOMER"|"TECHNICIAN"|"ADMIN",
    created_at?:Date,
    updated_at?:Date
}