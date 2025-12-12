"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalController = void 0;
// import { AnimalModel } from '../models/AnimalModel.js'; // Eliminado modelo externo
const index_js_1 = require("../types/index.js");
/**
 * CONTROLADOR DE ANIMALES
 *
 * Maneja la lógica de negocio, datos y las respuestas HTTP.
 * Ahora contiene los datos directamente (patrón Single File para simplicidad).
 */
class AnimalController {
    constructor() {
        // Base de datos en memoria (Migrada del Modelo)
        this.animales = [
            {
                id: '1',
                nombre: 'León',
                nombreCientifico: 'Panthera leo',
                categoria: index_js_1.AnimalCategory.MAMIFERO,
                descripcion: 'El león es un mamífero carnívoro de la familia de los félidos. Es conocido como el "rey de la selva".',
                habitat: 'Sabanas africanas',
                datoCurioso: 'Los leones pueden dormir hasta 20 horas al día.',
                imagenURL: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400',
                esDomestico: false
            },
            {
                id: '2',
                nombre: 'Águila Real',
                nombreCientifico: 'Aquila chrysaetos',
                categoria: index_js_1.AnimalCategory.AVE,
                descripcion: 'El águila real es una de las aves de presa más conocidas y ampliamente distribuidas.',
                habitat: 'Montañas y zonas abiertas',
                datoCurioso: 'Pueden ver a una distancia de hasta 3 kilómetros.',
                imagenURL: 'https://images.unsplash.com/photo-1597848212624-e6f1f5d6f7d0?w=400',
                esDomestico: false
            },
            {
                id: '3',
                nombre: 'Serpiente Cascabel',
                nombreCientifico: 'Crotalus',
                categoria: index_js_1.AnimalCategory.REPTIL,
                descripcion: 'Serpiente venenosa conocida por el sonido de su cascabel en la punta de la cola.',
                habitat: 'Desiertos y zonas áridas',
                datoCurioso: 'El cascabel está formado por segmentos de queratina que se añaden en cada muda.',
                imagenURL: 'https://images.unsplash.com/photo-1551969014-7c8b4c4c8c4c?w=400',
                esDomestico: false
            },
            {
                id: '4',
                nombre: 'Delfín Nariz de Botella',
                nombreCientifico: 'Tursiops truncatus',
                categoria: index_js_1.AnimalCategory.MAMIFERO,
                descripcion: 'Delfín muy inteligente y sociable, conocido por su hocico en forma de botella.',
                habitat: 'Océanos templados y tropicales',
                datoCurioso: 'Los delfines tienen nombres únicos que usan para identificarse entre sí.',
                imagenURL: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400',
                esDomestico: false
            },
            {
                id: '5',
                nombre: 'Mariposa Monarca',
                nombreCientifico: 'Danaus plexippus',
                categoria: index_js_1.AnimalCategory.INSECTO,
                descripcion: 'Conocida por su increíble migración anual y sus alas anaranjadas con venas negras.',
                habitat: 'América del Norte',
                datoCurioso: 'Pueden migrar hasta 4,000 kilómetros desde Canadá hasta México.',
                imagenURL: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400',
                esDomestico: false
            },
            {
                id: '6',
                nombre: 'Perro',
                nombreCientifico: 'Canis lupus familiaris',
                categoria: index_js_1.AnimalCategory.MAMIFERO,
                descripcion: 'El mejor amigo del hombre, domesticado hace miles de años.',
                habitat: 'Global (doméstico)',
                datoCurioso: 'Los perros pueden oler enfermedades como el cáncer y la diabetes.',
                imagenURL: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400',
                esDomestico: true
            }
        ];
        // Ya no se instancia un modelo externo
    }
    // --- MÉTODOS PRIVADOS DE LÓGICA DE DATOS (Anteriormente en AnimalModel) ---
    /**
     * Buscar animal por nombre (case insensitive)
     */
    buscarPorNombreModelo(nombre) {
        return this.animales.find(animal => animal.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
            animal.nombreCientifico.toLowerCase().includes(nombre.toLowerCase()));
    }
    /**
     * Obtener un animal aleatorio
     */
    obtenerAleatorioModelo() {
        const indice = Math.floor(Math.random() * this.animales.length);
        return this.animales[indice];
    }
    /**
     * Genera estadísticas
     */
    obtenerEstadisticasModelo() {
        return {
            total: this.animales.length,
            porCategoria: Object.values(index_js_1.AnimalCategory).map(categoria => ({
                categoria,
                cantidad: this.animales.filter(a => a.categoria === categoria).length
            })),
            domesticos: this.animales.filter(a => a.esDomestico).length,
            salvajes: this.animales.filter(a => !a.esDomestico).length
        };
    }
    /**
     * Genera un animal personalizado
     */
    crearPersonalizadoModelo(nombre) {
        const categorias = Object.values(index_js_1.AnimalCategory);
        const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
        return {
            id: `custom-${Date.now()}`,
            nombre: nombre,
            nombreCientifico: 'Desconocido',
            categoria: categoriaAleatoria,
            descripcion: `El ${nombre} es un animal fascinante sobre el que tenemos poca información en nuestra base de datos.`,
            habitat: 'Desconocido',
            datoCurioso: '¡Este animal es tan especial que no está en nuestra base de datos!',
            imagenURL: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
            esDomestico: false
        };
    }
    // --- MÉTODOS PÚBLICOS DEL CONTROLADOR ---
    /**
     * Muestra la página principal de la aplicación.
     */
    mostrarPaginaPrincipal(req, res) {
        const animalesPopulares = this.animales.slice(0, 5);
        const animalAleatorio = this.obtenerAleatorioModelo();
        const estadisticas = this.obtenerEstadisticasModelo();
        res.render('index', {
            title: 'Ejercicio 1-2 - Programación III',
            page: 'inicio',
            animalesPopulares,
            animalAleatorio,
            estadisticas,
            categorias: Object.values(index_js_1.AnimalCategory),
            mensaje: '¡Bienvenido a la aplicación de animales favoritos!'
        });
    }
    /**
     * Procesa el formulario de búsqueda de animal enviado por POST.
     */
    buscarAnimal(req, res) {
        try {
            const { nombreAnimal, emailUsuario, comentario } = req.body;
            console.log(`🔍 Búsqueda recibida: ${nombreAnimal}`);
            console.log(`📧 Email: ${emailUsuario || 'No proporcionado'}`);
            console.log(`💬 Comentario: ${comentario || 'No proporcionado'}`);
            // Validación básica
            if (!nombreAnimal || nombreAnimal.trim().length < 2) {
                return res.render('error', {
                    title: 'Error - Ejercicio 1-2',
                    page: 'error',
                    errorMessage: 'Por favor, ingresa un nombre de animal válido (mínimo 2 caracteres)',
                    codigoError: 400
                });
            }
            // Buscar el animal (usando método interno)
            const animalEncontrado = this.buscarPorNombreModelo(nombreAnimal.trim());
            if (animalEncontrado) {
                res.render('animal-info', {
                    title: `${animalEncontrado.nombre} - Ejercicio 1-2`,
                    page: 'animal-info',
                    animal: animalEncontrado,
                    esPersonalizado: false,
                    datosFormulario: { nombreAnimal, emailUsuario, comentario },
                    categorias: Object.values(index_js_1.AnimalCategory)
                });
            }
            else {
                // Crear personalizado
                const animalPersonalizado = this.crearPersonalizadoModelo(nombreAnimal.trim());
                res.render('animal-info', {
                    title: `${animalPersonalizado.nombre} - Ejercicio 1-2`,
                    page: 'animal-info',
                    animal: animalPersonalizado,
                    esPersonalizado: true,
                    datosFormulario: { nombreAnimal, emailUsuario, comentario },
                    categorias: Object.values(index_js_1.AnimalCategory),
                    mensajeEspecial: '¡Este animal no estaba en nuestra base de datos! Hemos creado información especial para ti.'
                });
            }
        }
        catch (error) {
            console.error('❌ Error en búsqueda de animal:', error);
            res.render('error', {
                title: 'Error - Ejercicio 1-2',
                page: 'error',
                errorMessage: 'Ha ocurrido un error al procesar tu solicitud',
                codigoError: 500
            });
        }
    }
    /**
     * Muestra la información de un animal específico.
     */
    mostrarAnimal(req, res) {
        try {
            const nombreAnimal = req.params.nombre;
            const animalEncontrado = this.buscarPorNombreModelo(nombreAnimal);
            if (animalEncontrado) {
                res.render('animal-info', {
                    title: `${animalEncontrado.nombre} - Ejercicio 1-2`,
                    page: 'animal-info',
                    animal: animalEncontrado,
                    esPersonalizado: false,
                    categorias: Object.values(index_js_1.AnimalCategory)
                });
            }
            else {
                res.render('error', {
                    title: 'Error - Ejercicio 1-2',
                    page: 'error',
                    errorMessage: `No se encontró información sobre "${nombreAnimal}"`,
                    codigoError: 404
                });
            }
        }
        catch (error) {
            console.error('❌ Error al mostrar animal:', error);
            res.render('error', {
                title: 'Error - Ejercicio 1-2',
                page: 'error',
                errorMessage: 'Error interno del servidor',
                codigoError: 500
            });
        }
    }
    /**
     * API REST: Obtener todos
     */
    apiObtenerAnimales(req, res) {
        try {
            const response = {
                success: true,
                message: index_js_1.SystemMessage.SUCCESS,
                data: {
                    animales: this.animales,
                    estadisticas: this.obtenerEstadisticasModelo()
                },
                timestamp: new Date(),
                code: 200
            };
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json({ success: false, code: 500 });
        }
    }
    /**
     * API REST: Buscar animal
     */
    apiBuscarAnimal(req, res) {
        try {
            const nombre = req.params.nombre;
            const animal = this.buscarPorNombreModelo(nombre);
            const response = {
                success: true,
                message: animal ? index_js_1.SystemMessage.SUCCESS : index_js_1.SystemMessage.NOT_FOUND,
                data: animal || null,
                timestamp: new Date(),
                code: animal ? 200 : 404
            };
            res.status(response.code).json(response);
        }
        catch (error) {
            res.status(500).json({ success: false, code: 500 });
        }
    }
    // mostrarAcercaDe se mantiene igual...
    mostrarAcercaDe(req, res) {
        res.render('acerca-de', {
            title: 'Acerca de - Ejercicio 1-2',
            page: 'acerca-de',
            tecnologias: [
                { nombre: 'Node.js', descripcion: 'Entorno de ejecución de JavaScript del lado del servidor' },
                { nombre: 'Express', descripcion: 'Framework web para Node.js' },
                { nombre: 'TypeScript', descripcion: 'Superset de JavaScript con tipado estático' },
                { nombre: 'EJS', descripcion: 'Motor de plantillas para generar vistas HTML dinámicas' },
                { nombre: 'HTML5/CSS3', descripcion: 'Lenguajes de marcado y estilos para la web' }
            ],
            estudiantes: [
                { nombre: 'Estudiante 1', carnet: 'C001', rol: 'Desarrollador Backend' },
                { nombre: 'Estudiante 2', carnet: 'C002', rol: 'Desarrollador Frontend' },
                { nombre: 'Estudiante 3', carnet: 'C003', rol: 'Diseñador UI/UX' }
            ]
        });
    }
}
exports.AnimalController = AnimalController;
