const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(/SolidCare/g, 'SolidCare').replace(/solidcare/g, 'solidcare');
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log('Updated', filePath);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', '.git'].includes(file)) {
                walk(fullPath);
            }
        } else {
            if (['.js', '.pug', '.css', '.html', '.sql', '.yml', '.json', '.env', '.md'].some(ext => file.endsWith(ext))) {
                replaceInFile(fullPath);
            }
        }
    }
}

walk(__dirname);
console.log("Rebranding complete.");
