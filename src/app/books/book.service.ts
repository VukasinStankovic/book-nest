import { Injectable } from '@angular/core';
import { UserService } from '../auth/user.service';
import {
  Book,
  BookBinding,
  Genre,
  InventoryStatus,
  Language,
  Publisher,
} from './book.model';
@Injectable()
export class BookService {
  constructor(private readonly userService: UserService) {}

  users = this.userService.getAllUsers();

  // FUNKCIJE!!!
  getBooks() {
    this.sortBooksByName(this.books);
    return this.books;
  }

  getBookById(id: number): Book {
    let foundBook!: Book;
    this.books.forEach((book) => {
      if (book.id === id) {
        foundBook = book;
      }
    });

    console.log('Porucena knjiga');
    console.log(foundBook);

    return foundBook;
  }

  setOrderedQuantity(book: Book, orderedQuantity?: number) {
    if (book.orderedQuantity < book.quantity) {
      if (orderedQuantity != undefined && orderedQuantity > 1) {
        book.orderedQuantity = orderedQuantity;
      } else {
        book.orderedQuantity++;
      }
    } else {
      book.inventoryStatus = InventoryStatus.OutOfStock;
    }
  }

  setQuantityAfterOrder(books: Book[]) {
    books.forEach((book) => {
      book.quantity -= book.orderedQuantity;
      book.orderedQuantity = 0;
    });
  }

  checkInventoryStatus(book: Book) {
    if (book.quantity === book.orderedQuantity || book.quantity < 1) {
      book.inventoryStatus = InventoryStatus.OutOfStock;
    } else if (book.quantity >= 1) {
      book.inventoryStatus = InventoryStatus.InStock;
    }
  }

  resetOrderedQuantity(bookId: number) {
    let book!: Book;
    book = this.getBookById(bookId);
    book.orderedQuantity = 0;
  }

  getAllGenres(): Genre[] {
    const allGenres: Genre[] = Object.values(Genre);
    return allGenres;
  }

  getAllLanguages(): Language[] {
    const allLanguages: Language[] = Object.values(Language);
    return allLanguages;
  }

  getAllPublishers(): Publisher[] {
    const allPublishers: Publisher[] = Object.values(Publisher);
    return allPublishers;
  }

  getAllBookBinding(): BookBinding[] {
    const allBookBinding: BookBinding[] = Object.values(BookBinding);
    return allBookBinding;
  }

  getAllInventoryStatus(): InventoryStatus[] {
    const allInventoryStatus: InventoryStatus[] =
      Object.values(InventoryStatus);
    return allInventoryStatus;
  }

  getMinMaxPrice(): { minPrice: number; maxPrice: number } {
    if (this.books.length === 0) {
      return { minPrice: 0, maxPrice: 0 };
    }

    let minPrice = this.books[0].price;
    let maxPrice = this.books[0].price;

    for (const book of this.books) {
      if (book.price < minPrice) {
        minPrice = book.price;
      }
      if (book.price > maxPrice) {
        maxPrice = book.price;
      }
    }

    return { minPrice, maxPrice };
  }

  sortBooksByName(booksToSort: Book[]) {
    booksToSort.sort((a, b) => {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  }

  sortBookByPrice(booksToSort: Book[]) {
    booksToSort.sort((a, b) => a.price - b.price);
  }

  sortBookByPriceHigh(booksToSort: Book[]) {
    booksToSort.sort((a, b) => b.price - a.price);
  }

  sortBookByDate(booksToSort: Book[]) {
    booksToSort.sort((a, b) => b.releaseDate - a.releaseDate);
  }

  getBookRating() {}

  // Podaci o knjigama
  private books: Book[] = [
    {
      id: 1,
      title:
        'Node.js, MongoDB i Angular integrisane alatke za razvoj veb strana',
      genre: [Genre.ComputerScience],
      author: ['Grupa autora'],
      publisher: Publisher.KBB,
      image:
        'https://www.delfi.rs/_img/artikli/2018/01/nodejsmongodb_i_angular_integrisane_alatke_za_razvoj_veb_strana_vv.jpg',
      description:
        'Node.js je glavno programsko okruženje, MongoDB je najpopularnija NoSQL baza podataka, a Angular vodeći radni okvir za izloženi razvoj koji je zasnovan na MVC-u. Zajedno čine integrisane alatke za razvoj veb stranica, koje omogućavaju veb programerima da kreiraju sajtove i aplikacije koje su potpuno ugrađene u JavaScript. U ovoj knjizi prikazano je kako se integrišu ove tri tehnologije u potpuna radna rešenja. Knjiga počinje jasnim upustvima za upotrebu svake tehnologije, a zatim prelazi na izradu uobičajenih veb aplikacija. Pomoću ove knjige naučićete kako da koristite Node.js i MongoDB da biste napravili više sajtova sa visokim performansama, kako da primenite Angularov inovativni MVC pristup za struktuiranje stranica i aplikacija i kako da koristite sve tri tehnologije zajedno da biste napravili izuzetne sajtove. ',
      price: 1320,
      quantity: 25,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2018,
      numberOfPages: 621,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
    {
      id: 2,
      title: 'Angular kuvar',
      genre: [Genre.ComputerScience],
      author: ['Muhammad Ahsan Ayaz'],
      publisher: Publisher.KBB,
      image: 'https://www.delfi.rs/_img/artikli/2021/11/angular_kuvar_vv.jpg',
      description:
        'Na početku knjige ćete upoznati koncepte Angulara, kao što su Angular komponente, direktive i servisi, da biste se pripremili za izradu frontend veb aplikacija. Razvijaćete veb komponente pomoću Angulara i pokrivaćete napredne koncepte, kao što su učitavanje dinamičkih komponenata i upravljanje stanjem pomoću NgRxa, radi postizanja performansi u realnom vremenu. Kasnija poglavlja su fokusirana na recepte za efikasno testiranje vaših Angular aplikacija kako bi bile bezbedne od otkazivanja rada, pre nego što pređete na tehnike za optimizaciju performansi vaše aplikacije. Na kraju ćete kreirati progresivne veb aplikacije (PVA - Progressive Web Apps) pomoću Angulara da biste korisnicima obezbedili intuitivno iskustvo.',
      price: 2640,
      quantity: 20,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2021,
      numberOfPages: 652,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
    {
      id: 3,
      title:
        'React i React Native: izgradnja međuplatformskih JavaScript aplikacija',
      genre: [Genre.ComputerScience],
      author: ['Adam Boduch'],
      publisher: Publisher.KBB,
      image:
        'https://www.delfi.rs/_img/artikli/2023/02/react_i_react_native_izgradnja_medjuplatformskih_javascript_aplikacija_vv-2.jpg',
      description:
        'Tokom godina, React i React Native su se, među JavaScript programerima, pokazali kao popularan izbor za kompletan i praktičan vodič za React ekosistem. Ovo četvrto izdanje prati najnove funkcije, poboljšanja i ispravke verzije React 18, a istovremeno je kompatibilno i sa platformom React Native. Nova poglavlja obuhvataju važne funkcije i koncepte modernog razvoja međuplatformskih aplikacija, pomoću React-a. Od osnova do popularnih komponenti, kao što su Hooks, GraphQL i NativeBase, korak po korak, ovaj definitivan vodič će vam pomoći da postanete najbolji React programer.',
      price: 2860,
      quantity: 10,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2023,
      numberOfPages: 606,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
    {
      id: 4,
      title: 'JavaScript: Od početnika do profesionalca',
      genre: [Genre.ComputerScience],
      author: ['Laurence Lars Svekis'],
      publisher: Publisher.KBB,
      image:
        'https://www.delfi.rs/_img/artikli/2022/10/javascript_-_od_pocetnika_do_profesionalca_vv.jpg',
      description:
        '100 zabavnih vežbi i projekata za brzo učenje JavaScripta. Ključne funkcije. Napišite elokventan JavaScript i koristite osnovne i napredne funkcije za kreiranje svojih veb aplikacija. Komunicirajte sa pregledačem pomoću HTML-a i JavaScripta i dodajte dinamične slike, oblike i tekst pomoću HTML5 Canvasa. JavaScript od početnika do profesionalaca se fokusira na ključne koncepte programiranja i manipulacije objektnim modelom dokumenta koji se koriste za rešavanje uobičajenih problema u profesionalnim veb aplikacijama. Ovo uključuje validaciju podataka, manipulisanje izgledom veb stranica, rad sa asinhronim i konkurentnim kodom.',
      price: 2640,
      quantity: 5,
      orderedQuantity: 3,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2022,
      numberOfPages: 544,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
    {
      id: 5,
      title: 'HTML5, CSS3 i JavaScript za razvoj veb strana',
      genre: [Genre.ComputerScience],
      author: ['Laura Lemay', ' Rafe Colburn', ' Jennifer Kyrnin'],
      publisher: Publisher.KBB,
      image:
        'https://www.delfi.rs/_img/artikli/2016/11/html5_css3_i_javascript_za_razvoj_veb_strana_vv.jpg',
      description:
        '100 zabavnih vežbi i projekata za brzo učenje JavaScripta. Ključne funkcije. Napišite elokventan JavaScript i koristite osnovne i napredne funkcije za kreiranje svojih veb aplikacija. Komunicirajte sa pregledačem pomoću HTML-a i JavaScripta i dodajte dinamične slike, oblike i tekst pomoću HTML5 Canvasa. JavaScript od početnika do profesionalaca se fokusira na ključne koncepte programiranja i manipulacije objektnim modelom dokumenta koji se koriste za rešavanje uobičajenih problema u profesionalnim veb aplikacijama. Ovo uključuje validaciju podataka, manipulisanje izgledom veb stranica, rad sa asinhronim i konkurentnim kodom.',
      price: 2970,
      quantity: 7,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2016,
      numberOfPages: 768,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
    {
      id: 6,
      title: 'Python mašinsko učenje - prevod trećeg izdanja',
      genre: [Genre.ComputerScience],
      author: ['Laura Lemay', 'Vahid Mirjalili'],
      publisher: Publisher.KBB,
      image:
        'https://www.delfi.rs/_img/artikli/2020/05/python_masinsko_ucenje_-_prevod_treceg_izdanja_vv.jpg',
      description:
        'Python mašinsko učenje (treće izdanje) je sveobuhvatan vodič za mašinsko učenje i duboko učenje upotrebom Pythona. Ova knjiga služi kao uputstvo, korak po korak, i kao referenca kojoj ćete se vraćati dok gradite sisteme mašinskog učenja. Ona uključuje jasna objašnjenja, vizuelizacije i radne primere i obuhvata detaljno sve osnovne tehnike mašinskog učenja. Dok vas neke knjige uče samo da pratite instrukcije, u ovoj knjizi za mašinsko učenje autori Raschka i Mirjalili uče vas principima mašinskog učenja, omogućavajući vam da sami izgradite modele i aplikacije. Ovo treće izdanje je ažurirano za TensorFlow 2.0 i predstavlja čitaocima njegove nove Keras API funkcije, kao i funkcije najnovijeg izdanja scikit-learna. Knjiga je takođe proširena opisom vrhunskih tehnika učenja uslovljavanjem, koje su zasnovane na dubokom učenju, a takođe su predstavljeni i GAN-ovi. Istražićemo i podoblast obrade prirodnog jezika (NLP) pod nazivom analiza sentimenta, što će vam pomoći da naučite kako da koristite algoritme mašinskog učenja za klasifikovanje dokumenata. Ova knjiga je vaš pratilac za mašinsko učenje sa Pythonom, bez obzira da li ste Python programer koji želi da nauči mašinsko učenje ili imate iskustva i želite da produbite znanje najnovijim dostignućima.',
      price: 2970,
      quantity: 8,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2020,
      numberOfPages: 770,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
    {
      id: 7,
      title: 'Node.js veb razvoj - prevod 5. izdanja',
      genre: [Genre.ComputerScience],
      author: ['David Herron'],
      publisher: Publisher.KBB,
      image:
        'https://www.delfi.rs/_img/artikli/2020/11/nodejs_veb_razvoj_-_prevod_5_izdanja_vv.jpg',
      description:
        'Na početku knjige ćete upoznati koncepte izrade veb aplikacija na strani servera, koristeći Node.js. Naučićete kako da razvijete kompletnu Node.js veb aplikaciju pomoću pozadinskih baza podataka da biste mogli da istražite još nekoliko baza podataka. Implementiraćete aplikaciju na pravi veb server, uključujući platformu hostovanu u „oblaku“ koja je izrađena na AWS EC2 pomoću Terraforma i Dockera, a integrisaćete i druge alatke, kao što su Redis i NGINX. Kako budete napredovali, naučićete jedinično i funkcionalno testiranje, zajedno sa implementacijom testa infrastrukture pomoću Dockera. Na kraju, otkrićete kako da ojačate bezbednost Node.js aplikacije, kako da koristite Lets Encrypt za obezbeđivanje HTTPS usluge i kako da primenite nekoliko oblika bezbednosti u aplikacijama, zahvaljujući stručnoj praksi. U svakom poglavlju knjiga će vam pomoći da svoje znanje primenite u praksi tokom celog životnog ciklusa razvoja veb aplikacije.',
      price: 2750,
      quantity: 0,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.OutOfStock,
      language: Language.Serbian,
      releaseDate: 2020,
      numberOfPages: 748,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
    {
      id: 8,
      title: 'Zamalek',
      genre: [Genre.History, Genre.Drama, Genre.EBooks],
      author: ['Dejan Tijago Stanković'],
      publisher: Publisher.Laguna,
      image: 'https://www.delfi.rs/_img/artikli/2020/04/zamalek_vv.jpg',
      description:
        '„Zamalek je roman koji vam se u prvom trenutku čini kao putopis pun opisa čudnih običaja, leksikon egzotičnih pojmova ili nekakav uvrnuti bedeker o Egiptu. A onda, malo-pomalo, iz novootkrivenih delova istorije te zemlje i sjajnog opisa mentaliteta njenih stanovnika počinje da izranja priča. Ona se, kao ponornica koja je u početku hučala negde u dubini, u svoj svojoj snazi najzad pojavljuje na svetlosti dana, sa svojim junacima, njihovim neobičnim pojavama i zanimljivim biografijama. Ta priča postaje zavodljiva, napeta i dirljiva, da bi se na kraju ulila u okean uspomena. Ako je o Aleksandriji najbolju belešku napravio Lorens Darel, onda je, na sličan način, kroz uzbudljive sudbine svojih junaka i neobične trenutke iz njihovih života u kvartu Zamalek, Dejan Tiago-Stanković ovekovečio Kairo.“',
      price: 999,
      quantity: 0,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.OutOfStock,
      language: Language.Serbian,
      releaseDate: 2020,
      numberOfPages: 352,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
    {
      id: 9,
      title: 'Estoril',
      genre: [Genre.History, Genre.Drama, Genre.EBooks],
      author: ['Dejan Tijago Stanković'],
      publisher: Publisher.Laguna,
      image:
        'https://www.delfi.rs/_img/artikli/2022/02/estoril_ratni_roman_vv.jpg',
      description:
        'Smešten u luksuzni hotel Palasio u mondenskom letovalištu Estoril nedaleko od Lisabona, koji je tokom Drugog svetskog rata usled portugalske neutralnosti bio stecište mutnih radnji obaveštajnih službi zaraćenih strana, ali i izbeglica iz svih krajeva Evrope, Estoril je divan i potresan roman o egzilu, podeljenoj lojalnosti, strahu i preživljavanju. Gosti hotela su špijuni, pali kraljevi, pisci, nacisti, američke diplomate i Jevreji bez državljanstva, a portugalska tajna policija pažljivo nadzire posetioce, trudeći se da niko ne ugrozi neutralnost njihove zemlje.',
      price: 999,
      quantity: 23,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2022,
      numberOfPages: 352,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
    {
      id: 10,
      title: 'Odakle sam bila, više nisam',
      genre: [Genre.History, Genre.Drama, Genre.EBooks],
      author: ['Dejan Tijago Stanković'],
      publisher: Publisher.Laguna,
      image:
        'https://www.delfi.rs/_img/artikli/2022/09/odakle_sam_bila_vise_nisam_vv.jpg',
      description:
        'Ispričaš jednu, drugu, treću, pa onda desetu priču, i taj broj počne sam od sebe da raste a priče se uklapaju, prožimaju, nekako postanu jedno i ti vidiš da to više nisu samo priče. Tu je Lisabon, tvoj glavni junak, osunčan, lep, bogat ljudima i događajima, ugnezdio se pod plavetnilom neba koje je takvo samo nad njim. Tu je pripovedač, došao s ovih prostora u neki drugi, zapadni svet i gleda ga ovde rođenim, tamo otvorenim očima. Tu su mnogobrojni likovi, neki davnašnji, neki vrlo moderni, a svi posebni, oblikovani, živi na stranicama romana kao da sad sedite negde na lisabonskom uglu i ćaskate. I ti shvatiš da je pred tobom roman o jednom gradu i njegovim stanovnicima koji ide, teče, čitaš ga, nasmeješ se, pa te obuzme seta, malo se zamisliš, pa ti se osmeh ponovo razlije licem. Uživaš.',
      price: 999,
      quantity: 33,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2022,
      numberOfPages: 328,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
    {
      id: 11,
      title: 'Sapijens',
      genre: [
        Genre.History,
        Genre.PopularScience,
        Genre.Nonfiction,
        Genre.EBooks,
      ],
      author: ['Juval Noa Harari'],
      publisher: Publisher.Laguna,
      image:
        'https://www.delfi.rs/_img/artikli/2019/11/sapijens_kratka_istorija_covecanstva_vv.jpg',
      description:
        'U Sapijensu Harari obuhvata čitavu istoriju čovečanstva, od prvih ljudskih bića pa do radikalnih preokreta na našem razvojnom putu: kognitivne, poljoprivredne i naučne revolucije. Crpeći materijal iz naučnih saznanja na polju biologije, antropologije, paleontologije i ekonomije, Harari istražuje kako su tokovi istorije oblikovali naša društva, i naše ličnosti. Jesmo li srećniji kako je vreme proticalo? Hoćemo li ikada uspeti da se oslobodimo nasleđa koje su nam ostavili preci? I možemo li išta da uradimo kako bismo uticali na budućnost koja je pred nama?',
      price: 2228,
      quantity: 23,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2019,
      numberOfPages: 562,
      binding: BookBinding.Hardcover,
      overallRating: 0,
      comments: [
        {
          customer: this.users[1],
          customerRating: 2.5,
          comment: 'Nije loše, ali sam očekivao više.',
        },
      ],
    },
    {
      id: 12,
      title: 'Čovek po imenu Uve',
      genre: [Genre.Comedy, Genre.Drama, Genre.EBooks],
      author: ['Fredrik Bakman'],
      publisher: Publisher.Laguna,
      image:
        'https://www.delfi.rs/_img/artikli/2017/02/covek_po_imenu_uve_vv.jpg',
      description:
        'Upoznajte Uvea. On je džangrizalo – jedan od onih koji upiru prstom u ljude koji mu se ne dopadaju kao da su provalnici zatečeni pod njegovim prozorom. Svakog jutra Uve ide u inspekciju po naselju u kom živi. Premešta bicikle i proverava da li je đubre pravilno razvrstano – iako je već nekoliko godina prošlo otkako je razrešen dužnosti predsednika kućnog saveta. Ili otkako je „izvršen prevrat“, kako Uve govori o tome. Ljudi ga zovu „ogorčenim komšijom iz pakla“. Ali zar Uve mora da bude ogorčen samo zbog toga što ne šeta okolo sa osmehom zalepljenim na lice?',
      price: 1099,
      quantity: 12,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2017,
      numberOfPages: 360,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
    {
      id: 13,
      title: 'Hačiko čeka',
      genre: [Genre.Autobiography, Genre.Drama, Genre.EBooks],
      author: ['Lezlija Njuman'],
      publisher: Publisher.Laguna,
      image: 'https://www.delfi.rs/_img/artikli/2023/08/haciko_ceka_vv-2.jpg',
      description:
        '„Kako si ti dobar pas. Odličan pas. Hači, ti si najbolji pas u celom Japanu.“ Svakog jutra pre nego što se ukrca na voz kojim ide na posao, profesor Ueno ove reči govori svom vernom psu. Svakog popodneva malo pre tri sata Hačiko dolazi na železničku stanicu da sačeka svog voljenog gospodara.',
      price: 499,
      quantity: 4,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2023,
      numberOfPages: 96,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [
        {
          customer: this.users[0],
          customerRating: 4.8,
          comment: 'Jako lepa priča.',
        },
        {
          customer: this.users[1],
          customerRating: 2.6,
          comment: 'Nije loša, ali nije ni sjajna.',
        },
      ],
    },
    {
      id: 14,
      title: 'Madam Pompadur',
      genre: [Genre.ClassicalLiterature, Genre.Drama, Genre.History],
      author: ['Žil de Gonkur', 'Edmon de Gonkur'],
      publisher: Publisher.Vulkan,
      image: 'https://www.delfi.rs/_img/artikli/2021/02/madam_pompadur_vv.jpg',
      description:
        'Neverovatna sudbina markize od Pompadura istinita je priča. Kako je ova devojčica bez pedigrea, zahvaljujući svojoj lepoti, britkom umu, ambiciji i umeću zavođenja, postala centralna figura francuske političke scene?',
      price: 1099,
      quantity: 3,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.Serbian,
      releaseDate: 2020,
      numberOfPages: 272,
      binding: BookBinding.Hardcover,
      overallRating: 0,
      comments: [],
    },
    {
      id: 15,
      title: 'The Dark Net',
      genre: [Genre.ComputerScience],
      author: ['Benjamin Percy'],
      publisher: Publisher.Hodder,
      image: 'https://www.delfi.rs/_img/artikli/2017/10/the_dark_net_vv.jpg',
      description:
        "The dark net is an online shadowland for criminals to operate anonymously, but when a demonic force begins to hack the minds of its users there is nowhere left to hide. Twelve-year-old Hannah has been fitted with a high-tech prosthetic that restores her sight, but can't understand why she can now see shadows surrounding certain people. Lela, an emotionally shut-off, technophobic journalist stumbles onto a story nobody wants her to uncover. A story someone will kill to keep hidden.A former evangelist, Mike, suffers demons - figurative and literal - and keeps an arsenal of weapons stored in the basement of the homeless shelter he runs.",
      price: 2499,
      quantity: 3,
      orderedQuantity: 0,
      inventoryStatus: InventoryStatus.InStock,
      language: Language.English,
      releaseDate: 2017,
      numberOfPages: 272,
      binding: BookBinding.Paperback,
      overallRating: 0,
      comments: [],
    },
  ];
}
