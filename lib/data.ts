import type { Product, BlogPost, Review } from "@/lib/types"
import { supabase } from "./supabase"; 

export const products: Product[] = [
  {
    id: 1,
    name: "Etiopía Yirgacheffe",
    price: 18.99,
    description:
      "Nuestro Etiopía Yirgacheffe es un café brillante y complejo con notas florales, acidez cítrica y un final suave y limpio. Cultivado a gran altitud en la región de Yirgacheffe en Etiopía, estos granos muestran el terroir único de su origen.",
    shortDescription: "Notas florales brillantes con acidez cítrica",
    origin: "Etiopía",
    roast: "Ligero",
    weight: "340g",
    process: "Lavado",
    altitude: "1,800-2,200 metros",
    flavor_notes: ["Jazmín", "Limón", "Bergamota", "Té Negro"],
    image: "/images/colombian.png",
    slug: "ethiopian-yirgacheffe",
    category: "single-origin",
    featured: true,
    stock: 25,
  },
  {
    id: 2,
    name: "Colombia Supremo",
    price: 16.99,
    description:
      "Nuestro Colombia Supremo ofrece un perfil equilibrado con notas dulces de caramelo y nueces. Cultivado en las regiones montañosas de Colombia, este café de cuerpo medio presenta una acidez brillante y un final limpio.",
    shortDescription: "Sabores dulces a caramelo y nueces",
    origin: "Colombia",
    roast: "Medio",
    weight: "340g",
    process: "Lavado",
    altitude: "1,400-1,800 metros",
    flavor_notes: ["Caramelo", "Nuez", "Chocolate con leche", "Manzana"],
    image: "/images/colombian.png",
    slug: "colombian-supremo",
    category: "single-origin",
    featured: true,
    stock: 0,
  },
  {
    id: 3,
    name: "Sumatra Mandheling",
    price: 17.99,
    description:
      "Nuestro Sumatra Mandheling es un café audaz y terroso con un cuerpo completo y baja acidez. Procesado mediante el método húmedo de Sumatra, estos granos desarrollan un perfil único con notas herbales y especiadas.",
    shortDescription: "Notas terrosas y herbales con cuerpo completo",
    origin: "Indonesia",
    roast: "Oscuro",
    weight: "340g",
    process: "Semi-lavado",
    altitude: "900-1,500 metros",
    flavor_notes: ["Tierra", "Hierbas", "Especias", "Cedro"],
    image: "/images/brazil.png",
    slug: "sumatra-mandheling",
    category: "single-origin",
    featured: true,
    stock: 15,
  },
  {
    id: 4,
    name: "Guatemala Antigua",
    price: 18.99,
    description:
      "Nuestro Guatemala Antigua ofrece un perfil de sabor complejo con notas de chocolate y especias. Cultivado en suelos volcánicos a gran altitud, este café presenta un cuerpo medio y un final equilibrado y suave.",
    shortDescription: "Notas de chocolate y especias con un final suave",
    origin: "Guatemala",
    roast: "Medio",
    weight: "340g",
    process: "Lavado",
    altitude: "1,500-1,700 metros",
    flavor_notes: ["Chocolate", "Canela", "Naranja", "Caramelo"],
    image: "/images/guatemala.png",
    slug: "guatemala-antigua",
    category: "single-origin",
    featured: true,
    stock: 20,
  },
  {
    id: 5,
    name: "Costa Rica Tarrazu",
    price: 19.99,
    description:
      "Nuestro Costa Rica Tarrazu es un café brillante y limpio con notas de miel y cítricos. Cultivado en la prestigiosa región de Tarrazu, este café ofrece un equilibrio perfecto entre dulzura y acidez.",
    shortDescription: "Taza brillante y limpia con notas de miel y cítricos",
    origin: "Costa Rica",
    roast: "Medio-Ligero",
    weight: "340g",
    process: "Lavado",
    altitude: "1,200-1,800 metros",
    flavor_notes: ["Miel", "Naranja", "Caña de azúcar", "Manzana"],
    image: "/images/costa-rica.png",
    slug: "costa-rica-tarrazu",
    category: "single-origin",
    new: true,
    stock: 18,
  },
  {
    id: 6,
    name: "Kenia AA",
    price: 21.99,
    description:
      "Nuestro Kenia AA es un café vibrante con una acidez audaz tipo vino y notas de grosella negra y bayas. La clasificación AA indica los granos más grandes y de mayor calidad, que producen una taza excepcionalmente compleja.",
    shortDescription: "Acidez audaz tipo vino con notas de grosella negra",
    origin: "Kenia",
    roast: "Medio",
    weight: "340g",
    process: "Lavado",
    altitude: "1,700-2,000 metros",
    flavor_notes: ["Grosella negra", "Tomate", "Bayas", "Caramelo"],
    image: "/images/kenya.png",
    slug: "kenya-aa",
    category: "single-origin",
    new: true,
    stock: 12,
  },
  {
    id: 7,
    name: "Brasil Cerrado",
    price: 15.99,
    description:
      "Nuestro Brasil Cerrado ofrece un perfil suave y equilibrado con notas a nuez y chocolate. Cultivado en la región de Cerrado, este café de cuerpo medio presenta un dulzor natural y un final limpio.",
    shortDescription: "Notas de chocolate y nueces con dulzura suave",
    origin: "Brasil",
    roast: "Medio-Oscuro",
    weight: "340g",
    process: "Natural",
    altitude: "800-1,200 metros",
    flavor_notes: ["Nuez", "Chocolate", "Caramelo", "Avellana"],
    image: "/images/brazil.png",
    slug: "brazil-cerrado",
    category: "single-origin",
    new: true,
    stock: 35,
  },
  {
    id: 8,
    name: "Panamá Geisha",
    price: 34.99,
    description:
      "Nuestro Panamá Geisha es un café excepcional con cualidades florales y tipo té. Esta variedad rara y premiada ofrece un perfil de sabor complejo con notas de jazmín, bergamota y frutas tropicales.",
    shortDescription: "Excepcionales cualidades florales y similares al té",
    origin: "Panamá",
    roast: "Ligero",
    weight: "227g",
    process: "Lavado",
    altitude: "1,600-1,800 metros",
    flavor_notes: ["Jazmín", "Bergamota", "Melocotón", "Miel"],
    image: "/images/panama.png",
    slug: "panama-geisha",
    category: "single-origin",
    new: true,
    stock: 8,
  },
  {
    id: 9,
    name: "Mezcla Espresso Clásica",
    price: 17.99,
    description:
      "Nuestra Mezcla Espresso Clásica combina granos de Brasil, Colombia y Etiopía para crear un espresso equilibrado con notas de chocolate, caramelo y un toque de fruta. Perfecta para espressos, lattes y cappuccinos.",
    shortDescription: "Mezcla equilibrada para espresso con notas de chocolate y caramelo",
    origin: "Brasil, Colombia, Etiopía",
    roast: "Medio-Oscuro",
    weight: "340g",
    flavor_notes: ["Chocolate", "Caramelo", "Nuez", "Frutas rojas"],
    image: "/images/colombian.png",
    slug: "mezcla-espresso-clasica",
    category: "blends",
    featured: true,
    stock: 40,
  },
  {
    id: 10,
    name: "Mezcla Desayuno Onsen",
    price: 16.99,
    description:
      "Nuestra Mezcla Desayuno Onsen es una combinación reconfortante de granos de América Central y del Sur, tostados a un nivel medio para resaltar notas de chocolate, nueces y caramelo. Perfecta para comenzar el día.",
    shortDescription: "Mezcla reconfortante con notas de chocolate y nueces",
    origin: "Guatemala, Colombia, Brasil",
    roast: "Medio",
    weight: "340g",
    flavor_notes: ["Chocolate", "Nuez", "Caramelo", "Manzana"],
    image: "/images/colombian.png",
    slug: "mezcla-desayuno-onsen",
    category: "blends",
    stock: 25,
  },
  {
    id: 11,
    name: "Mezcla Oscura Montaña",
    price: 16.99,
    description:
      "Nuestra Mezcla Oscura Montaña combina granos de Indonesia y América Central tostados a un nivel oscuro para crear un café robusto con cuerpo completo y notas de chocolate negro, especias y un final ahumado.",
    shortDescription: "Mezcla oscura con cuerpo completo y notas de chocolate negro",
    origin: "Indonesia, Guatemala, Honduras",
    roast: "Oscuro",
    weight: "340g",
    flavor_notes: ["Chocolate negro", "Especias", "Ahumado", "Nuez"],
    image: "/images/colombian.png",
    slug: "mezcla-oscura-montana",
    category: "blends",
    stock: 20,
  },
  {
    id: 12,
    name: "Descafeinado Colombiano",
    price: 18.99,
    description:
      "Nuestro Descafeinado Colombiano ofrece todo el sabor de un excelente café colombiano sin la cafeína. Procesado mediante el método de agua suiza, conserva las notas de caramelo, nuez y chocolate con un cuerpo medio.",
    shortDescription: "Café colombiano descafeinado con notas de caramelo y nuez",
    origin: "Colombia",
    roast: "Medio",
    weight: "340g",
    process: "Descafeinado por Agua Suiza",
    flavor_notes: ["Caramelo", "Nuez", "Chocolate", "Manzana"],
    image: "/images/colombian.png",
    slug: "descafeinado-colombiano",
    category: "decaf",
    stock: 15,
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "El Arte del Pour Over",
    excerpt:
      "Domina la técnica de preparación pour over para una taza limpia y llena de sabor cada vez. Aprende sobre los diferentes métodos, equipos y consejos de nuestros baristas expertos.",
    content: `
      <p>La preparación de café pour over es un método que implica verter agua caliente sobre granos de café molidos contenidos en un filtro. El agua se drena a través del café y el filtro hacia una jarra o taza. La preparación pour over es conocida por producir una taza de café limpia y llena de sabor, y permite un control preciso sobre el proceso de preparación.</p>
      
      <h2>El Equipo que Necesitarás</h2>
      
      <p>Para comenzar con la preparación pour over, necesitarás algunas piezas esenciales de equipo:</p>
      
      <ul>
        <li><strong>Dripper Pour Over:</strong> Este es el dispositivo que sostiene el filtro y el café. Las opciones populares incluyen el Hario V60, Kalita Wave y Chemex.</li>
        <li><strong>Filtros de Papel:</strong> Estos deben ser específicos para tu dripper. Cada tipo de filtro afecta el sabor de manera diferente.</li>
        <li><strong>Tetera:</strong> Idealmente una tetera de cuello de ganso, que permite un vertido preciso.</li>
        <li><strong>Báscula:</strong> Para medir el café y el agua con precisión.</li>
        <li><strong>Temporizador:</strong> Para seguir el proceso de preparación.</li>
        <li><strong>Granos de Café Recién Tostados:</strong> Los tuestes medios a ligeros suelen funcionar mejor para pour over.</li>
        <li><strong>Molinillo de Muelas:</strong> Para moler tus granos justo antes de la preparación.</li>
      </ul>
      
      <h2>El Método Básico de Pour Over</h2>
      
      <p>Aquí hay una guía paso a paso para preparar café pour over:</p>
      
      <ol>
        <li><strong>Calentar Agua:</strong> Lleva el agua a unos 93°C, justo por debajo del punto de ebullición.</li>
        <li><strong>Moler Café:</strong> Muele tu café a una consistencia media-fina, similar a la sal de mesa.</li>
        <li><strong>Preparar el Filtro:</strong> Coloca el filtro en tu dripper y enjuágalo con agua caliente. Esto elimina cualquier sabor a papel y precalienta tu equipo de preparación.</li>
        <li><strong>Añadir Café:</strong> Añade tu café molido al filtro. Para una taza estándar, comienza con 15g de café para 250g de agua (una proporción de 1:16.7).</li>
        <li><strong>Bloom:</strong> Inicia tu temporizador y vierte solo el agua suficiente (aproximadamente el doble del peso del café) para saturar todos los granos. Déjalo reposar durante 30-45 segundos. Esto permite que el café libere gases y asegura una extracción uniforme.</li>
        <li><strong>Vertido Principal:</strong> Vierte lentamente el agua restante en un movimiento circular, manteniendo el nivel de agua constante. Apunta a terminar de verter a los 1:30-2:00 minutos.</li>
        <li><strong>Drenaje:</strong> Permite que toda el agua se drene a través del lecho de café. El tiempo total de preparación debería ser de alrededor de 2:30-3:30 minutos.</li>
      </ol>
      
      <h2>Variables que Afectan tu Preparación</h2>
      
      <p>Varios factores pueden influir en el sabor de tu café pour over:</p>
      
      <ul>
        <li><strong>Tamaño de Molienda:</strong> Las moliendas más finas extraen más rápidamente y pueden llevar a sabores amargos si son demasiado finas. Las moliendas más gruesas extraen más lentamente y pueden llevar a un café ácido y débil si son demasiado gruesas.</li>
        <li><strong>Temperatura del Agua:</strong> Las temperaturas más altas extraen más rápidamente y pueden resaltar la acidez. Las temperaturas más bajas extraen más lentamente y pueden resaltar la dulzura.</li>
        <li><strong>Tasa de Vertido:</strong> Verter demasiado rápido puede canalizar el agua a través del lecho de café de manera desigual. Verter demasiado lentamente puede sobre-extraer el café.</li>
        <li><strong>Proporción de Café a Agua:</strong> Más café en relación con el agua crea una preparación más fuerte. Menos café crea una preparación más débil.</li>
      </ul>
      
      <h2>Solución de Problemas Comunes</h2>
      
      <p>Si tu café no sabe bien, aquí hay algunos ajustes que puedes hacer:</p>
      
      <ul>
        <li><strong>El Café Sabe Ácido o Débil:</strong> Prueba una molienda más fina, aumenta el tiempo de preparación o usa agua más caliente.</li>
        <li><strong>El Café Sabe Amargo o Áspero:</strong> Prueba una molienda más gruesa, disminuye el tiempo de preparación o usa agua ligeramente más fría.</li>
        <li><strong>El Café se Drena Demasiado Rápido:</strong> Usa una molienda más fina o vierte más lentamente en un patrón circular.</li>
        <li><strong>El Café se Drena Demasiado Lentamente:</strong> Usa una molienda más gruesa o verifica si estás usando demasiado café.</li>
      </ul>
      
      <h2>Técnicas Avanzadas</h2>
      
      <p>Una vez que hayas dominado los conceptos básicos, puedes experimentar con técnicas más avanzadas:</p>
      
      <ul>
        <li><strong>Vertido por Pulsos:</strong> En lugar de un vertido continuo, prueba múltiples vertidos más pequeños. Esto puede ayudar a mantener la temperatura y asegurar una extracción uniforme.</li>
        <li><strong>Agitación:</strong> Remover suavemente el lecho de café durante la preparación puede ayudar a asegurar que todos los granos se extraigan uniformemente.</li>
        <li><strong>Diferentes Patrones de Vertido:</strong> Prueba patrones de vertido desde el centro hacia afuera, en espiral u otros para ver cómo afectan el sabor.</li>
      </ul>
      
      <p>La preparación pour over es tanto un arte como una ciencia. Con práctica y atención al detalle, podrás preparar café que resalte las características únicas de cada grano, creando una taza que sea limpia, llena de sabor y perfectamente adaptada a tus preferencias de sabor.</p>
    `,
    date: "15 Mayo, 2023",
    readTime: "8 min de lectura",
    category: "Guías de Preparación",
    author: {
      name: "Alejandro Rodríguez",
      role: "Barista Principal",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    image: "/images/pour-over.png",
    slug: "el-arte-del-pour-over",
  },
  {
    id: 2,
    title: "Entendiendo los Orígenes del Café",
    excerpt:
      "Cómo la geografía, el clima y los métodos de procesamiento afectan el perfil de sabor de tu café. Explora las características únicas de los granos de diferentes regiones del mundo.",
    content: `
      <p>El origen del café es uno de los factores más importantes que influyen en su sabor. Desde las montañas de Etiopía hasta las laderas de Colombia, cada región productora de café imparte características únicas a sus granos, creando perfiles de sabor distintivos que los entusiastas del café aprecian.</p>
      
      <h2>¿Por qué Importa el Origen?</h2>
      
      <p>El sabor del café está influenciado por una combinación de factores, incluyendo:</p>
      
      <ul>
        <li><strong>Terroir:</strong> Similar al vino, el terroir del café—la combinación única de suelo, clima, altitud y condiciones de cultivo—afecta significativamente su sabor.</li>
        <li><strong>Variedad:</strong> Diferentes variedades de la planta de café (como Typica, Bourbon, Gesha) tienen perfiles de sabor inherentemente diferentes.</li>
        <li><strong>Procesamiento:</strong> Los métodos utilizados para procesar los granos de café después de la cosecha (lavado, natural, honey) también impactan el sabor final.</li>
      </ul>
      
      <h2>Principales Regiones Productoras de Café</h2>
      
      <p>Exploremos algunas de las principales regiones productoras de café y lo que hace que sus granos sean especiales:</p>
      
      <h3>África</h3>
      
      <p><strong>Etiopía:</strong> Considerada la cuna del café, Etiopía produce granos con notas florales, afrutadas y a veces con sabores a bayas. Las regiones como Yirgacheffe, Sidamo y Harrar son particularmente conocidas por sus cafés distintivos.</p>
      
      <p><strong>Kenia:</strong> Los cafés kenianos son conocidos por su brillante acidez y sabores complejos que pueden incluir notas a grosella negra, tomate y cítricos. El sistema de clasificación AA denota los granos más grandes y a menudo de mayor calidad.</p>
      
      <h3>América Central y del Sur</h3>
      
      <p><strong>Colombia:</strong> Uno de los productores más conocidos, Colombia ofrece cafés con un perfil equilibrado, acidez media a alta, y a menudo notas de caramelo, nueces y frutas.</p>
      
      <p><strong>Guatemala:</strong> Los cafés guatemaltecos varían según la región, pero a menudo presentan notas de chocolate, especias y a veces frutas. Regiones como Antigua, Huehuetenango y Atitlán producen perfiles distintivos.</p>
      
      <p><strong>Costa Rica:</strong> Conocido por cafés limpios y brillantes con acidez cítrica y a menudo notas de miel y frutas.</p>
      
      <p><strong>Brasil:</strong> El mayor productor de café del mundo, Brasil es conocido por cafés con cuerpo, baja acidez y notas de nuez y chocolate, que los hacen ideales para espresso.</p>
      
      <h3>Asia y el Pacífico</h3>
      
      <p><strong>Indonesia:</strong> Islas como Sumatra, Java y Sulawesi producen cafés con cuerpo completo, baja acidez y a menudo notas terrosas, herbales y especiadas. El procesamiento "wet-hulled" único de la región contribuye a estos perfiles distintivos.</p>
      
      <p><strong>Vietnam:</strong> Principalmente produce café robusta, que tiene un sabor más fuerte y amargo que el arábica, con aproximadamente el doble de cafeína.</p>
      
      <h2>Cómo el Procesamiento Afecta el Sabor</h2>
      
      <p>Además del origen, el método de procesamiento utilizado después de la cosecha tiene un impacto significativo en el sabor:</p>
      
      <ul>
        <li><strong>Proceso Lavado (Wet Process):</strong> Los granos se despulpan y fermentan para eliminar la capa mucilaginosa antes del secado. Esto tiende a producir cafés con mayor acidez, cuerpo más ligero y sabores más limpios y brillantes.</li>
        <li><strong>Proceso Natural (Dry Process):</strong> Los granos se secan con toda la cereza intacta. Esto a menudo resulta en cafés con cuerpo más completo, menor acidez y sabores más frutados y a veces fermentados.</li>
        <li><strong>Proceso Honey:</strong> Un método intermedio donde se elimina la piel pero se deja algo o toda la mucosidad durante el secado. Dependiendo de cuánta mucosidad se deje, esto puede crear cafés con diferentes niveles de dulzura y complejidad.</li>
      </ul>
      
      <h2>Cómo Explorar los Orígenes del Café</h2>
      
      <p>Para apreciar verdaderamente cómo el origen afecta el sabor del café, considera estas estrategias:</p>
      
      <ul>
        <li><strong>Catas Comparativas:</strong> Prepara cafés de diferentes orígenes uno al lado del otro, utilizando el mismo método de preparación y proporción.</li>
        <li><strong>Café de Origen Único:</strong> Busca cafés etiquetados como "origen único" en lugar de mezclas, para experimentar las características distintivas de una región específica.</li>
        <li><strong>Notas de Cata:</strong> Mantén un diario de los cafés que pruebas, anotando el origen, procesamiento, y tus impresiones de sabor.</li>
        <li><strong>Visita Tostadores Locales:</strong> Muchos tostadores de especialidad ofrecen catas y pueden proporcionar información sobre los orígenes de sus cafés.</li>
      </ul>
      
      <p>Entender los orígenes del café no solo mejora tu apreciación de lo que hay en tu taza, sino que también te conecta con las diversas culturas, tradiciones y paisajes que hacen posible esta bebida amada globalmente. Cada sorbo cuenta una historia del lugar de donde proviene, y aprender a "leer" estas historias es una de las alegrías de ser un entusiasta del café.</p>
    `,
    date: "10 Mayo, 2023",
    readTime: "6 min de lectura",
    category: "Conocimiento del Café",
    author: {
      name: "María González",
      role: "Especialista en Café",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    image: "/images/coffee-origins.png",
    slug: "entendiendo-los-origenes-del-cafe",
  },
  {
    id: 3,
    title: "Preparando el Espresso Perfecto",
    excerpt:
      "Consejos y trucos de nuestros baristas para extraer el shot perfecto de espresso. Aprende sobre el tamaño de molienda, la presión de tamping, el tiempo de extracción y más.",
    content: `
      <p>El espresso es la base de muchas bebidas de café populares y dominar su preparación es una habilidad esencial para cualquier entusiasta del café. A diferencia de otros métodos de preparación, el espresso utiliza presión para extraer rápidamente los sabores concentrados del café finamente molido.</p>
      
      <h2>Los Fundamentos del Espresso</h2>
      
      <p>Un espresso bien preparado debería tener tres componentes distintos:</p>
      
      <ul>
        <li><strong>Crema:</strong> La capa superior dorada y espumosa que contiene aceites aromáticos.</li>
        <li><strong>Cuerpo:</strong> La parte media que proporciona riqueza y textura.</li>
        <li><strong>Corazón:</strong> La base más oscura que añade profundidad y complejidad.</li>
      </ul>
      
      <p>El objetivo es lograr un equilibrio entre acidez, dulzor y amargor, creando un shot que sea complejo pero armonioso.</p>
      
      <h2>El Equipo Necesario</h2>
      
      <p>Para preparar espresso, necesitarás:</p>
      
      <ul>
        <li><strong>Máquina de Espresso:</strong> Desde modelos manuales hasta automáticos, la máquina debe ser capaz de producir 9 bares de presión.</li>
        <li><strong>Molinillo de Calidad:</strong> Un molinillo de muelas que pueda producir una molienda fina y consistente es esencial.</li>
        <li><strong>Tamper:</strong> Para comprimir uniformemente el café molido en el portafiltro.</li>
        <li><strong>Báscula:</strong> Para medir con precisión la cantidad de café.</li>
        <li><strong>Temporizador:</strong> Para controlar el tiempo de extracción.</li>
        <li><strong>Café Fresco:</strong> Idealmente tostado dentro de las últimas 2-3 semanas.</li>
      </ul>
      
      <h2>La Receta del Espresso Perfecto</h2>
      
      <p>Aunque las preferencias personales varían, una receta estándar para un espresso doble es:</p>
      
      <ul>
        <li><strong>Dosis:</strong> 18-20g de café molido</li>
        <li><strong>Rendimiento:</strong> 36-40g de espresso (proporción 1:2)</li>
        <li><strong>Tiempo de Extracción:</strong> 25-30 segundos</li>
        <li><strong>Temperatura:</strong> 90-96°C (195-205°F)</li>
        <li><strong>Presión:</strong> 9 bares</li>
      </ul>
      
      <h2>Paso a Paso: Preparando el Espresso Perfecto</h2>
      
      <ol>
        <li><strong>Precalentar:</strong> Asegúrate de que tu máquina, portafiltro y taza estén calientes.</li>
        <li><strong>Moler y Dosificar:</strong> Muele tu café a una consistencia fina (similar al azúcar en polvo) y mide 18-20g para un espresso doble.</li>
        <li><strong>Distribuir:</strong> Asegúrate de que el café molido esté uniformemente distribuido en el portafiltro para evitar canalizaciones durante la extracción.</li>
        <li><strong>Tamping:</strong> Aplica presión firme y uniforme (aproximadamente 30 libras) para crear un "puck" de café nivelado.</li>
        <li><strong>Extraer:</strong> Coloca el portafiltro en la máquina e inicia la extracción, cronometrando el proceso.</li>
        <li><strong>Observar:</strong> El espresso debería comenzar a fluir después de 5-7 segundos, inicialmente con un color similar a la miel, volviéndose gradualmente más claro.</li>
        <li><strong>Detener:</strong> Detén la extracción cuando alcances el peso objetivo o si el espresso comienza a "rubiar" significativamente (volverse muy claro).</li>
      </ol>
      
      <h2>Solución de Problemas Comunes</h2>
      
      <p>Si tu espresso no sale como esperabas, aquí hay algunos ajustes que puedes hacer:</p>
      
      <h3>Extracción Demasiado Rápida (Sub-extracción)</h3>
      
      <p><strong>Síntomas:</strong> El espresso fluye demasiado rápido, tiene un color claro, sabor ácido o aguado, y poca crema.</p>
      
      <p><strong>Soluciones:</strong></p>
      <ul>
        <li>Usa una molienda más fina</li>
        <li>Aumenta la dosis de café</li>
        <li>Asegúrate de tamping uniforme y con suficiente presión</li>
      </ul>
      
      <h3>Extracción Demasiado Lenta (Sobre-extracción)</h3>
      
      <p><strong>Síntomas:</strong> El espresso gotea lentamente o apenas fluye, tiene un color muy oscuro, sabor amargo o quemado, y crema oscura y moteada.</p>
      
      <p><strong>Soluciones:</strong></p>
      <ul>
        <li>Usa una molienda más gruesa</li>
        <li>Reduce ligeramente la dosis de café</li>
        <li>Asegúrate de que no estás tamping con demasiada presión</li>
      </ul>
      
      <h2>Más Allá del Espresso Básico</h2>
      
      <p>Una vez que hayas dominado el espresso básico, puedes experimentar con:</p>
      
      <ul>
        <li><strong>Ristretto:</strong> Un shot más corto (1:1.5 o menos) que resalta la dulzura y el cuerpo.</li>
        <li><strong>Lungo:</strong> Un shot más largo (1:3 o más) que resalta la acidez y complejidad.</li>
        <li><strong>Diferentes Orígenes:</strong> Prueba cafés de diferentes regiones para experimentar cómo sus características únicas se expresan en el espresso.</li>
        <li><strong>Mezclas vs. Origen Único:</strong> Compara mezclas diseñadas específicamente para espresso con cafés de origen único.</li>
      </ul>
      
      <p>Preparar el espresso perfecto es un viaje, no un destino. Incluso los baristas profesionales continúan refinando su técnica y experimentando con diferentes variables. Con práctica, paciencia y atención al detalle, puedes dominar el arte de preparar un espresso excepcional que rivalice con el de cualquier cafetería de especialidad.</p>
    `,
    date: "5 Mayo, 2023",
    readTime: "7 min de lectura",
    category: "Guías de Preparación",
    author: {
      name: "Carlos Méndez",
      role: "Barista Certificado",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    },
    image: "/images/espresso.png",
    slug: "preparando-el-espresso-perfecto",
  },
  {
    id: 4,
    title: "La Ciencia del Tueste de Café",
    excerpt:
      "Sumérgete en las transformaciones químicas que ocurren durante el proceso de tueste y cómo afectan el sabor de tu café.",
    date: "28 Abril, 2023",
    readTime: "9 min de lectura",
    category: "Ciencia del Café",
    author: {
      name: "Laura Sánchez",
      role: "Maestra Tostadora",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    },
    image: "/images/coffee-roasting.png",
    slug: "la-ciencia-del-tueste-de-cafe",
  },
  {
    id: 5,
    title: "Prácticas Sostenibles de Cultivo de Café",
    excerpt:
      "Aprende sobre cómo las prácticas agrícolas sostenibles están dando forma al futuro de la producción de café y ayudando a proteger nuestro planeta.",
    date: "20 Abril, 2023",
    readTime: "5 min de lectura",
    category: "Sostenibilidad",
    author: {
      name: "Miguel Torres",
      role: "Especialista en Sostenibilidad",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    image: "/images/espresso.png",
    slug: "practicas-sostenibles-de-cultivo-de-cafe",
  },
  {
    id: 6,
    title: "Guía de Cata de Café para Principiantes",
    excerpt:
      "Desarrolla tu paladar y aprende a identificar diferentes notas de sabor en tu café con nuestra guía completa de cata.",
    date: "15 Abril, 2023",
    readTime: "6 min de lectura",
    category: "Conocimiento del Café",
    author: {
      name: "Ana Martínez",
      role: "Q Grader Certificada",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    },
    image: "/images/espresso.png",
    slug: "guia-de-cata-de-cafe-para-principiantes",
  },
  {
    id: 7,
    title: "Cold Brew vs. Café Helado: ¿Cuál es la Diferencia?",
    excerpt:
      "Comprende las diferencias clave entre estas populares bebidas de café frío y aprende a prepararlas en casa.",
    date: "10 Abril, 2023",
    readTime: "4 min de lectura",
    category: "Guías de Preparación",
    author: {
      name: "Pablo Ruiz",
      role: "Barista",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop",
    },
    image: "/images/espresso.png",
    slug: "cold-brew-vs-cafe-helado",
  },
]

export const reviews: Review[] = [
  {
    id: 1,
    name: "María García",
    rating: 5,
    date: "15 Mayo, 2023",
    comment:
      "¡Me encanta este café! Las notas florales son increíbles y hace una taza perfecta por la mañana. Definitivamente compraré de nuevo.",
  },
  {
    id: 2,
    name: "Juan Pérez",
    rating: 5,
    date: "12 Mayo, 2023",
    comment: "Uno de los mejores cafés etíopes que he probado. Muy brillante y limpio con un aroma maravilloso.",
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    rating: 4,
    date: "8 Mayo, 2023",
    comment: "Gran café con sabores complejos. Funciona maravillosamente en mi configuración pour over.",
  },
  {
    id: 4,
    name: "Carlos Martínez",
    rating: 5,
    date: "5 Mayo, 2023",
    comment:
      "Excelente café, fresco y lleno de sabor. El envío fue rápido y el empaque mantiene el café perfectamente fresco.",
  },
  {
    id: 5,
    name: "Laura Sánchez",
    rating: 4,
    date: "1 Mayo, 2023",
    comment: "Muy buen equilibrio de sabores. Lo preparo en mi AeroPress y los resultados son consistentemente buenos.",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const currentProduct = getProductBySlug(slug)
  if (!currentProduct) return []

  return products
    .filter((product) => product.slug !== slug && product.category === currentProduct.category)
    .slice(0, limit)
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(slug)
  if (!currentPost) return []

  return blogPosts.filter((post) => post.slug !== slug && post.category === currentPost.category).slice(0, limit)
}

export function getProductsByCategory(category?: string): Product[] {
  if (!category || category === "all") return products
  return products.filter((product) => product.category === category)
}

export function getProductsBySearch(query: string): Product[] {
  const searchTerm = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.origin.toLowerCase().includes(searchTerm) ||
      product.roast.toLowerCase().includes(searchTerm),
  )
}

export function getBlogPostsByCategory(category?: string): BlogPost[] {
  if (!category || category === "Todos") return blogPosts
  return blogPosts.filter((post) => post.category === category)
}

export function getBlogPostsBySearch(query: string): BlogPost[] {
  const searchTerm = query.toLowerCase()
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm),
  )
}
