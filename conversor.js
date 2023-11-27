// Pacotes
const fs = require("fs");
const path = require("path");
const pdf2img = require("pdf-img-convert");

// Variáveis
const paths = [];

// Lista todos os arquivos presentes no

function Ler_Arquivos(Diretorio) {
  fs.readdir(Diretorio, (err, files) => {
    if (err) {
      console.error("Erro ao ler o diretório:", err);
      return;
    }

    // Mostra os arquivos no console
    console.log("Arquivos no diretório:");

    files.forEach((file) => {
      console.log(file);
      paths.push(path.resolve(file));
    });
  });
}

Ler_Arquivos('./pdf_test');