export interface DatosUsuarios {
    celular: any;
    cp: string;
    direccion: string;
    dni: number;
    email: string;
    fecha_activacion: any;
    fecha_nacimiento: number;
    id: string;
    nombre: string;
    novedades: boolean;
    perfils: Perfils[];    
    sexo: string;
    telefono: number;
    username: number;
    roles: any;
}

export interface Perfils {
    descripcion: string;
    id: number;
    nombre: string;
    rol_id: number;
}

export interface Roles {
    role_admin: boolean;
    role_productor: boolean;
    role_admin_to: boolean;
    role_client: boolean;
}