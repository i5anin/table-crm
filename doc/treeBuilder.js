import fs from "fs";
import path from "path";
import {
    IGNORED_FOLDERS,
    IGNORED_EXTENSIONS,
    FILE_ICONS,
    FOLDER_DESCRIPTIONS,
    FILE_DESCRIPTIONS
} from "./config.js";

// 📌 Функция получения эмодзи по расширению файла
function getFileEmoji(fileName) {
    return FILE_ICONS[path.extname(fileName).toLowerCase()] || "📃";
}

// 📌 Функция подсчета строк в файле
function countFileLines(filePath) {
    try {
        return fs.readFileSync(filePath, "utf-8").split("\n").length;
    } catch {
        return 0;
    }
}

// 📌 Функция получения описания папки или файла
function getDescription(name, filePath, isDir = false) {
    if (isDir) {
        return FOLDER_DESCRIPTIONS[name] ? `⭐ ${FOLDER_DESCRIPTIONS[name]}` : "";
    }

    if (name === "index.js") {
        const parentFolder = path.basename(path.dirname(filePath));
        return `Точка входа модуля "${parentFolder}"`;
    }

    return FILE_DESCRIPTIONS[name] || "";
}

// 📌 Функция рекурсивного обхода директорий
export function scanDirectory(dir, baseDir, depth = 1, stats, prefix = "") {
  if (!fs.existsSync(dir)) return "";

  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => {
      if (IGNORED_FOLDERS.has(entry.name)) return false;
      if (!entry.isDirectory() && IGNORED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  if (entries.length === 0) return "";

  const lines = [];

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const childPrefix = prefix + (isLast ? "    " : "│   ");
    const filePath = path.join(dir, entry.name);
    const fileName = entry.name;

    if (entry.isDirectory()) {
      const description = getDescription(fileName, filePath, true);
      const title = `${prefix}${connector}📂 ${fileName}${description ? ` — ${description}` : ""}`;
      const subtree = scanDirectory(filePath, baseDir, depth + 1, stats, childPrefix);
      lines.push(title);
      if (subtree) {
        lines.push(subtree);

        // 📌 Добавляем отступ, если текущая папка — не последняя
        // и после неё идут другие узлы
        if (depth > 1 && !isLast) {
          lines.push(`${childPrefix}`);
        }
      }
    } else {
      const ext = path.extname(fileName).toLowerCase();
      stats.fileCount[ext] = (stats.fileCount[ext] || 0) + 1;
      const linesCount = countFileLines(filePath);
      stats.fileLines[ext] = (stats.fileLines[ext] || 0) + linesCount;
      stats.totalLines += linesCount;
      stats.fileLineCounts.push({ file: fileName, lines: linesCount });

      const description = getDescription(fileName, filePath);
      const line = `${prefix}${connector}${getFileEmoji(fileName)} ${fileName} (${linesCount} строк)` + (description ? ` — ${description}` : "");
      lines.push(line);

      // 📌 Если за файлом идёт директория — добавляем пустую строку-отступ
      const nextEntry = entries[index + 1];
      if (nextEntry?.isDirectory()) {
        lines.push(`${prefix}│   `);
      }
    }
  });

  return lines.join("\n");
}


