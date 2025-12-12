/**
 * TIPOS TYPESCRIPT PARA LA APLICACIÓN
 * 
 * Enums: Para valores constantes predefinidos
 * Interfaces: Para definir estructuras de objetos
 * Types: Para alias de tipos complejos
 */

// ENUM - Categorías de animales
export enum AnimalCategory {
  MAMIFERO = 'MAMÍFERO',
  AVE = 'AVE',
  REPTIL = 'REPTIL',
  PEZ = 'PEZ',
  ANFIBIO = 'ANFIBIO',
  INSECTO = 'INSECTO'
}

// ENUM - Mensajes del sistema
export enum SystemMessage {
  SUCCESS = 'Operación exitosa',
  ERROR = 'Ha ocurrido un error',
  NOT_FOUND = 'Recurso no encontrado',
  INVALID_INPUT = 'Entrada inválida'
}

// INTERFACE - Estructura de un Animal
export interface IAnimal {
  id: string;
  nombre: string;
  nombreCientifico: string;
  categoria: AnimalCategory;
  descripcion: string;
  habitat: string;
  datoCurioso: string;
  imagenURL: string;
  esDomestico: boolean;
}

// INTERFACE - Datos del formulario
export interface IAnimalFormData {
  nombreAnimal: string;
  emailUsuario?: string;
  comentario?: string;
}

// INTERFACE - Respuesta de la API
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: Date;
  code: number;
}

// TYPE - Configuración de la aplicación
export type AppConfig = {
  port: number;
  environment: 'development' | 'production' | 'test';
  appName: string;
  version: string;
};

// TYPE - Datos para las vistas EJS
export type ViewData = {
  title: string;
  page: string;
  [key: string]: any;
};