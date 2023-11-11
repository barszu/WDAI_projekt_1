# WDAI_projekt_1

PRODUKTY:
https://barszu.github.io/WDAI_projekt_1/zad%201/index.html

ZOMBIE GAME:
https://barszu.github.io/WDAI_projekt_1/zad%202%20zombie/index.html

Zadanie 1 (I)
wyświetl dane z https://dummyjson.com/products (format json) w postaci listy, lista ma
zawierać nazwę, opis i ikonę pierwszych 30 elementów z danych. (może się przydać
https://dummyjson.com/products/1, fetch, request)

Zadanie 2 (I)
Dodaj przycisk pozwalający na przefiltrowanie danych, oraz drugi sortujący listę po nazwie
asc/dsc/brak sortowania

Zadanie 3 (II)
Twoim zadaniem jest implementacja gry widocznej screenshocie poniżej.

#screenshot

Jak to ma działać:

- celujemy i strzelamy myszką (lewy click)
- zombie pojawiają się na prawej stronie planszy (dowolna wysokość i miejsce,
  losowo) i poruszają się w lewo (losowa prędkość), mają losowy rozmiar (skale)
- zastrzelony zombi daje 10 punktów
- każde pudło to -3 punkty
- startowo masz 3 życia
- ilość pozostałych szans wyświetla się cały czas na planszy
- wynik wyświetla się cały czas na planszy
- startujesz z 30 punktami jeżeli wynik spadnie poniżej zera nie można już strzelać
- gra kończy się gdy stracisz wszystkie szanse
- Gdy gra się skończy, pojawia się odpowiedni komunikat z wynikiem i opcją na
  ponowną grę
