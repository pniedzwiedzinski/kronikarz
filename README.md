# kronikarz

### !!! To repozytorium to prototyp mojej idei prowadzenia kroniki elektronicznej, jestem w trakcie jego wprowadzania dlatego nie jestem jeszcze w stanie powiedzieć czy jest on skuteczny.

Podczas tworzenia kroniki drużyny napotkałem kilka dylematów: gdzie ją przechowywać, jak ją przechowywać i wreszcie: czy za 10 lat podjąłbym taką samą decyzję?

Te przemyślenia doprowadziły mnie do takiej konkluzji:

1. Kronika elektroniczna powinna być niezależna od środowiska. - Powinna móc być otworzona na komputerze jak i na telefonie, na macu, linuxie i windowsie.
2. Powinna być łatwa do skopiowania / przeniesienia - Kronika powinna być łatwo udostępnialna. Kronika powinna również mieć robione kopie zapasowe. Szkoda by było gdyby tyle lat kronikarskiej pracy przepadło bez śladu.
3. Można zsynchronizować z Facebookiem - Po co pisać dwa razy w dwóch miejscach? Nie lepiej jeśli wybrane wpisy automatycznie dodawały się na fanpage?

Te wymagania skłoniły mnie aby stworzyć system elektronicznej kroniki opartej na systemie plików - coś co każde urządzenie ma. Ponadto jako programista oparłem moją kronikę na systemie kontroli wersji git, który połączony z GitHubem zapewnia mi kopie zapasową a także system dystrybucji surowych danych. Jeśli chodzi o facebooka to jedynym rozwiązaniem jakie znalazłem jest stworzenie RSS feed'a z listą postów - facebook ma opcję publikowania właśnie przez RSS.

Surowych? Tak, ponieważ założeniem było oddzielenie wyglądu od treści, dlatego żadne `pdfy` nie wchodziły w grę. Mógłbym zapisywać treści wpisów w plikach `.txt` ale stwierdziłem że potrzebuję jakiegoś sposobu formatowania tekstu. Wybór padł na Markdown, którego składnia jest względnie prosta do nauczenia nawet dla osoby mało technicznej.

No to co z wyglądem? I dlatego właśnie jesteśmy w tym repozytorium, którego właśnie celem jest umożliwienie dostępu do plików przez proste API. Dzięki temu będziesz mógł wyświetlić swoją kronikę w sposób jaki TY chcesz.
