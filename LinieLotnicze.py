def WybierzTeKtoreZawieraja(lista, lotnisko):
    ret = []
    for it in lista:
        if it[0] == lotnisko or it[1] == lotnisko:
            ret.append(it)
    return ret


class Stan:
    def __init__(self, poczatek = None, koniec = None, poprzednik = None):
        self.poczatek = poczatek
        self.koniec = koniec
        self.poprzednik = poprzednik

    def __eq__(self, other):
        return (self.poczatek == other.poczatek and self.koniec == other.koniec) \
               or (self.koniec == other.poczatek and self.poczatek == other.koniec)


HistoriaStanow = []
StanyDoEkspansji = []


def uaktualnij_stany(LS):
    for s in LS:
        StanyDoEkspansji.append(s)
        HistoriaStanow.append(s)


def jest_nowa(S):
    for h in HistoriaStanow:
        if S == h:
            return False
    return True


def filtruj_stany(LS):
    StanyOk = []
    for s in LS:
        if jest_nowa(s):
            StanyOk.append(s)
    return StanyOk


def czy_rozwiazanie(S, poczatek, koniec):
    if S and S.poczatek == poczatek and S.koniec == koniec:
        return True
    if S.koniec == koniec:
        while S:
            S = S.poprzednik
            if S and S.poczatek == poczatek:
                return True
            elif S and S.koniec == poczatek:
                return True
    if S and S.koniec == poczatek:
        while S:
            S = S.poprzednik
            if S and S.poczatek == koniec:
                return True
            elif S and S.koniec == koniec:
                return True
    return False


def ekspanduj_stan(S, lista_polaczen):
    NoweStany = []
    for it in WybierzTeKtoreZawieraja(lista_polaczen, S.koniec):
        if S.koniec == it[0]:
            NoweStany.append(Stan(it[0], it[1], S))
        else:
            NoweStany.append(Stan(it[1], it[0], S))
    return NoweStany


def wybierz_stan_do_ekspansji():
    if len(StanyDoEkspansji) == 0:
        return None
    S = StanyDoEkspansji[0]
    StanyDoEkspansji.remove(S)
    return S


def main(pocztek, koniec, lista_polaczen):
    poczatek_stanow = WybierzTeKtoreZawieraja(lista_polaczen, pocztek)
    for it in poczatek_stanow:
        if pocztek == it[0]:
            S = Stan(it[0], it[1])
        else:
            S = Stan(it[1], it[0])
        StanyDoEkspansji.append(S)
        HistoriaStanow.append(S)

    while True:
        S = wybierz_stan_do_ekspansji()
        if S is None:
            print("Brak rozwiazanie")
            break
        if czy_rozwiazanie(S, pocztek, koniec):
            ret = []
            while True:
                if S and S.koniec:
                    ret.append((S.poczatek, S.koniec))
                    S = S.poprzednik
                else:
                    return ret
            break
        LS = ekspanduj_stan(S, lista_polaczen)
        LS = filtruj_stany(LS)
        uaktualnij_stany(LS)


lista_lotnisk = ['ATH', 'BSL', 'BFS', 'BLQ', 'BTS', 'BRS', 'CRL', 'BUD', 'DUB', 'EDI', 'EIN', 'GLA', 'HAM', 'CTA', 'KEF', 'CGN', 'SUF', 'LCA', 'LPL', 'LIS', 'LTN', 'STN', "MAD"]
lista_polaczen = [['ATH', 'EDI'], ['ATH','GLA'], ['ATH','CTA'], ['BFS','CGN'], ['BFS','LTN'], ['BFS','CTA'],
                  ['BTS', 'STN'], ['BTS', 'BLQ'], ['CRL','BLQ'], ['CRL','BSL'], ['CRL','LTN'], ['DUB','LCA'],
                  ['LTN', 'DUB'], ['LTN',  'MAD'], ['LCA','HAM'], ['EIN','BUD'], ['EIN','MAD'], ['HAM','BRS'],
                  ['KEF', 'LPL'], ['KEF', 'CGN'], ['SUF','LIS'], ['SUF','BUD'], ['SUF','STN'], ['STN','EIN'],
                  ['STN', 'HAM'], ['STN', 'DUB'], ['STN','KEF']]

print("Skąd chcesz odjechać?")
odjazd = input().upper()
print("Dokąd jedziesz?")
stacja_docelowa = input().upper()

if(odjazd not in lista_lotnisk or stacja_docelowa not in lista_lotnisk):
    print(" Nie ma takiego lotniska\n Spróbuj ponownie:")
    lista = main(odjazd, stacja_docelowa, lista_polaczen)

lista = main(odjazd, stacja_docelowa, lista_polaczen)
lista.reverse()
for it in lista:
    print(it[0], it[1])
