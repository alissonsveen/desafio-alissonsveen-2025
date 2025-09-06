import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar animal duplicado", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Rex,Rex"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve rejeitar brinquedo inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,COMPUTADOR",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar briquedo repetido na lista", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,CAIXA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Gatos nao dividem brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,RATO,LASER",
      "BOLA,RATO",
      "Fofo,Mimi"
    );
    expect(resultado.lista[0]).toBe("Fofo - pessoa 1");
    expect(resultado.lista[1]).toBe("Mimi - abrigo");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Uma pessoa nao pode adotar mais de 3 animais", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "LASER,RATO,BOLA,CAIXA,NOVELO,SKATE",
      "",
      "Bebe,Bola,Loco,Rex"
    );

    expect(resultado.lista[0]).toBe("Bebe - pessoa 1");
    expect(resultado.lista[1]).toBe("Bola - pessoa 1");
    expect(resultado.lista[2]).toBe("Loco - pessoa 1");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
  });

  test("Jabuti(Loco) não pode ser adotado sem um animal como companhia", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,SKATE",
      "BOLA,RATO,SKATE",
      "Loco"
    );

    expect(resultado.lista[0]).toBe("Loco - abrigo");
  });

  test("Jabuti(Loco) pode ser adotado com um animal como companhia", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,SKATE",
      "",
      "Rex, Loco"
    );

    expect(resultado.lista[0]).toBe("Loco - pessoa 1");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
  });
});
