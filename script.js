function CALCULAR() {
    let perca = 0;
    let Pt = 0;
    let Pc = 0;
    let T, S, F, P;
    let X = 0;
    let X1 = 0;
    let pp = 0;
    let mp = 0;

    // Pega os valores dos inputs
    let A = document.getElementById('A');
    T = parseFloat(A.value) * 60; // Converte horas para minutos
    S = parseFloat(document.getElementById('S').value); // Stamina total
    F = parseFloat(document.getElementById('F').value); // Valor do atributo
    P = parseFloat(document.getElementById('numIntervalos').value); // Número de intervalos

    // Obtém as horas selecionadas na tabela
    let checkboxes = document.querySelectorAll('#tabelaDescanso input[type="checkbox"]:checked');
    let horasSelecionadas = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));

    // Calcula o tempo total de descanso baseado nas horas selecionadas
    let horasConsecutivas = calcularHorasConsecutivas(horasSelecionadas);

    // Converte o tempo de pausa para um valor baseado nas regras de 1h, 4h ou 8h
    let Tp;
    if (horasConsecutivas < 4) {
        Tp = 1; // Considera como 1h
    } else if (horasConsecutivas >= 4 && horasConsecutivas < 8) {
        Tp = 4; // Considera como 4h
    } else if (horasConsecutivas >= 8) {
        Tp = 8; // Considera como 8h
    }

    // Calcula os multiplicadores de stamina
    X = 0.3 * S;
    X1 = 0.7 * S;

    function whi(n) {
        while (T >= 1 && S >= n + 1) {
            T -= n;
            S -= n;
            Pt += 1;
        }
    }

    function cançaco() {
        while (T >= 4 && P > 0) {
            T -= 4;
            P -= 1;
            Pc += 1;
        }
    }

    function meiocancao() {
        while (T >= 3) {
            mp += 1;
            T -= 3;
            Pc += mp / 3;
        }
    }

    function treinar(n, div) {
        if (P >= 1 && (Tp === 4 || Tp === 8)) {
            while (P > 0 && S >= n + 1 && T >= 1) {
                P -= 1;
                if (Tp === 4) {
                    whi(n);
                    cançaco();
                    meiocancao();
                    S += X;
                } else if (Tp === 8) {
                    whi(n);
                    cançaco();
                    meiocancao();
                    S += X1;
                }
            }
        } else {
            whi(n);
            cançaco();
            meiocancao();
        }
        pp = Pt;
        Pt = Pt / div;
    }

    // Determina os pontos de treino com base no valor do atributo
    if (F <= 50) {
        treinar(10, 5);
    } else if (F >= 51 && F <= 100) {
        treinar(15, 7);
    } else if (F >= 101 && F <= 150) {
        treinar(20, 9);
    } else if (F >= 151 && F <= 200) {
        treinar(25, 11);
    } else if (F >= 201 && F <= 250) {
        treinar(30, 13);
    } else if (F >= 251 && F <= 300) {
        treinar(35, 15);
    } else if (F >= 301 && F <= 350) {
        treinar(40, 17);
    } else if (F >= 351 && F <= 400) {
        treinar(45, 20);
    } else if (F >= 401 && F <= 450) {
        treinar(50, 25);
    } else if (F >= 501) {
        treinar(55, 50);
    }

    // Exibe os resultados na interface
    document.getElementById("result").style.display = "block";
    document.getElementById("tempo").textContent = (T / 60).toFixed(2) + " horas";
    document.getElementById("stamina").textContent = S.toFixed(2);
    document.getElementById("pontosTreino").textContent = pp + " pontos de treino: " + Pt.toFixed(2) + " pontos de atributo";
    document.getElementById("pontosCansaco").textContent = Pc.toFixed(2);
}

// Função para calcular horas consecutivas selecionadas
function calcularHorasConsecutivas(horasSelecionadas) {
    let maxConsecutivas = 0;
    let consecutivas = 1;

    for (let i = 1; i < horasSelecionadas.length; i++) {
        if (horasSelecionadas[i] === horasSelecionadas[i - 1] + 1) {
            consecutivas++;
        } else {
            consecutivas = 1;
        }
        maxConsecutivas = Math.max(maxConsecutivas, consecutivas);
    }

    return maxConsecutivas;
}
