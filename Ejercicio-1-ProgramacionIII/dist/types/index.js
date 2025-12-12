"use strict";
/**
 * TIPOS TYPESCRIPT PARA LA APLICACIÓN
 *
 * Enums: Para valores constantes predefinidos
 * Interfaces: Para definir estructuras de objetos
 * Types: Para alias de tipos complejos
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemMessage = exports.AnimalCategory = void 0;
// ENUM - Categorías de animales
var AnimalCategory;
(function (AnimalCategory) {
    AnimalCategory["MAMIFERO"] = "MAM\u00CDFERO";
    AnimalCategory["AVE"] = "AVE";
    AnimalCategory["REPTIL"] = "REPTIL";
    AnimalCategory["PEZ"] = "PEZ";
    AnimalCategory["ANFIBIO"] = "ANFIBIO";
    AnimalCategory["INSECTO"] = "INSECTO";
})(AnimalCategory || (exports.AnimalCategory = AnimalCategory = {}));
// ENUM - Mensajes del sistema
var SystemMessage;
(function (SystemMessage) {
    SystemMessage["SUCCESS"] = "Operaci\u00F3n exitosa";
    SystemMessage["ERROR"] = "Ha ocurrido un error";
    SystemMessage["NOT_FOUND"] = "Recurso no encontrado";
    SystemMessage["INVALID_INPUT"] = "Entrada inv\u00E1lida";
})(SystemMessage || (exports.SystemMessage = SystemMessage = {}));
