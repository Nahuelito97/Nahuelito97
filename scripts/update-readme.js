const fs = require('fs');
const axios = require('axios');

// URLs de las APIs para obtener estadísticas
const statsUrl = 'https://github-readme-stats.vercel.app/api?username=nahuelito97&show_icons=true&theme=radical';
const langsUrl = 'https://github-readme-stats.vercel.app/api/top-langs/?username=nahuelito97&layout=compact&theme=radical';

async function updateReadme() {
    try {
        console.log('🔄 Obteniendo estadísticas...');
        // Obtener las estadísticas y lenguajes
        const [statsResponse, langsResponse] = await Promise.all([
            axios.get(statsUrl),
            axios.get(langsUrl),
        ]);

        console.log('📂 Leyendo el archivo README...');
        // Leer el contenido actual del README
        let readme = fs.readFileSync('README.md', 'utf8');

        // Reemplazar los placeholders con los nuevos datos
        console.log('✏️ Actualizando datos en el README...');
        readme = readme.replace(
            /!\[Estadísticas de GitHub\]\(.*\)/,
            `![Estadísticas de GitHub](${statsResponse.config.url})`
        );
        readme = readme.replace(
            /!\[Lenguajes más usados\]\(.*\)/,
            `![Lenguajes más usados](${langsResponse.config.url})`
        );

        // Escribir el nuevo contenido en el README
        fs.writeFileSync('README.md', readme);
        console.log('✅ README actualizado correctamente.');
    } catch (error) {
        console.error('❌ Error actualizando el README:', error);
    }
}

updateReadme();
