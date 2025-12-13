/**
 * EJERCICIO: ENUMERACIONES EN TYPESCRIPT
 * Este archivo contiene la lógica principal de la aplicación.
 * Demuestra el uso de 'enum', manipulación del DOM y eventos.
 */

// 1. DEFINICIÓN DE ENUMS
// Los enums nos permiten definir un conjunto de constantes con nombre.
// Aquí definimos los Géneros permitidos para las películas.
enum Genre {
    Action = "Acción",
    Drama = "Aventura",
    Comedy = "Comedia",
    Horror = "Suspenso",
    SciFi = "Ciencia Ficción",
}

// Aquí definimos los Países permitidos.
enum Country {
    USA = "Estados Unidos",
    UK = "Alemania",
    France = "Francia",
    Japan = "Japón",
    Spain = "España",
    Brazil = "Mexico"
}

// 2.CLASES
// Usamos una clase para definir la estructura de lo que es una "Película" en nuestro sistema.
// El constructor utiliza la sintaxis abreviada de TypeScript para definir e inicializar propiedades a la vez.
class Movie {
    constructor(
        public title: string,   // Nombre de la película
        public genre: Genre,    // Debe ser uno de los valores del Enum Genre
        public country: Country // Debe ser uno de los valores del Enum Country
    ) { }
}

// 3. SELECCIÓN DE ELEMENTOS DEL DOM
// Obtenemos referencias a los elementos HTML con los que vamos a interactuar.
// Usamos 'as HTML...' para decirle a TypeScript qué tipo de elemento es exactamente (Type Casting).
const genreSelect = document.getElementById('genreSelect') as HTMLSelectElement;
const countrySelect = document.getElementById('countrySelect') as HTMLSelectElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const movieNameInput = document.getElementById('movieName') as HTMLInputElement;
const movieList = document.getElementById('movieList') as HTMLDivElement;

/**
 * Inicializa las opciones de los menús desplegables (selects)
 * Recorre los valores de los Enums y crea etiquetas <option> para el HTML.
 */
function initOptions() {
    // Llenar el select de Géneros
    // Object.values(Genre) nos devuelve un array con los valores: ["Acción", "Aventura", ...]
    Object.values(Genre).forEach((genre: string) => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });

    // Llenar el select de Países
    Object.values(Country).forEach((country: string) => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

/**
 * Función que se ejecuta al hacer clic en el botón "Agregar Película".
 * Captura los datos, valida y crea el objeto.
 */
function addMovie() {
    // Capturamos los valores actuales del formulario
    const title = movieNameInput.value;
    const genre = genreSelect.value as Genre;     // Forzamos el tipo a Genre
    const country = countrySelect.value as Country; // Forzamos el tipo a Country

    // Validación simple: verificar que no haya campos vacíos
    if (title.trim() === '' || genreSelect.value === '' || countrySelect.value === '') {
        alert('Por favor completa todos los campos');
        return; // Detenemos la ejecución si hay error
    }

    // Instanciamos un nuevo objeto Película
    const newMovie = new Movie(title, genre, country);

    // Llamamos a la función encargada de pintar en pantalla
    renderMovie(newMovie);

    // Limpiamos el formulario para la siguiente entrada
    movieNameInput.value = '';
    genreSelect.selectedIndex = 0;
    countrySelect.selectedIndex = 0;
}

/**
 * Crea el elemento visual (HTML) para una película y lo agrega a la lista.
 * @param movie El objeto película a mostrar
 */
function renderMovie(movie: Movie) {
    const card = document.createElement('div');
    card.className = 'movie-card'; // Clase CSS para estilos

    // Insertamos el HTML dentro de la tarjeta usando Template Strings (``)
    card.innerHTML = `
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <div class="movie-details">
                <span class="tag">🎬 ${movie.genre}</span>
                <span class="tag">🌍 ${movie.country}</span>
            </div>
        </div>
    `;

    // .prepend() agrega el elemento AL PRINCIPIO de la lista (nueva película arriba)
    movieList.prepend(card);
}

// 4. EVENTOS
// Esperamos a que el HTML termine de cargar para iniciar las opciones
document.addEventListener('DOMContentLoaded', initOptions);
// Escuchamos el clic en el botón
addBtn.addEventListener('click', addMovie);
