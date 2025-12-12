"use strict";
/**
 * APLICACIÓN PRINCIPAL - Ejercicio 1-2 Programación III
 *
 * Este archivo configura y ejecuta el servidor web usando:
 * - Node.js como entorno de ejecución
 * - Express como framework web
 * - TypeScript para tipado estático
 * - EJS como motor de plantillas
 *
 * @module App
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const AnimalController_1 = require("./controllers/AnimalController");
/**
 * Configuración global de la aplicación
 * Define puertos, entornos y metadatos básicos
 */
const CONFIG = {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    environment: process.env.NODE_ENV || 'development',
    appName: 'Ejercicio 1-2 - Programación III',
    version: '1.0.0'
};
/**
 * Clase principal de la aplicación
 * Encapsula la configuración y lógica de inicio del servidor Express
 */
class AplicacionAnimales {
    /**
     * Constructor de la aplicación
     * Inicializa Express, controladores y ejecuta la configuración inicial
     */
    constructor() {
        // Inicializar instancia de Express
        this.app = (0, express_1.default)();
        // Establecer puerto
        this.port = CONFIG.port;
        // Instanciar controlador
        this.animalController = new AnimalController_1.AnimalController();
        // Ejecutar secuencia de configuración
        this.configurarMiddleware();
        this.configurarVistas();
        this.configurarRutas();
        this.configurarManejadorErrores();
    }
    /**
     * Configura los middleware globales de Express
     * Incluye parsing de body, archivos estáticos y logging
     */
    configurarMiddleware() {
        // Permite parsear datos de formularios HTML (application/x-www-form-urlencoded)
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Permite parsear JSON en cuerpos de petición
        this.app.use(express_1.default.json());
        // Configura la carpeta 'public' para servir archivos estáticos (CSS, JS, imágenes)
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        // Middleware de logging personalizado para depuración
        this.app.use((req, res, next) => {
            console.log(`📨 ${new Date().toISOString()} - ${req.method} ${req.url}`);
            next();
        });
    }
    /**
     * Configura el motor de plantillas EJS y las variables locales
     */
    configurarVistas() {
        // Establecer EJS como motor de plantillas
        this.app.set('view engine', 'ejs');
        // Definir la ruta absoluta a la carpeta de vistas
        this.app.set('views', path_1.default.join(__dirname, 'views'));
        // Variables globales disponibles en todas las vistas
        this.app.locals.appName = CONFIG.appName;
        this.app.locals.version = CONFIG.version;
        this.app.locals.environment = CONFIG.environment;
        this.app.locals.currentYear = new Date().getFullYear();
    }
    /**
     * Define todas las rutas de la aplicación y las asocia con métodos del controlador
     */
    configurarRutas() {
        // RUTA PRINCIPAL: GET /
        // Muestra la página de inicio con el formulario de búsqueda
        this.app.get('/', (req, res) => {
            this.animalController.mostrarPaginaPrincipal(req, res);
        });
        // RUTA DE BÚSQUEDA: POST /buscar-animal
        // Procesa el formulario enviado por el usuario
        this.app.post('/buscar-animal', (req, res) => {
            this.animalController.buscarAnimal(req, res);
        });
        // RUTA DETALLE: GET /animal/:nombre
        // Muestra información de un animal específico mediante parámetro de URL
        this.app.get('/animal/:nombre', (req, res) => {
            this.animalController.mostrarAnimal(req, res);
        });
        // RUTA ACERCA DE: GET /acerca-de
        // Muestra información del proyecto y desarrolladores
        this.app.get('/acerca-de', (req, res) => {
            this.animalController.mostrarAcercaDe(req, res);
        });
        // ===== API REST (Endpoints JSON) =====
        // GET /api/animales: Retorna todos los animales en formato JSON
        this.app.get('/api/animales', (req, res) => {
            this.animalController.apiObtenerAnimales(req, res);
        });
        // GET /api/animal/:nombre: Busca un animal y lo retorna en JSON
        this.app.get('/api/animal/:nombre', (req, res) => {
            this.animalController.apiBuscarAnimal(req, res);
        });
        // RUTA 404 DEFENSA: Maneja cualquier otra ruta no definida
        this.app.use((req, res) => {
            res.status(404).render('error', {
                title: 'Página no encontrada',
                page: 'error',
                errorMessage: 'La página que buscas no existe',
                codigoError: 404
            });
        });
    }
    /**
     * Configura el middleware global para manejo de errores no controlados.
     * Captura cualquier excepción lanzada durante el procesamiento de una solicitud.
     */
    configurarManejadorErrores() {
        this.app.use((error, req, res, next) => {
            console.error('💥 Error no controlado:', error);
            // Renderiza una página de error genérica (Error 500)
            res.status(500).render('error', {
                title: 'Error del servidor',
                page: 'error',
                errorMessage: 'Ha ocurrido un error interno en el servidor',
                codigoError: 500,
                // En desarrollo, mostramos el stacktrace para facilitar depuración
                stack: CONFIG.environment === 'development' ? error.stack : undefined
            });
        });
    }
    /**
     * Inicia el servidor HTTP en el puerto configurado
     */
    iniciar() {
        this.app.listen(this.port, () => {
            console.log('='.repeat(60));
            console.log(`🚀 ${CONFIG.appName} v${CONFIG.version}`);
            console.log('='.repeat(60));
            console.log(`✅ Servidor corriendo en: http://localhost:${this.port}`);
            console.log(`📂 Entorno: ${CONFIG.environment}`);
            console.log(`📁 Directorio de vistas: ${path_1.default.join(__dirname, 'views')}`);
            console.log(`📁 Archivos estáticos: ${path_1.default.join(__dirname, 'public')}`);
            console.log('='.repeat(60));
            console.log('📋 Rutas disponibles:');
            console.log(`   • GET  /              - Página principal`);
            console.log(`   • POST /buscar-animal - Buscar animal`);
            console.log(`   • GET  /animal/:nombre - Ver animal específico`);
            console.log(`   • GET  /acerca-de     - Información del proyecto`);
            console.log('='.repeat(60));
            console.log('👨‍💻 Presiona Ctrl+C para detener el servidor');
            console.log('='.repeat(60));
        });
    }
}
// Inicialización del Singleton de la aplicación
const aplicacion = new AplicacionAnimales();
// Arrancar servidor
aplicacion.iniciar();
// Manejador de señal SIGINT (Ctrl+C) para cierre ordenado
process.on('SIGINT', () => {
    console.log('\n👋 Servidor detenido por el usuario');
    process.exit(0);
});
