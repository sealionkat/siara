require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

const process_outgoing_response = request => {

    var phrases = [{
        "name": "siara",
        "texts": [
            '<target> nie chce mi się z Tobą gadać'
        ],
        "type": "phrase"
    }, {
        "name": "spadam",
        "texts": [
            "Chyba już pójdę, nie? Co tu będę tak sam siedział…",
            "Nie będziemy tu siedzieć, bo dostaniemy wilka.",
            "Co ty myślisz, że po co oni tu są? Że oni bronią nas, przed tobą? Nie! Oni bronią ciebie, przede mną!",
            "Makao… i po makale.",
            "Ty, chodź no tu. Gdzie ty tam idziesz?"
        ],
        "type": "phrase"
    }, {
        "name": "zmiana",
        "texts": [
            "Dobrze, że dzwonisz <target>, bo zaszły pewne zmiany w kontrakcie...",
            "Panowie, to masakra jakaś jest.",
            "I cały misterny plan też w pizdu."
        ],
        "type": "phrase"
    }, {
        "name": "standup",
        "texts": [
            "A która to godzina? Standup! Co wy myślicie, że taki <target>, to nie ma co robić? On ma zamówień do dwutysięcznego ósmego roku! Jak Penderecki, jego trzeba nadpłacić, przepłacić, przebić...",
            "No co jest <target>? Standup! Posprzątać mie tu błyskiem!",
            "A kogoś ty mie tu nawpuszczał <target>? Won mie na ląd leszcze! Standup!",
            "A rzeczywiście.. toż to Mirosław, Radosław i <target>. Co wy mie tu maszkardę robicie? Na Standup!",
            "Memory, find... <target>. I wszystko jasne... Standup!",
            "Palić głupa to każden jeden głupi potrafi, a robić to ni ma komu. Standup!",
            "Co wykonałem? Jak wykonałem? Coś ty <target> tam narobił? Standup!",
            "Dlaczegoś <target> wyłączył komórkę?! Standup!"
        ],
        "type": "phrase"
    }, {
        "name": "chmurka",
        "texts": [
            "Widzisz <target> coś narobił? Urwałeś kurze złote jaja...",
            "A idź mie z tą wichurą! <target>",
            "Jakie „spierdalaj” <target>? Sam spierdalaj z tym bufetem, bo mi tapicerkę zapaćkasz!",
            "Widzisz co to żarcie robi ci z mózgu <target>? Poza tą bułką i frytkami świat dla ciebie nie istnieje. To tylko kawałeczek pierdolonego ziemniaka, a ty zachowujesz się tak, jakbym krzywdził twoją matkę.",
            "Czy ja dobrze widzę? Przecież to jest <target>. Sprawca mego upodlenia, obiekt mej zemsty.",
            "Zaraz cię <target> podregulujemy, bo chyba coś Ci się w głowie popierdoliło...",
            "Czy tobie czasem <target>, sufit na łeb się nie spadł?",
            "To ja ci <target> wyciągam kule jak doktor Quinn, a ty mi się tu rżniesz na ulicy z jakimś kolarzem?!",
            "Ja cię stresuję, kurwa?! Uczysz się tego piąty rok w szkole i na kursach, i wszystko to jak krew w piach!",
            "Co to się stało, że się zesrało? <target>",
            "Wiesz, co mówi ulica?! Że jak chcesz komuś dać po mordzie, to najlepiej <target>. Nie odda, bo się boi!",
            "W imieniu rodziny Siary Siarzewskiego, chciałbym z tego miejsca zapewnić, że doceniam przyjacielski gest mojego byłego wroga, gdyż od dziś wspólnym naszym wrogiem jest były mój przyjaciel, <target>."
        ],
        "type": "phrase"
    }, {
        "name": "tonieja",
        "texts": [
            "Ale co ty Stefan... ja przecież nic...",
            "To nie ja, mnie tam nie było."
        ],
        "type": "phrase"
    }, {
        "name": "dzieki",
        "texts": [
            "Mówiłeś „dziękuję”? To jest to słowo, które tam mamroczesz pod nosem?",
            "Już mi się nie chcę, dziękuję bardzo.",
            "No i bardzo dobrze, i sukces jest kompletny. Posprzątać mnie tu błyskiem!",
            "Dziękuję panu <target> za pomoc w ujęciu groźnego przestępcy.",
            "Serdecznie dziękuję!"
        ],
        "type": "phrase"
    }, {
        "name": "cr",
        "texts": [
            "<!channel> Code-review samo się nie zrobi!!!"
        ],
        "type": "phrase"
    }, {
        "name": "pomylka",
        "texts": [
            "Moja żona miała na drugie pomyłka...",
            "Ty się nazywasz Kiler i masz ksywę Kiler. I jesteś Kiler! A jak mi powiesz, że to jest pomyłka, to dostaniesz w ryj.",
            "Proszę Pana, to jest jakieś tragiczne nieporozumienie.",
            "To rewelacja! Widać, że znasz bardzo wpływowych ludzi. A może załatwisz jeszcze używaną oponę do stara, albo choinkę o zapachu kokosowym do malucha?",
            "I coś ty narobił <target>? Kogoś ty mi tu sprowadził? To jest szakal, za którego ja płacę taką fure piniendzy, to jest ten debeściak?",
            "To nie jest dwa tysiące pesos, tylko gówno warte dwa razy po tysiąc pesos, tak?"
        ],
        "type": "phrase"
    }, {
        "name": "kilim",
        "texts": [
            "Zabiję cię ty telewizyjny kurwiszonie... już nie żyjesz.",
            "Jako pragmatyk i realista, przedkładam interes ponad osobiste porachunki, dlatego nie zabiłem Cię, <target> chociaż powinienem.",
            "Co ty wiesz o zabijaniu?! Ty stara dupa jesteś!",
            "A ty się, bździągwo, ubierz, bez wstydu na golasa chodzisz.",
            "Czy ja dobrze widzę? Przecież to jest <target> sprawca mego upodlenia, obiekt mej zemsty.",
            "<target> Zlecił mnie zabić?! Ten półdebil?! Ta sklonowana owca?! To gówno w błyszczącym dresie?! On beze mnie nie istnieje!"
        ],
        "type": "phrase"
    }, {
        "name": "ufam",
        "texts": [
            "Nikomu nie ufam, tylko tobie <target>."
        ],
        "type": "phrase"
    }, {
        "name": "lunch",
        "texts": [
            "No tak, lunch bez gitary to jak Lipski bez Siary!",
            "Wiecie, że to żurek ze Sheratona? Tylko talerz taki byle jaki dla niepoznaki."
        ],
        "type": "phrase"
    }, {
        "name": "gdzie",
        "texts": [
            "Gdzieś była, lafiryndo?",
            "W kostnicy powiedzieli, że tu jeszcze leżysz.",
            "Dlaczegoś, <target>, wyłączył komórkę?!",
            "<target> No właśnie, i gdzie on jest?",
            "Memory, find... <target>. I wszystko jasne!",
            "Zniknął! Nie odbiera telefonu! Co mu zrobiłeś?",
            "Włącz swój faks <target> czas na ostatnią ratę..."
        ],
        "type": "phrase"
    }, {
        "name": "zarobiony",
        "texts": [
            "No to co ty <target> myślisz, że taki Szakal to nie ma co robić? On ma zamówień do dwutysięcznego ósmego roku, jak Penderecki, jego trzeba nadpłacić, przepłacić, przebić.."
        ],
        "type": "phrase"
    }, {
        "name": "doroboty",
        "texts": [
            "Od tej pory, <target> masz mieć w dupie paragrafy! Masz być jak bulterier! Jak wściekły byk! Jak Tommy Lee Jones w Ściganym!",
            "Przyszliście tu do pracy, a nie na papierocha, pogaduchy i strojenie głupich min! Czy to jest, kurwa, jasne żołnierz... Wróć! Czy to jest jasne?!",
            "Ty <target>, weź się za robotę, bo się nie polubimy!"
        ],
        "type": "phrase"
    }, {
        "name": "pytanie",
        "texts": [
            "Pytanie pierwsze. <target> Zawsze sikasz przez zapięty rozporek?"
        ],
        "type": "phrase"
    }, {
        "name": "idziemy",
        "texts": [
            "No chodź <target>, noga! Idziemy na spacerek..."
        ],
        "type": "phrase"
    }, {
        "name": "cycki",
        "texts": [
            "Cycki se usmaż <target>!"
        ],
        "type": "phrase"
    }, {
        "name": "dziendobry",
        "texts": [
            "Buenos Aires <target>!",
            "Przedstawię was <target>, to jest mój przyjaciel Kiler, a to jest moja żona lafirynda.",
            "Dzień dobry, mieszka tu jakis cwaniak?",
            "A rzeczywiście to Mirosław, <target> Radosław, Zbigniew. Co wy mie tu maszkardę robicie? Do budy!"
        ],
        "type": "phrase"
    }, {
        "name": "niewiem",
        "texts": [
            "¯\\_(ツ)_/¯"
        ],
        "type": "phrase"
    }, {
        "name": "n",
        "texts": [
            "¯\\_(ツ)_/¯"
        ],
        "type": "phrase"
    }, {
        "name": "brawo",
        "texts": [
            "Pan <target> po oddaniu jedenastu ostrzegawczych strzałów, odpowiedział ogniem. Mógł zabić, a trafił tylko w kolano.",
            "Kto jest debeściak? Pan <target> jest debeściak.. i jego mafia też!",
            "Jest bardzo jak Kiler, bardzo, tylko lepszy, bo z importu!",
            "Ma iloraz inteligencji 220 – to mało?",
            "<target> jak ty mnie zaimponowałeś w tej chwili!",
            "Ty wiesz kto to jest? Ty wiesz kto to jest?! To jest <target>! On se może jeść Chateau, może se jeść ostrygę, może se jeść co chce, a nie twoje rozpaćkane kanapki!",
            "Miarka się przebrała, <target> przejmuję złoto i władzę nad miastem. I kto jest debeściak?",
            "Wszyscy wiedzą, że czegoś nie da się zrobić. I wtedy pojawia się <target>, który nie wie, że się nie da, i on właśnie to coś robi.",
            "No wypieprzać mi szpagateria! Już wy koguty zasrane. Pan <target> chce sobie usiąść i posiedzieć, on teraz jest tutaj szefem, a ja będę pomagał.",
            "<target> to nie jest jakiś Albańczyk, żebyś coś dla niego zbierał. Przyniesiesz pieniądze w zębach i grzecznie przeprosisz, że musiał czekać.",
            "Szach! Mat! Tak to robi <target>!",
            "Wiktora bym Ci dał za to <target>!",
            "Ty jesteś genialny <target>.",
            "Tu już jesteś spalony <target>, to wybierzesz sobie jakiś kraj z dobrym klimatem i ja cię tam bezpiecznie dostarczę i urządzę. I do końca życia będziesz miał tak $",
            "Pan <target> przeczytał 1000 książek jak postępować z ludźmi, kiedy wy dłubaliście w nosie i zjadaliście swoje gile.",
            "Za parę dni, proszę pana <target>, to się dopiero zacznie: wywiady, autografy, wizyty w zakładach pracy…",
            "Musisz przyznać, że jak <target> zrobi dzióbek, to nie ma chuja we wsi!",
            "Trzeba jednak oddać sprawiedliwość że Pan <target> wszedł do akcji z marszu na czczo nawet rąk nie umył. Obronę sforsował pierwszorzędnie,a ładunek umieścił precyzyjnie."
        ],
        "type": "phrase"
    }, {
        "name": "piwo",
        "texts": [
            "Lubię wypić piwko, czasem dwa... ewentualnie siedem.",
            "Zostanę i ojebie jeszcze jedno. Żona i tak mnie zabiję jak wrócę.",
            "Litr piwa zawiera 250 kalori, człowiek potrzebuje 2500 kalori dziennie. Wnioski nasuwają się same..."
        ],
        "type": "phrase"
    }, {
        "name": "wow",
        "texts": [
            "<target> jak ty mnie zaimponowałeś w tej chwili!",
            "Wiktora bym Ci dał za to <target>!"
        ],
        "type": "phrase"
    }]

    // console.log("Processing: " + request.body.text);
    if (request.body.text.toLowerCase() == "help") {
        return `*Dostępne komendy:* ${phrases.map(phrase => phrase.name).toString()}`;
    } else {
        try {
            var texts = phrases.find(item => item.name === request.body.text.toLowerCase()).texts;
            var text = texts[Math.floor(Math.random() * texts.length)];
            return text.replace('<target>', '<@' + request.body.user_id + '>');
        } catch (e) {
            // console.log(e);
            return "Goń się <@" + request.body.user_id + ">";
        }
    }
}

const app = express();
const PORT = 3000;

app.listen(process.env.PORT || PORT, function() {
    console.log('Siara is listening on port ' + PORT);
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/', (req, res) => {
    res.status(200).end();

    request.post(req.body.response_url, { 
        json: {
          response_type: 'in_channel', // public to the channel
          text: process_outgoing_response(req)
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        // console.log(`statusCode: ${res.statusCode}`)
        // console.log(body)
    });
});
