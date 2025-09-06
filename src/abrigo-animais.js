import { animais, brinquedosValidos } from "./animaisData";

class AbrigoAnimais {
  constructor() {
    this.animais = animais;
    this.brinquedosValidos = brinquedosValidos;
  }

  validarAnimais(animaisOrdem) {
    const animaisUnicos = new Set();
    for (const nomeAnimal of animaisOrdem) {
      if (animaisUnicos.has(nomeAnimal)) {
        return { erro: "Animal inválido" };
      }
      animaisUnicos.add(nomeAnimal);
      if (!this.animais[nomeAnimal]) {
        return { erro: "Animal inválido" };
      }
    }
  }

  validarBrinquedos(listaBrinquedos) {
    const brinquedosUnicos = new Set();
    for (const brinquedo of listaBrinquedos) {
      if (!this.brinquedosValidos.includes(brinquedo)) {
        return { erro: "Brinquedo inválido" };
      }
      if (brinquedosUnicos.has(brinquedo)) {
        return { erro: "Brinquedo inválido" };
      }
      brinquedosUnicos.add(brinquedo);
    }
  }

  podeAdotar(brinquedosPessoa, animal) {
    if (animal.tipo === "jabuti") {
      for (const brinquedoFavorito of animal.brinquedos) {
        if (!brinquedosPessoa.includes(brinquedoFavorito)) {
          return false;
        }
      }
      return true;
    } else {
      let indiceAtual = 0;
      for (const brinquedoFavorito of animal.brinquedos) {
        const indiceEncontrado = brinquedosPessoa.indexOf(
          brinquedoFavorito,
          indiceAtual
        );
        if (indiceEncontrado === -1) {
          return false;
        }
        indiceAtual = indiceEncontrado + 1;
      }
      return true;
    }
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = brinquedosPessoa1
      ? brinquedosPessoa1.split(",").map((i) => i.trim())
      : [];
    const brinquedos2 = brinquedosPessoa2
      ? brinquedosPessoa2.split(",").map((i) => i.trim())
      : [];
    const animaisOrdem = ordemAnimais
      ? ordemAnimais.split(",").map((i) => i.trim())
      : [];

    const resultado = [];

    let adocoesPessoa1 = 0;
    let adocoesPessoa2 = 0;

    let brinquedosDisponiveis1 = [...brinquedos1];
    let brinquedosDisponiveis2 = [...brinquedos2];

    const validacaoAnimais = this.validarAnimais(animaisOrdem);
    if (validacaoAnimais && validacaoAnimais.erro) {
      return validacaoAnimais;
    }

    const validacaoBrinquedos1 = this.validarBrinquedos(brinquedos1);
    if (validacaoBrinquedos1 && validacaoBrinquedos1.erro) {
      return validacaoBrinquedos1;
    }

    const validacaoBrinquedos2 = this.validarBrinquedos(brinquedos2);
    if (validacaoBrinquedos2 && validacaoBrinquedos2.erro) {
      return validacaoBrinquedos2;
    }

    for (const nomeAnimal of animaisOrdem) {
      const animal = this.animais[nomeAnimal];

      let podePessoa1 =
        adocoesPessoa1 < 3
          ? this.podeAdotar(brinquedosDisponiveis1, animal)
          : false;
      let podePessoa2 =
        adocoesPessoa2 < 3
          ? this.podeAdotar(brinquedosDisponiveis2, animal)
          : false;

      if (animal.tipo === "jabuti") {
        if (podePessoa1 && adocoesPessoa1 === 0) {
          podePessoa1 = false;
        }
        if (podePessoa2 && adocoesPessoa2 === 0) {
          podePessoa2 = false;
        }
      }

      if (podePessoa1 && podePessoa2) {
        resultado.push(`${nomeAnimal} - abrigo`);
      } else if (podePessoa1) {
        resultado.push(`${nomeAnimal} - pessoa 1`);
        adocoesPessoa1++;
        if (animal.tipo === "gato") {
          brinquedosDisponiveis1 = brinquedosDisponiveis1.filter(
            (brinquedo) => !animal.brinquedos.includes(brinquedo)
          );
        }
      } else if (podePessoa2) {
        resultado.push(`${nomeAnimal} - pessoa 2`);
        adocoesPessoa2++;
        if (animal.tipo === "gato") {
          brinquedosDisponiveis2 = brinquedosDisponiveis2.filter(
            (brinquedo) => !animal.brinquedos.includes(brinquedo)
          );
        }
      } else {
        resultado.push(`${nomeAnimal} - abrigo`);
      }
    }

    resultado.sort();
    return { lista: resultado };
  }
}
export { AbrigoAnimais as AbrigoAnimais };
