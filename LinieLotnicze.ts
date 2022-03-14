function WybierzTeKtoreZawieraja(lista, lotnisko){
    const ret = []
    for (let it in lista){
        if (it[0] == lotnisko || it[1] == lotnisko){
            ret.push(it)
        }
        return ret
    }
}

class Stan{
    poczatek : string;
    koniec : string;
    poprzednik : Stan;
    constructor ( poczatek = null, koniec = null, poprzednik = null) {
        this.poczatek = poczatek;
        this.koniec = koniec;
        this.poprzednik = poprzednik;
    }


}
var HistoriaStanow = [];
var StanyDoEkspansji = [];


function uaktualnij_stany(LS) {
    for (let s in LS){
        StanyDoEkspansji.push(s)
        HistoriaStanow.push(s)
    }
}

function jest_nowa(S) {
    for(const h of HistoriaStanow){
        if ((S.poczatek == h.poczatek && S.koniec == h.koniec) ||
            (S.koniec == h.poczatek && S.poczatek == h.koniec)){
            return false;
        }return true;
    }
}

function filtruj_stany(LS){
    var StanyOk = []
    for (let s in LS){
        if (jest_nowa(s)){
            StanyOk.push(s)
        } return StanyOk
    }
}



function czy_rozwiazanie(S, poczatek, koniec){
    if (S && S.poczatek == poczatek && S.koniec == koniec) {
        return true;
    }
    if (S.koniec == koniec){
        while (S){
            S = S.poprzednik
            if (S && S.poczatek == poczatek){
                return true;
            }
            else if (S && S.koniec == poczatek){
                return true;
            }
        }
    }
    if (S && S.koniec == poczatek){
        while (S){
            S = S.poprzednik
            if (S && S.poczatek == koniec){
                return true;
            }
            else if (S && S.koniec == koniec){
                return true;
            }
        }
        return false;
    }
}

function ekspanduj_stan(S, lista_polaczen) {
    var NoweStany = []
    for (let it in WybierzTeKtoreZawieraja(lista_polaczen, S.koniec)){
        if (S.koniec == it[0]) {
            NoweStany.push(new Stan(it[0], it[1], S));
        } else {
            NoweStany.push(new Stan(it[1], it[0], S));
        }
    }
    return NoweStany;
}

function wybierz_stan_do_ekspansji(){
    if ((StanyDoEkspansji.length) == 0){
        return null;
    }
    const S = StanyDoEkspansji[0];
    // @ts-ignore
    StanyDoEkspansji.pop(S);
    return S;
}



function main(pocztek, koniec, lista_polaczen){
    var poczatek_stanow = WybierzTeKtoreZawieraja(lista_polaczen, pocztek);
    for (let it in poczatek_stanow){
        if (pocztek == it[0]){
            S = new Stan(it[0], it[1]);
        }
        else{
            S = new Stan(it[1], it[0]);
            StanyDoEkspansji.push(S);
            HistoriaStanow.push(S);
        }
    }
    while (true){
        var S = wybierz_stan_do_ekspansji();
        if (S = null){
            console.log("Brak rozwiazania");
            break;
        }
        if (czy_rozwiazanie(S, pocztek, koniec)){
            var ret = []
            while (true){
                if (S && S.koniec){
                    ret.push((S.poczatek, S.koniec));
                    S = S.poprzednik;
                }else{
                    return ret;
                }

            }
            break;
        }

        var LS = ekspanduj_stan(S, lista_polaczen);
        LS = filtruj_stany(LS);
        uaktualnij_stany(LS);
    }
}

var lista_lotnisk = ['ATH', 'BSL', 'BFS', 'BLQ', 'BTS', 'BRS', 'CRL', 'BUD', 'DUB', 'EDI', 'EIN', 'GLA', 'HAM', 'CTA', 'KEF', 'CGN', 'SUF', 'LCA', 'LPL', 'LIS', 'LTN', 'STN', "MAD"]
var lista_polaczen = [['ATH', 'EDI'], ['ATH','GLA'], ['ATH','CTA'], ['BFS','CGN'], ['BFS','LTN'], ['BFS','CTA'],
    ['BTS', 'STN'], ['BTS', 'BLQ'], ['CRL','BLQ'], ['CRL','BSL'], ['CRL','LTN'], ['DUB','LCA'],
    ['LTN', 'DUB'], ['LTN',  'MAD'], ['LCA','HAM'], ['EIN','BUD'], ['EIN','MAD'], ['HAM','BRS'],
    ['KEF', 'LPL'], ['KEF', 'CGN'], ['SUF','LIS'], ['SUF','BUD'], ['SUF','STN'], ['STN','EIN'],
    ['STN', 'HAM'], ['STN', 'DUB'], ['STN','KEF']]

var lista;

lista = main('AEI', 'BRS', lista_polaczen)
lista.reverse()
for (let it in lista){
    console.log(it[0], it[1]);
}

