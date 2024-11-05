import StyleDictionary from 'style-dictionary';
import fs from 'fs';
import path from 'path';

// Get all theme files from the 'tokens' directory
const themes = fs.readdirSync(path.resolve('tokens'))
    .filter(file => file.startsWith('Theme'));

const config = {
    source: ['tokens/**/*.json'],
    platforms: {}
};

// Loop through each theme and create a platform for it
themes.forEach(theme => {
    const themeName = path.basename(theme, '.json'); // Extract theme name from file name

    config.platforms[themeName] = {
        transformGroup: 'less',
        buildPath: `build/less/`,
        files: [
            {
                destination: `${themeName}.less`,
                format: 'less/variables',
                options: {
                    outputReferences: true
                }
            }
        ]
    };
});

export default config;