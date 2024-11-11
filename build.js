import StyleDictionary from 'style-dictionary';
import fs from 'fs';
import path from 'path';

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

// Get all theme files from the 'tokens' directory
const themes = fs.readdirSync(path.resolve('tokens'))
    .filter(file => file.startsWith('Theme'));

function getStyleDictionaryConfig(brand, platform) {
    const displayName = brand.replace(".json", "").replace("Theme.", "");
    return {
        source: [
            'tokens/_*.json',
            'tokens/Spacing*.json',
            'tokens/Typescale*.json',
            `tokens/${brand}`
        ],
        platforms: {
            web: {
                transformGroup: 'less',
                buildPath: `build/less/`,
                files: [
                    {
                        destination: `${displayName}.less`,
                        format: 'less/variables',
                        options: {
                            outputReferences: true
                        }
                    },
                ],
            },
        },
    };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT BRANDS AND PLATFORMS

themes.map(function (brand) {
    ['web'].map(function (platform) {
        console.log('\n==============================================');
        console.log(`\nProcessing: [${platform}] [${brand}]`);

        console.log(getStyleDictionaryConfig(brand, platform));

        const sd = new StyleDictionary(getStyleDictionaryConfig(brand, platform));
        sd.buildPlatform(platform);
    });
});
