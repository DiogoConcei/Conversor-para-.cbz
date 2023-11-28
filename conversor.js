const fs = require("fs");
const path = require("path");
const pdf2img = require("pdf-img-convert");

function Ler_Arquivos(Diretorio, Converter_Arquivos) {
  try {
    const files = fs.readdirSync(Diretorio);
    console.log("Arquivos encontrados no diretório:");

    const paths_files = [];

    files.forEach((file) => {
      console.log(file);
      paths_files.push(path.resolve(Diretorio, file));
    });

    // Chama a função de callback  passando os caminhos dos arquivos
    Converter_Arquivos(null, paths_files);
  } catch (err) {
    // Em caso de erro, chama a função de callback  com o erro
    Converter_Arquivos(err, null);
  }
}

function Converter_Arquivos(err, paths_files) {
  const temp = "./temp";

  if (err) {
    console.error("Erro encontrado : ", err);
    return;
  }

    if (!fs.existsSync(temp)) {
      fs.mkdirSync(temp);
    }
  

    paths_files.forEach((pdfFilePath) => {
      pdf2img.convert(pdfFilePath).then((ImgSaida) => {
        ImgSaida.forEach((image, index) => {
          const imagePath = path.join(temp, `imagem_${index + 1}.png`);  
          fs.writeFileSync(imagePath, image);
        });
      }).catch((error) => {
        console.error("Erro durante a conversão : ", error);
      });
    });
  }
  

// Exemplo de uso
Ler_Arquivos("./pdf_test", Converter_Arquivos);
